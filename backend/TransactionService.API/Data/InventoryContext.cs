using Microsoft.EntityFrameworkCore;
using Inventario.Shared.Entities;

namespace Inventario.TransactionService.API.Data
{
    public class InventoryContext : DbContext
    {
        public InventoryContext(DbContextOptions<InventoryContext> options)
            : base(options)
        { }

        public DbSet<NdTransaccion> NdTransacciones { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NdTransaccion>()
                .ToTable("ndtransacciones")
                .HasKey(t => t.NdTransaccionId);

            modelBuilder.Entity<NdTransaccion>()
                .HasOne(t => t.NdProducto)
                .WithMany(p => p.ndTransacciones)
                .HasForeignKey(t => t.NdTransaccionProductoId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
