// Контрольная проверка всех переменных и построение фигуры
// Принимает в себя 2 массива arrInput(массив введённых данных) и arrCheck (массив подсчитанных данных) для сравнения
// handleFormSubmit, event, shape - для отправки формы
// idInputs - список айдишкиков инпутов, для присвоения всем input их подсчитанные значения
// strGood, strBad - для вывода ошибок
export const checkCalculate = (handleFormSubmit, event, shape, arrInput, arrCheck, idInputs, strGood, strBad) => {
    console.log(arrInput)
    console.log(arrCheck)
    // Цикл проверяет насколько введённые данные отличаются от подсчитанных. Погрешность 0.05. Также проверка, что все числа !NaN и !0
    for (let i = 0; i < arrInput.length; i += 1) {
        if (!arrCheck[i]) {
            console.log(strBad)
            return
        }
        if (!arrInput[i] || Math.abs(arrInput[i] - arrCheck[i]) < 0.05) continue
        else {
            console.log(arrInput[i])
            console.log(strBad)
            return
        }
    }
    console.log(strGood)
    // Цикл приравнивает всем input полям их подсчитанные значения
    for (let i = 0; i < arrCheck.length; i++) {
        // Погрешность 0.004 для окргуления до целого
        if (Math.abs(arrCheck[i] - Math.round(arrCheck[i])) < 0.004) arrCheck[i] = Math.round(arrCheck[i])

        let inputObj = document.getElementById(idInputs[i])
        inputObj.value = fixedNum(arrCheck[i])
    }
    // Отправляем форму, строим фигуру
    // handleFormSubmit(event, shape)
}

// Проверка на то, что какое то число введено менише/равно нулю
export function checkBelowZero(arrInput, idInputs) {
    for (let i; i < arrInput.length; i++) {
        if (!arrInput[i] || arrInput[i] <= 0) {
            console.log('error under zero - ', idInputs[i])
            return true
        }
    }
    return false
}

// Перевод радиан в градусы (по умолчанию JS считает в радианах, т.к. это система СИ)
export function toDegrees(angle) {
    return angle * (180 / Math.PI)
}

// Перевод из радиан в градусы
export function toRadians(angle) {
    return angle * (Math.PI / 180)
}

// Округление числа до 3 знаков после запятой
export function fixedNum(num) {
    if (num.toFixed(3) === num) {
        return Number(num)
    }
    else if (!num) {
        return 0
    }
    else {
        return Number(num.toFixed(3))
    }
}


// Вычисление котангенса (в радианах)
export function cot(radian) {
    return Math.cos(radian) / Math.sin(radian)
}

//треугольники
export function areaOfHeron(a, b, c) {
    let p = perimetrTriangle(a, b, c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}
export function perimetrTriangle(a, b, c) {
    return a + b + c;
}
//угол через теорему косинусов a-сторона напротив угла
export function findAngleTeorCos(a, b, c) {
    let cos_A = (b * b + c * c - a * a) / (2 * b * c);
    return Math.acos(cos_A);
}
export function findHeightSideArea(a, area) {
    return (2 * area) / a
}
//