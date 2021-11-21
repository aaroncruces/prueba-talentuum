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
-- Nombre y altura del titán más alto que haya matado el “Batallón 1”.
SELECT titanes.nombre, titanes.altura 
FROM muertes
JOIN titanes ON titanes.id=muertes.id_titan 
WHERE muertes.causa="Batallón 1" AND
titanes.altura=(
	SELECT max(titanes.altura) FROM titanes
);

-- Nombre y altura de titanes que no se han podido matar aún, 
-- junto con su último avistamiento (más reciente), ordenados por altura.

SELECT titanes.nombre, titanes.altura, ultimos_avistamientos.ultimo_avistamiento
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