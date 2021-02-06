CREATE OR REPLACE VIEW alumno_view AS
	SELECT p.nid_persona, p.nom_persona, p.ape_pate_pers, p.ape_mate_pers, concat(g.desc_grado,' Grado ', g.nivel) as grado, p.fecha_naci, p.foto_ruta
	FROM schooldb.persona p, schooldb.grado g where p.nid_grado = g.nid_grado;