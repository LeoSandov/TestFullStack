-- DROP SCHEMA dbo;

CREATE SCHEMA dbo;
-- master.dbo.MSreplication_options definition

-- Drop table

-- DROP TABLE master.dbo.MSreplication_options;

CREATE TABLE master.dbo.MSreplication_options (
	optname sysname COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	value bit NOT NULL,
	major_version int NOT NULL,
	minor_version int NOT NULL,
	revision int NOT NULL,
	install_failures int NOT NULL
);


-- master.dbo.ndproductos definition

-- Drop table

-- DROP TABLE master.dbo.ndproductos;

CREATE TABLE master.dbo.ndproductos (
	ndproducto_id int IDENTITY(1,1) NOT NULL,
	ndproducto_nombre nvarchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	ndproducto_descripcion nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ndproducto_categoria nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ndproducto_imagenurl nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ndproducto_preciounitario decimal(12,2) NOT NULL,
	ndproducto_stock int NOT NULL,
	ndproducto_creado_en datetime2 DEFAULT sysutcdatetime() NOT NULL,
	ndproducto_actualizado_en datetime2 DEFAULT sysutcdatetime() NOT NULL,
	CONSTRAINT PK__ndproduc__BF065DB549513CCA PRIMARY KEY (ndproducto_id)
);
ALTER TABLE master.dbo.ndproductos WITH NOCHECK ADD CONSTRAINT CK__ndproduct__ndpro__1293BD5E CHECK (([ndproducto_preciounitario]>=(0)));
ALTER TABLE master.dbo.ndproductos WITH NOCHECK ADD CONSTRAINT CK__ndproduct__ndpro__1387E197 CHECK (([ndproducto_stock]>=(0)));


-- master.dbo.spt_fallback_db definition

-- Drop table

-- DROP TABLE master.dbo.spt_fallback_db;

CREATE TABLE master.dbo.spt_fallback_db (
	xserver_name varchar(30) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	xdttm_ins datetime NOT NULL,
	xdttm_last_ins_upd datetime NOT NULL,
	xfallback_dbid smallint NULL,
	name varchar(30) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	dbid smallint NOT NULL,
	status smallint NOT NULL,
	version smallint NOT NULL
);


-- master.dbo.spt_fallback_dev definition

-- Drop table

-- DROP TABLE master.dbo.spt_fallback_dev;

CREATE TABLE master.dbo.spt_fallback_dev (
	xserver_name varchar(30) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	xdttm_ins datetime NOT NULL,
	xdttm_last_ins_upd datetime NOT NULL,
	xfallback_low int NULL,
	xfallback_drive char(2) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	low int NOT NULL,
	high int NOT NULL,
	status smallint NOT NULL,
	name varchar(30) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	phyname varchar(127) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL
);


-- master.dbo.spt_fallback_usg definition

-- Drop table

-- DROP TABLE master.dbo.spt_fallback_usg;

CREATE TABLE master.dbo.spt_fallback_usg (
	xserver_name varchar(30) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	xdttm_ins datetime NOT NULL,
	xdttm_last_ins_upd datetime NOT NULL,
	xfallback_vstart int NULL,
	dbid smallint NOT NULL,
	segmap int NOT NULL,
	lstart int NOT NULL,
	sizepg int NOT NULL,
	vstart int NOT NULL
);


-- master.dbo.spt_monitor definition

-- Drop table

-- DROP TABLE master.dbo.spt_monitor;

CREATE TABLE master.dbo.spt_monitor (
	lastrun datetime NOT NULL,
	cpu_busy int NOT NULL,
	io_busy int NOT NULL,
	idle int NOT NULL,
	pack_received int NOT NULL,
	pack_sent int NOT NULL,
	connections int NOT NULL,
	pack_errors int NOT NULL,
	total_read int NOT NULL,
	total_write int NOT NULL,
	total_errors int NOT NULL
);


-- master.dbo.ndtransacciones definition

-- Drop table

-- DROP TABLE master.dbo.ndtransacciones;

CREATE TABLE master.dbo.ndtransacciones (
	ndtransaccion_id int IDENTITY(1,1) NOT NULL,
	ndtransaccion_fecha datetime2 DEFAULT sysutcdatetime() NOT NULL,
	ndtransaccion_tipo nvarchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	ndtransaccion_producto_id int NOT NULL,
	ndtransaccion_cantidad int NOT NULL,
	ndtransaccion_preciounitario decimal(12,2) NOT NULL,
	ndtransaccion_total AS ([ndtransaccion_cantidad]*[ndtransaccion_preciounitario]) PERSISTED,
	ndtransaccion_detalle nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ndtransaccion_creado_en datetime2 DEFAULT sysutcdatetime() NOT NULL,
	CONSTRAINT PK__ndtransa__44649EC755B0B78F PRIMARY KEY (ndtransaccion_id),
	CONSTRAINT FK_ndtransacciones_ndproductos FOREIGN KEY (ndtransaccion_producto_id) REFERENCES master.dbo.ndproductos(ndproducto_id) ON UPDATE CASCADE
);
ALTER TABLE master.dbo.ndtransacciones WITH NOCHECK ADD CONSTRAINT CK__ndtransac__ndtra__1940BAED CHECK (([ndtransaccion_tipo]='venta' OR [ndtransaccion_tipo]='compra'));
ALTER TABLE master.dbo.ndtransacciones WITH NOCHECK ADD CONSTRAINT CK__ndtransac__ndtra__1A34DF26 CHECK (([ndtransaccion_cantidad]>(0)));
ALTER TABLE master.dbo.ndtransacciones WITH NOCHECK ADD CONSTRAINT CK__ndtransac__ndtra__1B29035F CHECK (([ndtransaccion_preciounitario]>=(0)));


-- dbo.spt_values source

ALTER view spt_values as
select name collate database_default as name,
	number,
	type collate database_default as type,
	low, high, status
from sys.spt_values;