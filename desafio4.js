/*
4. Desafío 4: Functión factorial

Escriba una función/método en (cualquier lenguaje, sin usar librerías adicionales) que determine la cantidad de 0’s a la derecha de n! (factorial). Use para probar el número 1000.

*/

/**
 * Sea numeroADescomponer = K*base^E
 * entrega el exponente E, dado numeroADescomponer y base
 * @param {*} numeroADescomponer 
 * @param {*} base 
 * @param {*} exponenteAcumulado 
 * @returns 
 */
const contarPotenciasDeN = (numeroADescomponer, base, exponenteAcumulado = 0) => {
    if (numeroADescomponer == 0 || base <= 1)
        return 0
    if (numeroADescomponer % base != 0)
        return exponenteAcumulado
    return contarPotenciasDeN(numeroADescomponer / base, base, exponenteAcumulado + 1)
}
/**
 * Acumula la cantidad de potencias de 2 y 5 de un factorial
 * entrega el minimo, o sea, las potencias de 10
 * @param {*} factorialACalcular 
 * @param {*} potenciasDe2 
 * @param {*} potenciasDe5 
 * @returns 
 */
const calcularCerosFactorial =
    (factorialACalcular, potenciasDe2 = 0, potenciasDe5 = 0) => {
        if (factorialACalcular <= 1)
            return Math.min(potenciasDe2, potenciasDe5)
        return calcularCerosFactorial(
            factorialACalcular - 1,
            potenciasDe2 + (contarPotenciasDeN(factorialACalcular,2)),
            potenciasDe5 + (contarPotenciasDeN(factorialACalcular,5))
        )
    }

console.log(calcularCerosFactorial(1000))