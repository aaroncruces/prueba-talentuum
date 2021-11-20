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

//import * as data from"./last_year_test.json"
const data = require('./last_year_test.json');
console.log(data)