using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventario.Shared.Entities
{
    [Table("ndtransacciones")]
    public class NdTransaccion
    {
        [Column("ndtransaccion_id")]
        public int NdTransaccionId { get; set; }

        [Column("ndtransaccion_fecha")]
        public DateTime NdTransaccionFecha { get; set; }

        [Column("ndtransaccion_tipo")]
        public string NdTransaccionTipo { get; set; } = null!;

        [Column("ndtransaccion_producto_id")]
        public int NdTransaccionProductoId { get; set; }

        [Column("ndtransaccion_cantidad")]
        public int NdTransaccionCantidad { get; set; }

        [Column("ndtransaccion_preciounitario")]
        public decimal NdTransaccionPrecioUnitario { get; set; }

        [NotMapped]
        public decimal NdTransaccionTotal
        {
            get => NdTransaccionCantidad * NdTransaccionPrecioUnitario;
        }

        [Column("ndtransaccion_detalle")]
        public string? NdTransaccionDetalle { get; set; }

        [Column("ndtransaccion_creado_en")]
        public DateTime NdTransaccionCreadoEn { get; set; }

        // Relación
        public NdProducto? NdProducto { get; set; }
    }
}
