import { fixedNum, hexColorToBabylonColors } from '../../components/FormShapes/formulas.js'

const RectangleCalculateParametersWithSides = (side_a, side_b) => {
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

export function easyLevel1(MN=5, MK=6) {
    const text = [
        `Прямоугольник MNPK разбит на два треугольника. Найдите площадь треугольника <span style="color: #00FFFF">KPN</span>, если <span style="color: #71FA00">MN=${fixedNum(MN)},</span> <span style="color: #FFB2E1">MK=${fixedNum(MK)}</span>`,
        `Сначала найдём площадь всего прямоугольника <span style="color: #00FFFF">S</span>=<span style="color: #71FA00">MN</span>*<span style="color: #FFB2E1">MK</span></span>=<span style="color: #71FA00">${fixedNum(MN)}</span>*<span style="color: #FFB2E1">${fixedNum(MK)}</span>=<span style="color: #00FFFF">${fixedNum(MN * MK)}</span>.`,
        `Так как прямоугольник MNPK разбит на два равных треугольника, то площадь треугольника KPN будет в два раза меньше площади всего прямоугольника. SKPN=S/2=${fixedNum(MN * MK)}/2=${fixedNum(MN * MK / 2)}`
    ]
    const rectParams = RectangleCalculateParametersWithSides(MN, MK)
    const rectParams2 = rectParams.slice()
    rectParams2.push(1) // активировать построение плоскости
    const lineParams = [-rectParams[1] / 2, 0, -rectParams[0] / 2, rectParams[1] / 2, 0, rectParams[0] / 2, [1, 1, 1]]  // диагональ
    const shiftX = MK / 2, shiftY = MN / 2
    const trianglePoints = [
        -shiftX, 0, -shiftY,
        MK - shiftX, 0, -shiftY,
        MK-shiftX, 0, MN - shiftY,
    ]
    
    let colors1 = hexColorToBabylonColors('#71FA00') // цвета линии для MN
    let colors2 = hexColorToBabylonColors('#FFB2E1') // цвета линии MK
    const arrScenarioDictsBuildParams = [{  // ключ - название метода из BasicScene, значение - параметры, которые нужно передать в этот метод
        'fieldClear': [],
        'line3d': lineParams,
        'rectangle': rectParams,
        'changeColorLine': [colors1[0], colors1[1], colors1[2], 5, 1],
        'changeColorLine_2': [colors2[0], colors2[1], colors2[2], 5, 0],
        'ground': trianglePoints,
        'changeColorGround': [0, 1, 1, 0.1, 6]
    }, {
        'fieldClear': [],
        'line3d': lineParams,
        'rectangle': rectParams,
        'rectangle_2': rectParams2 // ключи не могут повторяться, поэтому добавляем уникальность с помощью '_' и порядкового номера
    }, {
        'fieldClear': [],
        'line3d': lineParams,
        'rectangle': rectParams,
        'ground': trianglePoints
    },]

    return [text, arrScenarioDictsBuildParams]
}