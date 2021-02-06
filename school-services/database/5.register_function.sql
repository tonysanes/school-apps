create or replace function schooldb.register_student(
	xnombre character varying, 
	xape_pat character varying, 
	xape_mat character varying, 
	xid_grado integer, 
	xfecha_naci character varying, 
	xfoto_ruta character varying,
	xnivel character varying
) 
returns integer
as $body$
declare 
  	xpersona_id integer;
 	xmonto float;
begin
if xnivel = 'INI' THEN
  xmonto := 300;
end if;
if xnivel = 'PRI' THEN
  xmonto := 450;
end if;
if xnivel = 'SEC' THEN
  xmonto := 540;
end if;
insert into schooldb.persona ( nom_persona, ape_pate_pers, ape_mate_pers, nid_grado, fecha_naci, foto_ruta ) 
values (xnombre, xape_pat, xape_mat, xid_grado, xfecha_naci, xfoto_ruta) returning nid_persona into xpersona_id;

INSERT INTO schooldb.movimiento (tipo_movimiento, monto, estado, fecha_pago, id_persona, id_detalle_cronograma) VALUES ('INGRESO',xmonto, 'POR PAGAR', '0000-00-00',xpersona_id, 12); -- Matricula
INSERT INTO schooldb.movimiento (tipo_movimiento, monto, estado, fecha_pago, id_persona, id_detalle_cronograma) VALUES ('INGRESO',xmonto, 'POR PAGAR', '0000-00-00',xpersona_id, 1); -- Marzo
INSERT INTO schooldb.movimiento (tipo_movimiento, monto, estado, fecha_pago, id_persona, id_detalle_cronograma) VALUES ('INGRESO',xmonto, 'POR PAGAR', '0000-00-00',xpersona_id, 2); -- Abril
INSERT INTO schooldb.movimiento (tipo_movimiento, monto, estado, fecha_pago, id_persona, id_detalle_cronograma) VALUES ('INGRESO',xmonto, 'POR PAGAR', '0000-00-00',xpersona_id, 3); -- Mayo
INSERT INTO schooldb.movimiento (tipo_movimiento, monto, estado, fecha_pago, id_persona, id_detalle_cronograma) VALUES ('INGRESO',xmonto, 'POR PAGAR', '0000-00-00',xpersona_id, 4); -- Junio
INSERT INTO schooldb.movimiento (tipo_movimiento, monto, estado, fecha_pago, id_persona, id_detalle_cronograma) VALUES ('INGRESO',xmonto, 'POR PAGAR', '0000-00-00',xpersona_id, 5); -- Julio
INSERT INTO schooldb.movimiento (tipo_movimiento, monto, estado, fecha_pago, id_persona, id_detalle_cronograma) VALUES ('INGRESO',xmonto, 'POR PAGAR', '0000-00-00',xpersona_id, 6); -- Agosto
INSERT INTO schooldb.movimiento (tipo_movimiento, monto, estado, fecha_pago, id_persona, id_detalle_cronograma) VALUES ('INGRESO',xmonto, 'POR PAGAR', '0000-00-00',xpersona_id, 7); -- Septiembre
INSERT INTO schooldb.movimiento (tipo_movimiento, monto, estado, fecha_pago, id_persona, id_detalle_cronograma) VALUES ('INGRESO',xmonto, 'POR PAGAR', '0000-00-00',xpersona_id, 8); -- Octubre
INSERT INTO schooldb.movimiento (tipo_movimiento, monto, estado, fecha_pago, id_persona, id_detalle_cronograma) VALUES ('INGRESO',xmonto, 'POR PAGAR', '0000-00-00',xpersona_id, 9); -- Noviempre
INSERT INTO schooldb.movimiento (tipo_movimiento, monto, estado, fecha_pago, id_persona, id_detalle_cronograma) VALUES ('INGRESO',xmonto, 'POR PAGAR', '0000-00-00',xpersona_id, 10); -- Diciembre
return xpersona_id;
end;
$body$ language plpgsql;