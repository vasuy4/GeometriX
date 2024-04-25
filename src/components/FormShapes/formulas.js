// Контрольная проверка всех переменных и построение фигуры
// Принимает в себя 2 массива arrInput(массив введённых данных) и arrCheck (массив подсчитанных данных) для сравнения
// handleFormSubmit, event, shape - для отправки формы
// idInputs - для присвоения всем input их подсчитанные значения
// strGood, strBad - для вывода ошибок
export const checkCalculate = (handleFormSubmit, event, shape, arrInput, arrCheck, idInputs, strGood, strBad) => {
    console.log(arrInput)
    console.log(arrCheck)
    // Цикл проверяет насколько введённые данные отличаются от подсчитанных. Погрешность 0.05
    for (let i = 0; i < arrInput.length; i+=1){
        if (!arrInput[i] || Math.abs(arrInput[i]-arrCheck[i]) < 0.05) continue
        else {
            console.log(arrInput[i])
            console.log(strBad)
            return
        }
    }
    console.log(strGood)
    // Цикл приравнивает всем input полям их подсчитанные значения
    for (let i = 0; i < arrCheck.length; i++){
        let inputObj = document.getElementById(idInputs[i])
        inputObj.value = arrCheck[i]
    }
    // Отправляем форму, строим фигуру
    //handleFormSubmit(event, shape)
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