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

EVIDENCIAS
•	Listado dinámico de productos y transacciones con paginación.
 ![image](https://github.com/user-attachments/assets/61cbf1cb-d789-4201-8323-cb8375e76eeb)

 ![image](https://github.com/user-attachments/assets/53f8beb8-afb4-434c-98a1-0ac22747171f)


•	Pantalla para la creación de productos.
 
 ![image](https://github.com/user-attachments/assets/2e5d7660-f143-4963-892b-7ffd60bbcb5a)

 ![image](https://github.com/user-attachments/assets/fd95c8f1-55e5-4788-8bef-c236b0b8d246)

 
•	Pantalla para la edición de productos.
 
![image](https://github.com/user-attachments/assets/cc715751-6ad3-46f0-a4a5-6f01e5e292db)

 

•	Eliminar en productos
 
 ![image](https://github.com/user-attachments/assets/34ff16e4-f403-43a3-a51f-e1bea9b741f8)

 
•	Pantalla para la creación de transacciones.

 ![image](https://github.com/user-attachments/assets/5148d202-f2dd-4207-9595-c046879d5a0b)


•	Pantalla para la edición de transacciones.
 
 ![image](https://github.com/user-attachments/assets/b862dbfb-a324-43c9-820c-589c1c076d09)

•	Pantalla de filtros dinámicos.


   •	Filtro productos por categorías

 ![image](https://github.com/user-attachments/assets/d8efc513-4938-41a1-9643-580ffa4673f1)


 ![image](https://github.com/user-attachments/assets/c86776ed-4256-4d71-856f-4f08787e9162)

![image](https://github.com/user-attachments/assets/48e2ca9b-33e6-47d6-8125-62313ce0ad7b)

 
   •	Filtro transacciones producto ID
 
![image](https://github.com/user-attachments/assets/3e92586a-b1a6-422e-9b70-996b9af5ed9e)

   •	Filtro transacciones tipo (compra o venta)

 ![image](https://github.com/user-attachments/assets/dbf9d3a3-d205-4bcf-be10-3ee941584dc2)

![image](https://github.com/user-attachments/assets/37bdc925-7c8b-4105-8146-098538f1f742)

 
•	Filtro transacciones por fecha (desde-hasta)

![image](https://github.com/user-attachments/assets/896db07d-b7c6-4fb9-816b-3ffe5f782962)

 




