// Контрольная проверка всех переменных и построение фигуры
export const checkCalculate = (handleFormSubmit, event, shape, arrInput, arrCheck, idInputs, strGood, strBad) => {
    console.log(arrInput)
    console.log(arrCheck)
    for (let i = 0; i < arrInput.length; i+=1){
        if (!arrInput[i] || Math.abs(arrInput[i]-arrCheck[i]) < 0.05) continue
        else {
            console.log(strBad)
            return
        }
    }
    console.log(strGood)
    for (let i = 0; i < arrCheck.length; i++){
        let inputObj = document.getElementById(idInputs[i])
        inputObj.value = arrCheck[i]
    }
    handleFormSubmit(event, shape)
}

// Перевод радиан в градусы (по умолчанию JS считает в радианах, т.к. это система СИ)
export function toDegrees (angle) {
    return angle * (180 / Math.PI)
}

// Перевод из радиан в градусы
export function toRadians (angle) {
    return angle * (Math.PI / 180)
}

// Округление числа до 3 знаков после запятой
export function fixedNum (num) {
    if (num.toFixed(3) === num){
        return Number(num)
    }
    else if (!num) {
        return 0
    }
    else {
        return Number(num.toFixed(3))
    }
}