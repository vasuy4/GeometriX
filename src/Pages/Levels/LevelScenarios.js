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

const CubeCalcWithSides = (a) => {
    let d = Math.sqrt(a * a + a * a);
    let D = Math.sqrt(a * a + a * a + a * a);
    let R = a * Math.sqrt(3) / 2
    let r = a / 2;
    let S = a * a * 6;
    let P = a * 12;
    let V = a * a * a;
    return [a, d, D, r, R, S, P, V]
}

const ParallelepipedCalcWithSides = (a, b, c) => {
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


let easyLevel1Counter = -16;
export function easyLevel1(nowStage, MN=5, MK=6) {  
    easyLevel1Counter+=9;

    let plusId
    plusId = easyLevel1Counter

    const text = [
        `Прямоугольник MNPK разбит на два треугольника. Найдите площадь треугольника <span style="color: #FFA135">MNK</span>, если <span style="color: #71FA00">MN=${fixedNum(MN)},</span> <span style="color: #FFB2E1">MK=${fixedNum(MK)}</span>`,
        `Сначала найдём площадь всего прямоугольника <span style="color: #00FFFF">Sп</span>=<span style="color: #71FA00">MN</span>*<span style="color: #FFB2E1">MK</span></span>=<span style="color: #71FA00">${fixedNum(MN)}</span>*<span style="color: #FFB2E1">${fixedNum(MK)}</span>=<span style="color: #00FFFF">${fixedNum(MN * MK)}</span>.`,
        `Так как прямоугольник MNPK разбит на два равных треугольника, то площадь треугольника <span style="color: #FFA135">MNK</span> будет в два раза меньше площади всего прямоугольника. <span style="color: #FFA135">Sт</span>=<span style="color: #00FFFF">Sп</span>/2=<span style="color: #00FFFF">${fixedNum(MN * MK)}</span>/2=<span style="color: #FFA135">${fixedNum(MN * MK / 2)}</span> <br><b>ОТВЕТ: <span style="color: #FFA135">${fixedNum(MN * MK / 2)}</span></b>`
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
    const StParams = [String(MK*MN/2), "#FFA135", sizeText*1, MK/5, 0, -MN/5, toRadians(90), toRadians(180), 0]
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
    const answer = MN * MK / 2
    return [text, arrScenarioDictsBuildParams, answer]
}

export function easyLevel2(nowStage, a=2) {

    const text = [
        `Изображена фигура, составленная из кубиков с ребром равным <span style="color: #00E9FF">${fixedNum(a)}</span>. Чему равна сумма объёма и площади поверхности этой фигуры?`,
        'Сначала посчитаем количество этих кубов, разбив эту фигуру на 3 параллелепипеда. <br>Количество кубов в самом большом параллелепипеде: 2*4*4=<span style="color: #EAFD3F">16</span><br> В <span style="color: #5CCDC9">голубом</span> и <span style="color: #FE7300">оранжевом</span> параллелепипедах: <span style="color: #5CCDC9">3</span> и <span style="color: #FE7300">4</span> куба соответственно.<br>В сумме получается <span style="color: #EAFD3F">16</span>+<span style="color: #5CCDC9">3</span>+<span style="color: #FE7300">4</span>=<b>23 куба</b>',
        `Теперь найдём объём одного куба. <span style="color: #25D400">Vк</span>=<span style="color: #00E9FF">a</span>^3=<span style="color: #00E9FF">${fixedNum(a)}</span>^3=<span style="color: #25D400">${fixedNum(a**3)}</span>`,
        `Чтобы найти объём всей фигуры, умножим количество кубов на объём одного из них: <span style="color: #25D400">V</span>=23*${fixedNum(a**3)}=<span style="color: #25D400">${fixedNum(23*a**3)}</span>`,
        `Чтобы найти площадь полной поверхости, для начала найдём площадь одной грани <span style="color: #FFE440">Sг</span>=<span style="color: #00E9FF">a</span>^2=<span style="color: #00E9FF">${fixedNum(a)}</span>^2=<span style="color: #FFE440">${fixedNum(a**2)}</span>`,
        `Теперь посчитаем количество внешних граней: <span style="color: #FFE440">${fixedNum(16*4+9+3*3)}</span>`
    ]

    const cubeParams = CubeCalcWithSides(a);
    const parallelepipedParams0 = ParallelepipedCalcWithSides(a,a,a)
    const parallelepipedParams = ParallelepipedCalcWithSides(4*a, 4*a, 2*a)
    const parallelepipedParams2 = ParallelepipedCalcWithSides(3*a, a, a)
    const parallelepipedParams3 = ParallelepipedCalcWithSides(a, 4*a, a)

    let colors0 = hexColorToBabylonColors('#EAFD3F')  // lime
    let colors1 = hexColorToBabylonColors('#5CCDC9')  // blue
    let colors2 = hexColorToBabylonColors('#FE7300')  // orange
    let colors3 = hexColorToBabylonColors('#25D400')  // green
    let colors4 = hexColorToBabylonColors('#FFE440')  // yellow
    let colors5 = hexColorToBabylonColors('#FFFA00')  // contrast yellow
    let colors6 = hexColorToBabylonColors('#00E9FF') // pink
    
    const rectanglePoints = [
        0,0,0,
        0,a,0,
        0,a,a,
        0,0,a
    ]
    
    const lenStrA = String(a).length
    const sizeText = 1.2 * Math.sqrt(a**2 / 2)
    let shiftText035, shiftText05
    if (lenStrA < 3) {
        shiftText035 = a/5
        shiftText05 = a/1.5
    } else {        
        shiftText035 =  0.35 * Math.sqrt(a**2 / 2) * Math.sqrt(lenStrA/3)
        shiftText05 = 0.5 * Math.sqrt(a**2 / 2) * Math.sqrt(lenStrA/3)
    }
    const SgParams = [String(a**2), "#000000", sizeText, -0.1,a/2,a/2-a/8, 0,toRadians(90),0]
    const aParams = [String(a), "#00E9FF", sizeText, shiftText05,0,-shiftText035, toRadians(90),0,0]
    const arrScenarioDictsBuildParams = [{
        'fieldClear': [],
        'createTextPlane': aParams,
        'parallelepiped': [...parallelepipedParams, 2*a, a, 0, true],
        'parallelepiped_2': [...parallelepipedParams2, 4.5*a, 1.5*a, 0, true],
        'parallelepiped_3': [...parallelepipedParams3, 2*a, 2.5*a, 3*a, true],
        'cylinder':[]
    },{
        'fieldClear': [],
        'createTextPlane': aParams,
        'parallelepiped': [...parallelepipedParams, 2*a, a, 0, true, colors0],
        'parallelepiped_2': [...parallelepipedParams2, 4.5*a, 1.5*a, 0, true, colors1],
        'parallelepiped_3': [...parallelepipedParams3, 2*a, 2.5*a, 3*a, true, colors2],
    },
    {
        'fieldClear': [],
        'createTextPlane': aParams,
        'parallelepiped': [...parallelepipedParams0, a/2, a/2, 0, true, colors3],
    },
    {
        'fieldClear': [],
        'createTextPlane': aParams,
        'parallelepiped': [...parallelepipedParams, 2*a, a, 0, true, colors3],
        'parallelepiped_2': [...parallelepipedParams2, 4.5*a, 1.5*a, 0, true, colors3],
        'parallelepiped_3': [...parallelepipedParams3, 2*a, 2.5*a, 3*a, true, colors3],
    },
    {
        'fieldClear': [],
        'createTextPlane': aParams,
        'ground':[rectanglePoints, colors4, 0.9],
        'createTextPlane_2': SgParams,
    },
    {
        'fieldClear': [],
        'createTextPlane': aParams,
        'parallelepiped': [...parallelepipedParams, 2*a, a, 0, true, colors4],
        'parallelepiped_2': [...parallelepipedParams2, 4.5*a, 1.5*a, 0, true, colors4],
        'parallelepiped_3': [...parallelepipedParams3, 2*a, 2.5*a, 3*a, true, colors4],
    },]

    for (let numStage=0; numStage<arrScenarioDictsBuildParams.length; numStage++){
        for (let x=0; x<5; x++){  // строим большую фигуру из маленьких кубов
            for (let y=0; y<3; y++){
                for (let z=0; z<4; z++){
                    let nameFunc = 'cube_'+x+y+z
                    if (!((x === 4 && z === 3) || (x===4 && y === 0) || (y===2 && z<3))){
                        arrScenarioDictsBuildParams[numStage][nameFunc] = [...cubeParams, -(x+0.5)*a, -(y+0.5)*a, z*a]
                    }
                }
            }
        }
    }
    const answer = 0;
    return [text, arrScenarioDictsBuildParams, answer]
}