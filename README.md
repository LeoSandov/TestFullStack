# Inventory Microservices App

Este proyecto implementa una aplicación de gestión de inventario basada en microservicios con .NET Core (Productos, Transacciones) y un cliente Angular.

## Requisitos

* **.NET 7 SDK** o superior
* **Node.js** (v16+) y **npm**
* **Angular CLI** (instalado globalmente)
* Script SQL de creación de tablas (ubicado en la raíz: `db/base.sql`)


## Ejecución del backend

Cada servicio dispone de su propio puerto (5166 Productos, 5062 Transacciones):

1. Abrir terminal en `backend/ProductService.API`:

   ```bash
   dotnet restore
   dotnet run
   ```

   * Será accesible en `https://localhost:5166` y Swagger UI en `/swagger`.

2. En otra terminal, abrir `backend/TransactionService.API`:

   ```bash
   dotnet restore
   dotnet run
   ```

   * Será accesible en `https://localhost:5062` y Swagger UI en `/swagger`.

> **Nota**: Si cambian de máquina/entorno, ajustar la cadena de conexión en `appsettings.json` y variables de entorno.

## Ejecución del frontend

1. Ir a la carpeta `frontend/inventory-app-angular`:

   ```bash
   cd frontend/inventory-app-angular
   npm install
   ng serve --open
   ```
2. Esto levantará el cliente en `http://localhost:4200`.

> **Asegurarse** de que los microservicios estén corriendo y permitir CORS en `http://localhost:4200`.

