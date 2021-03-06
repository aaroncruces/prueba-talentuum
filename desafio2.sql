/*
Mientras escribías el procedimiento del desafío anterior, se le encargó a un colega respaldar la información recopilada sobre los titanes en una base de datos relacional (MySQL). Para ti es un misterio cómo pudo tu colega identificar a cada titán, diferenciarlo del resto, y medir su altura. El modelo de datos (simplificado) es el siguiente:
<<desafio2.png>>

Consideraciones modelo:
    La altura ( titanes.altura ) se encuentra representada en metros.
    Un titán podría (o no) estar relacionado con un registro de “muerte”.
    Puedes encontrar la definición (sentencias  CREATE TABLE ) específica del modelo de datos, junto con un set de  INSERT’S  para realizar las consultas requeridas, en el archivo modelo_y_datos.sql.

Escribe consultas (en MySQL) para rescatar la siguiente información del modelo de datos:
    Nombre y altura del titán más alto que haya matado el “Batallón 1”.
    Nombre y altura de titanes que no se han podido matar aún, junto con su último avistamiento (más reciente), ordenados por altura.
    Lista de titanes que hayan sido vistos más de una vez el mismo año.
    Lista de recursos que se han usado (recurso, cantidad, unidad) en matar titanes pequeños (<= 5 metros).
    Lista de titanes con incongruencias en torno a sus fechas de muerte y avistamientos.
*/


-- 1:
-- Nombre y altura del titán más alto que haya matado el “Batallón 1”.
SELECT titanes.nombre, titanes.altura 
FROM muertes
JOIN titanes ON titanes.id=muertes.id_titan 
WHERE muertes.causa="Batallón 1" AND
titanes.altura=(
	SELECT max(titanes.altura) FROM titanes
)
;

-- 2:
-- Nombre y altura de titanes que no se han podido matar aún, 
-- junto con su último avistamiento (más reciente), ordenados por altura.

SELECT 
    titanes.nombre, 
    titanes.altura, 
    ultimos_avistamientos.ultimo_avistamiento
FROM titanes
JOIN (
	-- subtabla solo con los ultimos avistameintos de cada titan
	SELECT id_titan, MAX(fecha) AS ultimo_avistamiento
	FROM titandb.avistamientos 
	GROUP BY id_titan
) as ultimos_avistamientos
ON ultimos_avistamientos.id_titan = titanes.id
WHERE titanes.id NOT IN (
	SELECT muertes.id_titan FROM muertes
)
ORDER BY titanes.altura
;

-- 3:
-- Lista de titanes que hayan sido vistos más de una vez el mismo año.
SELECT 
    titanes.id AS id_titan, 
    titanes.nombre, 
    conteo_avistamientos.año, 
    conteo_avistamientos.avistamientos_ese_año
FROM (
	-- subtabla con conteo de avistamientos por año
	SELECT id_titan, YEAR(fecha) AS año, COUNT(*) AS avistamientos_ese_año
	FROM titandb.avistamientos
	GROUP BY id_titan, YEAR(fecha)
) AS conteo_avistamientos
JOIN titanes ON titanes.id = conteo_avistamientos.id_titan
WHERE conteo_avistamientos.avistamientos_ese_año > 1
;

-- 4:
-- Lista de recursos que se han usado (recurso, cantidad, unidad) en matar titanes pequeños (<= 5 metros).
SELECT 
    recursos.nombre, 
    SUM(movimientos_recursos.cantidad) AS cantidad_total_usada, 
    recursos.unidad
FROM recursos
JOIN movimientos_recursos 	ON recursos.id=movimientos_recursos.id_recurso
JOIN muertes 				ON movimientos_recursos.id_muerte=muertes.id
JOIN titanes 				ON muertes.id_titan=titanes.id
WHERE titanes.altura<=5
GROUP BY recursos.nombre, recursos.unidad
;

-- 5:
-- Lista de titanes con incongruencias en torno a sus fechas de muerte y avistamientos.
SELECT 
	muertes.id_titan, 
    titanes.nombre, 
    muertes.fecha AS fecha_muerte, 
    avistamientos.fecha AS fecha_avistamiento
FROM muertes, avistamientos, titanes
WHERE 
	muertes.id_titan=avistamientos.id_titan AND avistamientos.id_titan= titanes.id
	AND
	avistamientos.fecha > muertes.fecha
;