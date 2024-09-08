// Контрольная проверка всех переменных и построение фигуры
// Принимает в себя 2 массива arrInput(массив введённых данных) и arrCheck (массив подсчитанных данных) для сравнения
// handleFormSubmit, event, shape - для отправки формы
// idInputs - список айдишкиков инпутов, для присвоения всем input их подсчитанные значения
// strGood, strBad - для вывода ошибок
export const checkCalculate = (handleFormSubmit, event, shape, arrInput, arrCheck, idInputs, strGood, strBad) => {
    //console.log(arrInput)
    //console.log(arrCheck)
    // Цикл проверяет насколько введённые данные отличаются от подсчитанных. Погрешность 0.05. Также проверка, что все числа !NaN и !0
    for (let i = 0; i < arrInput.length; i += 1) {
        if (!arrCheck[i]) {
            console.log(strBad)
            return
        }
        if (!arrInput[i] || Math.abs(arrInput[i] - arrCheck[i]) < 0.05) continue
        else {
            console.log(strBad, "Подозреваемое число -", idInputs[i], arrInput[i], `. Введённое значение(${arrInput[i]})-посчитанное значение(${arrCheck[i]}) =`, arrInput[i] - arrCheck[i])
            return
        }
    }
   // console.log(strGood)
    // Цикл приравнивает всем input полям их подсчитанные значения
    for (let i = 0; i < arrCheck.length; i++) {
       
        // Погрешность 0.004 для окргуления до целого
        if (Math.abs(arrCheck[i] - Math.round(arrCheck[i])) < 0.004) arrCheck[i] = Math.round(arrCheck[i])

        let inputObj = document.getElementById(idInputs[i])

        inputObj.value = fixedNum(arrCheck[i])
    }
    // Отправляем форму, строим фигуру
    handleFormSubmit(event, shape)
}

