import { now, size } from 'lodash'
import { fixedNum, hexColorToBabylonColors, toRadians } from '../../components/FormShapes/formulas.js'

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

let easyLevel1Counter = -16;
export function easyLevel1(nowStage, MN=5, MK=6) {
    easyLevel1Counter+=9;

    let plusId
    plusId = easyLevel1Counter

    const text = [
        `Прямоугольник MNPK разбит на два треугольника. Найдите площадь треугольника <span style="color: #FFA135">MNK</span>, если <span style="color: #71FA00">MN=${fixedNum(MN)},</span> <span style="color: #FFB2E1">MK=${fixedNum(MK)}</span>`,
        `Сначала найдём площадь всего прямоугольника <span style="color: #00FFFF">Sп</span>=<span style="color: #71FA00">MN</span>*<span style="color: #FFB2E1">MK</span></span>=<span style="color: #71FA00">${fixedNum(MN)}</span>*<span style="color: #FFB2E1">${fixedNum(MK)}</span>=<span style="color: #00FFFF">${fixedNum(MN * MK)}</span>.`,
        `Так как прямоугольник MNPK разбит на два равных треугольника, то площадь треугольника <span style="color: #FFA135">MNK</span> будет в два раза меньше площади всего прямоугольника. <span style="color: #FFA135">Sт</span>=<span style="color: #00FFFF">Sп</span>/2=<span style="color: #00FFFF">${fixedNum(MN * MK)}</span>/2=<span style="color: #FFA135">${fixedNum(MN * MK / 2)}</span>`
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

    let colors0 = hexColorToBabylonColors('#FFA135')  // цвет для плоскости треугольника
    let colors1 = hexColorToBabylonColors('#71FA00') // цвета линии для MN
    let colors2 = hexColorToBabylonColors('#FFB2E1') // цвета линии MK

    const sizeText = 1.5 * Math.sqrt(MN*MK / (5*6))
    const shiftText05 = 0.3 * Math.sqrt(MN*MK / (5*6)) 
    const shiftText075 = 0.75 * Math.sqrt(MN*MK / (5*6)) 
    const Mparams = [String("M"), "#FFFFFF", sizeText, rectParams[1] / 2 + shiftText05, 0, -rectParams[0] / 2, toRadians(90), toRadians(180), 0]
    const Nparams = [String("N"), "#FFFFFF", sizeText, rectParams[1] / 2 + shiftText05, 0, rectParams[0] / 2, toRadians(90), toRadians(180), 0]
    const Pparams = [String("P"), "#FFFFFF", sizeText, -rectParams[1] / 2 - shiftText075, 0, rectParams[0] / 2, toRadians(90), toRadians(180), 0]
    const Kparams = [String("K"), "#FFFFFF", sizeText, -rectParams[1] / 2 - shiftText075, 0, -rectParams[0] / 2, toRadians(90), toRadians(180), 0]

    const MNParams = [String(MN), "#71FA00", sizeText*0.6, +rectParams[1] / 2 + shiftText05, 0, 0, toRadians(90), toRadians(180), 0]
    const MKParams = [String(MK), "#FFB2E1", sizeText*0.6, 0, 0, -rectParams[0] / 2-shiftText05*1.5, toRadians(90), toRadians(180), 0]

    const SrParams = [String(MK*MN), "#00FFFF", sizeText*1, 0, 0, 0, toRadians(90), toRadians(180), 0]
    const StParams = [String(MK*MN/2), "#FFA135", sizeText*1, MK/5, 0, -MN/4, toRadians(90), toRadians(180), 0]
    const arrScenarioDictsBuildParams = [{  // ключ - название метода из BasicScene, значение - параметры, которые нужно передать в этот метод
        'fieldClear': [],
        'line3d': lineParams,
        'rectangle': rectParams,
        'changeColorLine': [colors1[0], colors1[1], colors1[2], plusId, 1],
        'changeColorLine_2': [colors2[0], colors2[1], colors2[2], plusId, 0],
        'ground': trianglePoints,
        'changeColorGround': [colors0[0], colors0[1], colors0[2], 0.2, 1+plusId],
        'createTextPlane': Mparams,
        'createTextPlane_2': Nparams,
        'createTextPlane_3': Pparams,
        'createTextPlane_4': Kparams,
        'createTextPlane_5': MNParams,
        'createTextPlane_6': MKParams,
    }, {
        'fieldClear': [],
        'line3d': lineParams,
        'rectangle': rectParams,
        'rectangle_2': rectParams2, // ключи не могут повторяться, поэтому добавляем уникальность с помощью '_' и порядкового номера
        'changeColorLine': [colors1[0], colors1[1], colors1[2], plusId, 1],
        'changeColorLine_2': [colors2[0], colors2[1], colors2[2], plusId, 0],
        'changeColorGround': [0, 1, 1, 0.2, 1+plusId],
        'createTextPlane': Mparams,
        'createTextPlane_2': Nparams,
        'createTextPlane_3': Pparams,
        'createTextPlane_4': Kparams,
        'createTextPlane_5': MNParams,
        'createTextPlane_6': MKParams,
        'createTextPlane_7': SrParams,
    }, {
        'fieldClear': [],
        'line3d': lineParams,
        'rectangle': rectParams,
        'ground': trianglePoints,
        'changeColorLine': [colors1[0], colors1[1], colors1[2], plusId, 1],
        'changeColorLine_2': [colors2[0], colors2[1], colors2[2], plusId, 0],
        'changeColorGround': [colors0[0], colors0[1], colors0[2], 0.2, 1+plusId],
        'createTextPlane': Mparams,
        'createTextPlane_2': Nparams,
        'createTextPlane_3': Pparams,
        'createTextPlane_4': Kparams,
        'createTextPlane_5': MNParams,
        'createTextPlane_6': MKParams,
        'createTextPlane_7': StParams,
    },]

    if (nowStage >= 1){
        easyLevel1Counter += 1
    }
    if (nowStage > 2){
        easyLevel1Counter += 1
    }
    return [text, arrScenarioDictsBuildParams]
}