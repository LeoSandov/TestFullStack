using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Inventario.ProductService.API.Data;
using Inventario.Shared.Entities;

namespace Inventario.ProductService.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly InventoryContext _db;
        private readonly ILogger<ProductosController> _logger;
        public ProductosController(InventoryContext db, ILogger<ProductosController> logger)
        {
            _db = db;
            _logger = logger;
        }

        // GET: api/productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NdProducto>>> GetAll()
        {
            return await _db.NdProductos
                            .AsNoTracking()
                            .ToListAsync();
        }

        // GET: api/productos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NdProducto>> GetById(int id)
        {
            var prod = await _db.NdProductos.FindAsync(id);
            if (prod == null) return NotFound();
            return prod;
        }

        // POST: api/productos
        [HttpPost]
        public async Task<ActionResult<NdProducto>> Create([FromBody] NdProducto producto)
        {
            producto.ndProductoCreadoEn = DateTime.UtcNow;
            producto.ndProductoActualizadoEn = DateTime.UtcNow;
            _db.NdProductos.Add(producto);
            await _db.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetById),
                new { id = producto.ndProductoId },
                producto
            );
        }

        // PUT: api/productos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            [FromBody] NdProducto producto
        )
        {
            var existing = await _db.NdProductos.FindAsync(id);
            if (existing == null)
                return NotFound();
            if (existing == null) return NotFound();

            // Actualizar solo los campos editables
            existing.ndProductoNombre = producto.ndProductoNombre;
            existing.ndProductoDescripcion = producto.ndProductoDescripcion;
            existing.ndProductoCategoria = producto.ndProductoCategoria;
            existing.ndProductoImagenUrl = producto.ndProductoImagenUrl;
            existing.ndProductoPrecioUnitario = producto.ndProductoPrecioUnitario;
            existing.ndProductoStock = producto.ndProductoStock;
            existing.ndProductoActualizadoEn = DateTime.UtcNow;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/productos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var prod = await _db.NdProductos.FindAsync(id);
            if (prod == null) return NotFound();

            _db.NdProductos.Remove(prod);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
