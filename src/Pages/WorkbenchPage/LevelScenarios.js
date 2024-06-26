import { fixedNum } from '../../components/FormShapes/formulas.js'

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
        `Прямоугольник MNPK разбит на два треугольника. Найдите плозадь треугольника KPN, если MN=${MN}, MK=${MK}`,
        `Сначала найдём площадь всего прямоугольника S=MN*MK=${MN}*${MK}=${MN * MK}.`,
        `Так как прямоугольник MNPK разбит на два равных треугольника, то площадь треугольника KPN будет в два раза меньше площади всего прямоугольника. SKPN=S/2=${MN * MK}/2=${MN * MK / 2}`
    ]
    const rectParams = RectangleCalculateParametersWithSides(MN, MK)
    const rectParams2 = rectParams.slice()
    rectParams2.push(1)
    const lineParams = [-rectParams[1] / 2, 0, -rectParams[0] / 2, rectParams[1] / 2, 0, rectParams[0] / 2, [1, 1, 1]]
    const shiftX = MK / 2, shiftY = MN / 2
    const trianglePoints = [
        -shiftX, 0, -shiftY,
        MK - shiftX, 0, -shiftY,
        MK-shiftX, 0, MN - shiftY,
    ]
    const arrScenarioDictsBuildParams = [{
        'fieldClear': [],
        'line3d': lineParams,
        'rectangle': rectParams,
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