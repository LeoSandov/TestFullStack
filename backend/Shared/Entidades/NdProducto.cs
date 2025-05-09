using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventario.Shared.Entities
{
    [Table("ndproductos")]
    public class NdProducto
    {
        [Column("ndproducto_id")]
        public int ndProductoId { get; set; }

        [Column("ndproducto_nombre")]
        public string ndProductoNombre { get; set; } = null!;

        [Column("ndproducto_descripcion")]
        public string? ndProductoDescripcion { get; set; }

        [Column("ndproducto_categoria")]
        public string? ndProductoCategoria { get; set; }

        [Column("ndproducto_imagenurl")]
        public string? ndProductoImagenUrl { get; set; }

        [Column("ndproducto_preciounitario")]
        public decimal ndProductoPrecioUnitario { get; set; }

        [Column("ndproducto_stock")]
        public int ndProductoStock { get; set; }

        [Column("ndproducto_creado_en")]
        public DateTime ndProductoCreadoEn { get; set; }

        [Column("ndproducto_actualizado_en")]
        public DateTime ndProductoActualizadoEn { get; set; }

        public ICollection<NdTransaccion>? ndTransacciones { get; set; }
    }
}
