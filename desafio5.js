/*
5. Desafío 5: Shiganshina

La última impresora sobreviviente en la ciudad amurallada empezó a fallar, dejando de imprimir el dígito 4. Está impresora se utiliza para imprimir cheques para consumir recursos dentro de la ciudad y es vital para el funcionamiento de la misma. Por suerte, a una persona se le ocurrió que se podían entregar dos cheques con montos A y B, tal que A+B = N, donde N es el monto total y A/B no tienen el dígito defectuoso. Se necesita entonces formular una función que nos permita imprimir A y B de forma que podamos generar los cheques. La impresora es antigua, por lo tanto la solución debe ser eficiente para poder ejecutarse con números grandes.

    Input: Monto N cheque. 

    Output: Valores A y B tal que A+B = N 

    Restricciones: 1 ≤N≤ 10^100. Al menos un dígito de N es 4 

Ejemplo:

    Entrada: N = 9463
    Salida: A = 6352, B=3111
*/

const entradaNumber = 946.3

/**
 * Toma divide los digitos que tienen 4, y los separa en 2 arrays con los digitos 2
 * @param {*} entradaNumber 
 * @returns 
 */
const separarSi4=
(entradaNumber)=>{
const entradaString = entradaNumber.toString()
const entradaCharArray = Array.from(entradaString)
const salidaCharArray = entradaCharArray.reduce(
    (arrayCharDigitos, charDigitoEntrada) => {
        //el array consiste en un array de chars con los digitos de los numeros separados
        if (charDigitoEntrada == 4) {
            arrayCharDigitos[0].push('2')
            arrayCharDigitos[1].push('2')
        } else if (charDigitoEntrada >= '0' && charDigitoEntrada <= '9'){
            arrayCharDigitos[0].push(charDigitoEntrada)
            arrayCharDigitos[1].push('0')
        }
        else {
            //si hay , o .
            arrayCharDigitos[0].push(charDigitoEntrada)
            arrayCharDigitos[1].push(charDigitoEntrada)
        }
        return arrayCharDigitos
    }, [
        [],
        []
    ])
const salidaStringArray = [salidaCharArray[0].join(""), salidaCharArray[1].join("")]
const salidaNumberArray = [Number(salidaStringArray[0]), Number(salidaStringArray[1])]
return salidaNumberArray
}
console.log(separarSi4(9463.442));

