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
            nueva.NdTransaccionFecha      = DateTime.UtcNow;
            nueva.NdTransaccionCreadoEn   = DateTime.UtcNow;
            // total es columna calculada en la BD; EF la cargará al leer
            _db.NdTransacciones.Add(nueva);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = nueva.NdTransaccionId }, nueva);
        }
    }
}
