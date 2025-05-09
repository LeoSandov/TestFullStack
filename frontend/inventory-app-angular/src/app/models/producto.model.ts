export interface Producto {
  ndProductoId: number;
  ndProductoNombre: string;
  ndProductoDescripcion?: string;
  ndProductoCategoria?: string;
  ndProductoImagenUrl?: string;
  ndProductoPrecioUnitario: number;
  ndProductoStock: number;
  ndProductoCreadoEn?: string;
  ndProductoActualizadoEn?: string;
  // no manejes aquí las transacciones anidadas si no las usas
}
