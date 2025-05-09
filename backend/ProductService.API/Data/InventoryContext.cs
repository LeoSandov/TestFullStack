using Microsoft.EntityFrameworkCore;
using Inventario.Shared.Entities;

namespace Inventario.ProductService.API.Data
{
    public class InventoryContext : DbContext
    {
        public InventoryContext(DbContextOptions<InventoryContext> options)
            : base(options)
        { }

        public DbSet<NdProducto> NdProductos { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NdProducto>()
                .ToTable("ndproductos")
                .HasKey(p => p.ndProductoId);

           

        }
    }
}