// Проверка на то, что какое то число введено менише/равно нулю
export function checkBelowZero(arrInput, idInputs) {
    for (let i=0; i < arrInput.length; i++) {
        if (arrInput[i] < 0) {
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

//*треугольники
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
//сторона через теорему косинусов
export function findSideTeorCos(a, b, conor_C) {//с угол
    return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(toRadians(conor_C)))
}
export function findHeightSideArea(a, area) {
    return (2 * area) / a
}
//треугольники*

//Многоугольник 
export function calcPolygon(n, a) {
    let S = (n / 4.0) * a ** 2 * (1 / Math.tan(Math.PI / n))
    let P = n * a
    let r = a / (2 * Math.tan(Math.PI / n)) // pi/n уже в радианах
    let R = a / (2 * Math.sin(Math.PI / n))
    let alpha = (n - 2) / n * 180
    return [r, R, S, P, alpha]
}


export function hexColorToBabylonColors(hexStr) {  // преобразовывает hex строку в формат цвета для babylon. например #B6B181 в [0.7109375, 0.69140625, 0.50390625]
    hexStr = hexStr.slice(1)
    let arrColors = hexStr.match(/.{1,2}/g);
    arrColors = arrColors.map(color => "#" + color)
    for (let i=0; i<3; i++){
        arrColors[i] = parseInt(arrColors[i].substring(1), 16) / 256;
    }
    return arrColors
} 


export const RectangleCalculateParametersWithSides = (side_a, side_b) => {
    let result = [fixedNum(side_a), fixedNum(side_b)]

    let d = fixedNum(Math.sqrt(side_a * side_a + side_b * side_b))
    result.push(d)

    let S = fixedNum(side_a * side_b)
    result.push(S)

    let P = fixedNum((side_a + side_b) * 2)
    result.push(P)

    let forAsin = fixedNum((2 * S) / (d * d))
    let alpha = fixedNum(Math.asin(forAsin) * 180 / Math.PI)
    result.push(alpha)

    let betta = fixedNum((360 - alpha * 2) / 2)
    result.push(betta)

    let angle_y = fixedNum((180 - alpha) / 2)
    result.push(angle_y)

    let angle_o = fixedNum((180 - betta) / 2)
    result.push(angle_o)
    return result
}

export const CubeCalcWithSides = (a) => {
    let d = Math.sqrt(a * a + a * a);
    let D = Math.sqrt(a * a + a * a + a * a);
    let R = a * Math.sqrt(3) / 2
    let r = a / 2;
    let S = a * a * 6;
    let P = a * 12;
    let V = a * a * a;
    return [a, d, D, r, R, S, P, V]
}

export const ParallelepipedCalcWithSides = (a, b, c) => {
    let d1 = Math.sqrt(a**2 + c**2)
    let d2 = Math.sqrt(a**2 + b**2)
    let d3 = Math.sqrt(b**2 + c**2)
    let d4 = Math.sqrt(d3**2 + a**2)
    let S1 = a*c
    let S2 = a*b
    let S3 = b*c
    let S = (S1+S2+S3)*2
    let P = (a+b+c)*4
    let V = a*b*c 
    return [a, b, c, d1, d2, d3, d4, S1, S2, S3, S, P, V]
}

export const ScientificNotationsIfVeryBig = (number, remainDigits) => { // возвращает число в виде x*10^n, если изначальное x слишком большое
    let strNum = String(number)
    let intNum = String(Math.round(number))
    if (intNum.length <= remainDigits || (strNum.length <= remainDigits+6 && !Number.isInteger(number)) || (strNum.length <= remainDigits+1 && Number.isInteger(number))) return strNum

    let lenRemainNumL = intNum.length - remainDigits;
    let remainNumR = Math.round(Number(intNum.slice(0, remainDigits+1))/10)  // intNum.slice(0, remainDigits); 51.144
    const dictUpIndex = {
        '0': '⁰',
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹',
    }
    let upIndex = ''
    for (let digit of String(lenRemainNumL)){
        upIndex += dictUpIndex[digit]
    }
    let res = `${remainNumR}*10${upIndex}`
    console.log(res)
    return res
}


export const calcParamsWithSidesHeightParallelogram = (a, b, h1=0, h2=0) => {
    if (h1) h2 = (a * h1) / b
    else if (h2) h1 = (b * h2) / a

    let P = 2 * (a + b)

    let S = a * h1

    let alpha = Math.asin(h2/a)
    let betta = toRadians(180 - toDegrees(alpha))

    let diagonal1 = Math.sqrt(a**2+b**2-2*a*b*Math.cos(betta))
    let diagonal2 = Math.sqrt(a**2+b**2-2*a*b*Math.cos(alpha))

    let angle_y = Math.asin((2*S)/(diagonal1*diagonal2))
    let angle_o = toRadians(180 - toDegrees(angle_y))

    return [a, b, diagonal1, diagonal2, h1, h2, S, P, toDegrees(alpha), toDegrees(betta), toDegrees(angle_y), toDegrees(angle_o)]
}


export function middlePointLine(x1, y1, z1, x2, y2, z2) {  // находит середину отрезка
    let xc = (x1+x2)/2
    let yc = (y1+y2)/2
    let zc = (z1+z2)/2
    return [xc, yc, zc]
}


export const calcWithSidesTriangle = (a, b, c) => {
    let conor_a = toDegrees(findAngleTeorCos(a, b, c))
    let conor_b = toDegrees(findAngleTeorCos(b, a, c))
    let conor_c = toDegrees(findAngleTeorCos(c, b, a))
    let P = perimetrTriangle(a, b, c)//периметр
    let S = areaOfHeron(a, b, c)
    let height_h = findHeightSideArea(c, S)
    let height_m = findHeightSideArea(b, S)
    let height_l = findHeightSideArea(a, S)

    let inscribed_R = S * 2 / P
    let described_R = a * b * c / (4 * S)
    // console.log(S)]

    return [a, b, c, conor_a, conor_b, conor_c, height_h, height_m, height_l, S, P, inscribed_R, described_R];
}

export function coordsIntersectionBisectorAndSide(A, B, C){
    // Нахождение точки пересечения биссектрисы угла B и стороны AC в треугольнике
    // *в двухменрном пространстве

    const AB = distanceSegment(A, B);
    const BC = distanceSegment(B, C);
    const k = AB / BC;

    const N = [
        (A[0] + k * C[0]) / (1 + k),
        (A[1] + k * C[1]) / (1 + k),
        (A[2] + k * C[2]) / (1 + k)
    ];

    return N;
}

export function distanceSegment(point1, point2) {
    // Находит расстояние отрезка по двум точкам в 3д
    return Math.sqrt(
        (point1[0] - point2[0]) ** 2 +
        (point1[1] - point2[1]) ** 2 +
        (point1[2] - point2[2]) ** 2
    );
}

export function centerSegment(A, B) {
    // Находит координаты середины отрезка AB
    const x = (A[0] + B[0])/2
    const z = (A[1] + B[1])/2
    const y = (A[2] + B[2])/2
    return [x,z,y]
}

export function partSegment(A, B, k) {
    // Находит координаты точки, которая делит отрезок AB в отношении k
    const x = (1 - k) * A[0] + k * B[0];
    const y = (1 - k) * A[1] + k * B[1];
    const z = (1 - k) * A[2] + k * B[2];
    return [x, y, z];
}

export function calculateSlope(x1, y1, x2, y2) {
    // Вычисление коэфициента наклона прямой
    if (x2 === x1) {
        return null;
    }
    return (y2 - y1) / (x2 - x1);
}


export function calculateNormalVector(pointA, pointB, pointC) {
    // Вычисляем два вектора, образованные точками A, B и C
    let vectorAB = [
        pointB[0] - pointA[0],
        pointB[1] - pointA[1],
        pointB[2] - pointA[2]
    ];

    let vectorAC = [
        pointC[0] - pointA[0],
        pointC[1] - pointA[1],
        pointC[2] - pointA[2]
    ];

    // Вычисляем векторное произведение vectorAB и vectorAC
    let normalVector = [
        vectorAB[1] * vectorAC[2] - vectorAB[2] * vectorAC[1],
        vectorAB[2] * vectorAC[0] - vectorAB[0] * vectorAC[2],
        vectorAB[0] * vectorAC[1] - vectorAB[1] * vectorAC[0]
    ];

    // Нормализуем вектор нормали
    let length = Math.sqrt(normalVector[0] ** 2 + normalVector[1] ** 2 + normalVector[2] ** 2);
    normalVector = [
        normalVector[0] / length,
        normalVector[1] / length,
        normalVector[2] / length
    ];

    return normalVector;
}