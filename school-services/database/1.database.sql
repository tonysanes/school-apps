create database schooldb;

use schooldb;

CREATE TABLE schooldb.grado (
	nid_grado serial NOT NULL,
	desc_grado varchar(30) NULL,
	nivel varchar(3) NULL,
	CONSTRAINT grado_pk PRIMARY KEY (nid_grado)
);

CREATE TABLE schooldb.cronograma (
	id_cronograma serial NOT NULL,
	"year" int4 NOT NULL,
	CONSTRAINT cronograma_pk PRIMARY KEY (id_cronograma)
);


CREATE TABLE schooldb.persona (
	nid_persona serial NOT NULL,
	nom_persona varchar(50) NULL,
	ape_pate_pers varchar(50) NULL,
	ape_mate_pers varchar(50) NOT NULL,
	nid_grado int4 NOT NULL,
	fecha_naci varchar(15) NULL,
	foto_ruta varchar(200) NULL,
	CONSTRAINT persona_pk PRIMARY KEY (nid_persona),
	CONSTRAINT persona_fk FOREIGN KEY (nid_grado) REFERENCES schooldb.grado(nid_grado)
);


CREATE TABLE schooldb.detalle_cronograma (
	id_detalle_cronograma serial NOT NULL,
	id_cronograma int4 NOT NULL,
	desc_pension varchar(50) NULL,
	fecha_venci date NULL,
	CONSTRAINT detalle_cronograma_pk PRIMARY KEY (id_detalle_cronograma),
	CONSTRAINT detalle_cronograma_fk FOREIGN KEY (id_cronograma) REFERENCES schooldb.cronograma(id_cronograma)
);

CREATE TABLE schooldb.movimiento (
	id_movimiento serial NOT NULL,
	tipo_movimiento varchar(20) NULL,
	monto float8 NULL,
	estado varchar(20) NULL,
	fecha_pago varchar(15) NULL,
	id_persona int4 NOT NULL,
	id_detalle_cronograma int4 NOT NULL,
	CONSTRAINT movimiento_pk PRIMARY KEY (id_movimiento),
	CONSTRAINT movimiento_fk FOREIGN KEY (id_persona) REFERENCES schooldb.persona(nid_persona),
	CONSTRAINT movimiento_fk_1 FOREIGN KEY (id_detalle_cronograma) REFERENCES schooldb.detalle_cronograma(id_detalle_cronograma)
);
