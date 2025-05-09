export interface Transaccion {
  ndTransaccionId: number;
  ndTransaccionFecha: string;
  ndTransaccionTipo: 'compra' | 'venta';
  ndTransaccionProductoId: number;
  ndTransaccionCantidad: number;
  ndTransaccionPrecioUnitario: number;
  ndTransaccionTotal: number;
  ndTransaccionDetalle?: string;
  ndTransaccionCreadoEn?: string;
}
