using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Inventario.TransactionService.API.Data;
using Inventario.Shared.Entities;

namespace Inventario.TransactionService.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransaccionesController : ControllerBase
    {
        private readonly InventoryContext _db;
        public TransaccionesController(InventoryContext db) => _db = db;

        // GET: api/transacciones
        // Puedes filtrar por productoId, tipo, fechaDesde y fechaHasta
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NdTransaccion>>> GetAll(
            [FromQuery] int? productoId,
            [FromQuery] string? tipo,
            [FromQuery] DateTime? fechaDesde,
            [FromQuery] DateTime? fechaHasta)
        {
            var q = _db.NdTransacciones.AsNoTracking().AsQueryable();

            if (productoId.HasValue)
                q = q.Where(t => t.NdTransaccionProductoId == productoId.Value);

            if (!string.IsNullOrWhiteSpace(tipo))
                q = q.Where(t => t.NdTransaccionTipo == tipo);

            if (fechaDesde.HasValue)
                q = q.Where(t => t.NdTransaccionFecha >= fechaDesde.Value);

            if (fechaHasta.HasValue)
                q = q.Where(t => t.NdTransaccionFecha <= fechaHasta.Value);

            return await q.OrderByDescending(t => t.NdTransaccionFecha).ToListAsync();
        }

        // GET: api/transacciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NdTransaccion>> GetById(int id)
        {
            var tx = await _db.NdTransacciones.FindAsync(id);
            if (tx == null) return NotFound();
            return tx;
        }

        // POST: api/transacciones
        [HttpPost]
        public async Task<ActionResult<NdTransaccion>> Create(NdTransaccion nueva)
        {
            // 1) Inicializar fechas
            nueva.NdTransaccionFecha = DateTime.UtcNow;
            nueva.NdTransaccionCreadoEn = DateTime.UtcNow;

            // 2) Comenzar transacción de BD
            await using var dbTrans = await _db.Database.BeginTransactionAsync();

            // 3) Insertar la transacción
            _db.NdTransacciones.Add(nueva);
            await _db.SaveChangesAsync();

            // 4) Ajustar stock del producto
            var producto = await _db.NdProductos
                                   .FirstOrDefaultAsync(p => p.ndProductoId == nueva.NdTransaccionProductoId);
            if (producto != null)
            {
                if (string.Equals(nueva.NdTransaccionTipo, "compra", StringComparison.OrdinalIgnoreCase))
                    producto.ndProductoStock += nueva.NdTransaccionCantidad;
                else if (string.Equals(nueva.NdTransaccionTipo, "venta", StringComparison.OrdinalIgnoreCase))
                    producto.ndProductoStock -= nueva.NdTransaccionCantidad;

                _db.NdProductos.Update(producto);
                await _db.SaveChangesAsync();
            }

            // 5) Commit
            await dbTrans.CommitAsync();

            // 6) Devolver Created
            return CreatedAtAction(nameof(GetById),
                                   new { id = nueva.NdTransaccionId },
                                   nueva);
        }

        // PUT: api/transacciones/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, NdTransaccion updated)
        {
            if (id != updated.NdTransaccionId)
                return BadRequest("El ID de la URL debe coincidir con el ID del cuerpo.");

            var existing = await _db.NdTransacciones.FindAsync(id);
            if (existing == null)
                return NotFound();

            // Actualiza sólo los campos que quieres permitir modificar
            existing.NdTransaccionTipo = updated.NdTransaccionTipo;
            existing.NdTransaccionProductoId = updated.NdTransaccionProductoId;
            existing.NdTransaccionCantidad = updated.NdTransaccionCantidad;
            existing.NdTransaccionPrecioUnitario = updated.NdTransaccionPrecioUnitario;
            existing.NdTransaccionDetalle = updated.NdTransaccionDetalle;
            // No tocamos Fecha ni CreadoEn a menos que quieras resetearlos

            _db.NdTransacciones.Update(existing);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
