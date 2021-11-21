/*
3. Desafío 3: Attack on Titan - Database Model

Los últimos meses han estado desapareciendo recursos sin razón aparente. Además, se ha corroborado, a través de testigos, que algunas de las muertes ingresadas nunca ocurrieron. Se te pide modificar el modelo de datos propuesto, para incluir y vincular una lista de responsables de la información (sólo identificador único y nombre). Sería valioso saber el momento exacto en que cada avistamiento es reportado y por quién. 

Además de saber quién autorizó/gestionó el movimiento de un recurso en particular. 
Finalmente, para generar un sistema de recompensas, se te pide poder saber 
quién “ejecutó” la muerte de cada titán (cuando aplica).

Escribe (en MySQL) los cambios que harías al modelo de datos para soportar y servir esta información. Luego, con el modelo de datos nuevo, escriba una consulta que rescate aquella persona que más titanes mató durante el año 2020.

*/


-- incluye personas con sus nombres
CREATE TABLE IF NOT EXISTS `personas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- agrega a la persona que produce el avistamiento
ALTER TABLE avistamientos
ADD `id_persona` INT(11);

ALTER TABLE avistamientos
ADD FOREIGN KEY (id_persona) REFERENCES personas(id); 

-- se agrega la hora del avistamiento
-- se podria unificar con TIMESTAMP, pero dependeria del software cliente
ALTER TABLE avistamientos
ADD `hora` TIME

-- agrega a la persona que autoriza
ALTER TABLE movimientos_recursos
ADD `id_persona` INT(11);

ALTER TABLE movimientos_recursos
ADD FOREIGN KEY (id_persona) REFERENCES personas(id); 

-- agrega a la persona que ejecuta
ALTER TABLE muertes
ADD `id_persona` INT(11);

ALTER TABLE muertes
ADD FOREIGN KEY (id_persona) REFERENCES personas(id); 

