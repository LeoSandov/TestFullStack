using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductService.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ndproductos",
                columns: table => new
                {
                    NdProductoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NdProductoNombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NdProductoDescripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NdProductoCategoria = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NdProductoImagenUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NdProductoPrecioUnitario = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NdProductoStock = table.Column<int>(type: "int", nullable: false),
                    NdProductoCreadoEn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NdProductoActualizadoEn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ndproductos", x => x.NdProductoId);
                });

            migrationBuilder.CreateTable(
                name: "NdTransaccion",
                columns: table => new
                {
                    NdTransaccionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NdTransaccionFecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NdTransaccionTipo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NdTransaccionProductoId = table.Column<int>(type: "int", nullable: false),
                    NdTransaccionCantidad = table.Column<int>(type: "int", nullable: false),
                    NdTransaccionPrecioUnitario = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NdTransaccionTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NdTransaccionDetalle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NdTransaccionCreadoEn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NdProductoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NdTransaccion", x => x.NdTransaccionId);
                    table.ForeignKey(
                        name: "FK_NdTransaccion_ndproductos_NdProductoId",
                        column: x => x.NdProductoId,
                        principalTable: "ndproductos",
                        principalColumn: "NdProductoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NdTransaccion_NdProductoId",
                table: "NdTransaccion",
                column: "NdProductoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NdTransaccion");

            migrationBuilder.DropTable(
                name: "ndproductos");
        }
    }
}
