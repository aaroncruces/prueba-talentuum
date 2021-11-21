/*
1. Desafío 1: Attack on Titan - Algoritmo
En un universo paralelo, la humanidad (o lo que queda de ella) vive recluida en una ciudad amurallada. El motivo de esto es que, fuera de esta muralla, es posible encontrar humanos gigantes, de entre 3 y 15 metros de altura. Dichos gigantes, que llamaremos titanes de ahora en adelante, son extremadamente violentos y no parecen responder a razonamiento, por lo que se decide tomar medidas para combatirlos.

Para aprender más sobre los titanes se busca organizar una expedición fuera de las murallas. Al ser un plan extremadamente peligroso, se te pide estimar el día del año en el que hay menor densidad de estos gigantes en las afueras de la ciudad.

Para tomar la decisión, cuentas con datos de avistamientos del año pasado. Esta información ha sido registrada en un arreglo de tuplas de números enteros, donde el índice 0 simboliza el primer día del año, y el número 364 el último. Un número mayor a 364 hace referencia a días del año siguiente. Cada tupla representará el comportamiento de un titán específico, siendo el primer número el día del año en que el titán fue visto en esa instancia; y el segundo, el día en el que dicho titán ya no se encontró fuera de la muralla.

Por ejemplo:
[
  [0,3],
  [363, 370],
  [1,2],
  [45,48],
  ...
]

Simboliza:

    [0,3] // Un titán fue visto el primer día del año, y se mantuvo en los alrededores de fuera de las murallas hasta el día 3 (dicho titán ya no era visible el día 4 del año).

    [363, 370] // Un titán fue visto el día 364 del año, y para el día 371 (día del año siguiente), ya no era visible.

    [1,2] // Un titán fue visto el día 2 del año, y para el día 3, ya no era visible.

    [45,48] // Un titán fue visto el día 46 del año, y para el día 49, ya no era visible.

Escribe un algoritmo que reciba, como input, el arreglo de datos definido por el archivo last_year.json y que retorne aquel día (el primero del año) en el que se avistaron menos titanes en las afueras de la ciudad. Considerando el entero “0” como el primero de enero. Se decide a priori no salir de la ciudad en los meses de diciembre ni enero, ya que el clima es impredecible y la posibilidad de que fracase la expedición es muy alta. Puedes usar cualquier lenguaje para escribir tu respuesta, aunque preferimos si usas uno de los siguientes: python, javascript (librerías extra permitidas), PHP. Usa la menor cantidad posible de bucles anidados.
*/

/* 
Me disculpo por la cantidad de comentarios,
pero me fue dificil resumir la funcionalidad de cada funcion en una unica frase sin generar confusiones
*/

/**
 * Toma un arreglo de 365 o mas elementos numericos (uno por dia) llamado frequencyList,
 * por cada elemento en un rango, le añade +1, sumando a la frecuencia en cada dia
 * asi, si recibe  el rango dayRange: [1,3], 
 * se le sumaria al arreglo "frequencyList", el rango [+0,+1, +1, +0,...,+0]
 * @param {Array} frequencyList 
 * @param {Array} dayRange 
 */
const increaseFrequencyToCalendar =
  (frequencyList, dayRange) => {
    //validaciones
    if (!frequencyList)
      frequencyList = [];

    if (!dayRange || dayRange.length != 2 || !Number.isInteger(dayRange[0]) || !Number.isInteger(dayRange[1]))
      return frequencyList;

    if (frequencyList.length < (dayRange[1] + 1))
      frequencyList.length = (dayRange[1] + 1);

    if (dayRange[0] > dayRange[1]) {
      const tempRange = dayRange[0]
      dayRange[0] = dayRange[1]
      dayRange[1] = tempRange
    }
    //inicializacion NaN -> 0
    for (let i = 0; i <= dayRange[1]; i++) {
      if (isNaN(frequencyList[i]))
        frequencyList[i] = 0;
    }
    //llenando con frecuencias
    for (let i = dayRange[0]; i <= dayRange[1]; i++) {
      frequencyList[i] += 1
    }
    return frequencyList
  }

/**
 * Convierte una lista de rangos de dias como [[1,2],[1,1],[2,3],[1,5]]
 * a una lista de frecuencias por cada dia, como
 * [0,3,3,2,1,1]
 * @param {Array} dayRangeList 
 * @returns 
 */
const dayRangeListToFrequencyList =
  dayRangeList => dayRangeList.reduce((calendarAccumulator, dayRange) =>
    increaseFrequencyToCalendar(calendarAccumulator, dayRange), [])

/**
 * Convierte una lista de frecuencias por cada dia, como [0,3,3,2,1,1]
 * a una lista de tuplas de [dia,frecuencia] como [[1,3],[2,3],[3,2],[4,1],[5,1],[0,0]]
 * Esto es util si se va a reordenar la lista, asi se preserva su numero de dia
 * @param {*} frequencyList 
 * @returns 
 */
const appendFrequenciesToDayList = frequencyList => frequencyList.map((frequency, dayNumber) => [dayNumber, frequency])

/**
 * Ordena una lista de tuplas de [dia,frecuencia] como [[1,3],[2,3],[3,2],[4,1],[5,1],[0,0]]
 * por su frecuencia, en orden descendente,
 * obteniendo una lista del tipo [[0,0],[4,1],[5,1],[3,2],[1,3],[2,3]]
 * 
 * @param {*} calendarWithFrequency 
 * @returns 
 */
const sortCalendarByFrecuency_ascending = calendarWithFrequency => calendarWithFrequency.sort((a, b) => a[1] - b[1])

const daysInAYear = 365
const daysInJanuary = 31
const daysOnDecember = 31
const isDayOnJanuary = (dayNumber) => dayNumber % daysInAYear < daysInJanuary;
const isDayOnDecember = (dayNumber) => dayNumber % daysInAYear >= (daysInAYear - daysOnDecember)
/**
 * De una lista de tuplas [dia,frecuencia], que esten ordenadas,
 * encuentra el primer elemento que no se encuentre en los meses enero o diciembre
 * @param {*} sortedCalendar 
 * @returns 
 */
const findSuitableDay_notJanNorDec =
  sortedCalendar => sortedCalendar.find(
    dayWithFrequency => !isDayOnJanuary(dayWithFrequency[0]) && !isDayOnDecember(dayWithFrequency[0])
  )

//ejecucion de algoritmos
const dayRangeList = require('./last_year.json');
const frequencyList = dayRangeListToFrequencyList(dayRangeList)
const calendarWithFrequencyAppended = appendFrequenciesToDayList(frequencyList)
const sortedCalendar = sortCalendarByFrecuency_ascending(calendarWithFrequencyAppended)
const suitableDayToScout=findSuitableDay_notJanNorDec(sortedCalendar)
console.log(`El dia mas adecuado para salir es el N°${suitableDayToScout[0]}, con una frecuencia de avistamientos de ${suitableDayToScout[1]} titanes`)