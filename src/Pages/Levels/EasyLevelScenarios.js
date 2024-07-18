import { now, size } from 'lodash'
import { fixedNum, hexColorToBabylonColors, toRadians, RectangleCalculateParametersWithSides, CubeCalcWithSides, ParallelepipedCalcWithSides, ScientificNotationsIfVeryBig } from '../../components/FormShapes/formulas.js'


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

    const MNParams = [String(ScientificNotationsIfVeryBig(MN, 4)), "#71FA00", sizeText*0.6, +rectParams[1] / 2 + shiftText05, 0, 0, toRadians(90), toRadians(180), 0]
    const MKParams = [String(ScientificNotationsIfVeryBig(MK, 4)), "#FFB2E1", sizeText*0.6, 0, 0, -rectParams[0] / 2-shiftText05*1.5, toRadians(90), toRadians(180), 0]

    const SrParams = [String(ScientificNotationsIfVeryBig(MK*MN, 4)), "#00FFFF", sizeText*1, 0, 0, 0, toRadians(90), toRadians(180), 0]
    const StParams = [String(ScientificNotationsIfVeryBig(MK*MN/2, 4)), "#FFA135", sizeText*1, MK/5, 0, -MN/5, toRadians(90), toRadians(180), 0]
    const arrScenarioDictsBuildParams = [{  // ключ - название метода из BasicScene, значение - параметры, которые нужно передать в этот метод
        'setCameraPosition': [3*(MK*MN)**(1/2)],
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
    let answer = fixedNum(fixedNum(23*a**3)+fixedNum(82*a**2))
    const text = [
        `Изображена фигура, составленная из кубиков с ребром равным <span style="color: #00E9FF">${fixedNum(a)}</span>. Чему равна сумма объёма и площади поверхности этой фигуры?`,
        'Сначала посчитаем количество этих кубов, разбив эту фигуру на 3 параллелепипеда. <br>Количество кубов в самом большом параллелепипеде: 2*4*4=<span style="color: #EAFD3F">16</span><br> В <span style="color: #5CCDC9">голубом</span> и <span style="color: #FE7300">оранжевом</span> параллелепипедах: <span style="color: #5CCDC9">3</span> и <span style="color: #FE7300">4</span> куба соответственно.<br>В сумме получается <span style="color: #EAFD3F">16</span>+<span style="color: #5CCDC9">3</span>+<span style="color: #FE7300">4</span>=<b>23 куба</b>',
        `Теперь найдём объём одного куба. <span style="color: #25D400">Vк</span>=<span style="color: #00E9FF">a</span>^3=<span style="color: #00E9FF">${fixedNum(a)}</span>^3=<span style="color: #25D400">${fixedNum(a**3)}</span>`,
        `Чтобы найти объём всей фигуры, умножим количество кубов на объём одного из них: <span style="color: #25D400">V</span>=23*${fixedNum(a**3)}=<span style="color: #25D400">${fixedNum(23*a**3)}</span>`,
        `Чтобы найти площадь полной поверхости, для начала найдём площадь одной грани <span style="color: #FFE440">Sг</span>=<span style="color: #00E9FF">a</span>^2=<span style="color: #00E9FF">${fixedNum(a)}</span>^2=<span style="color: #FFE440">${fixedNum(a**2)}</span>`,
        `Теперь посчитаем количество внешних граней: <span style="color: #FFE440">${fixedNum(16*4+9+3*3)}</span>`,
        `Чтобы найти площадь поверхности всей фигуры умножим количество внешних граней на площадь одной из них <span style="color: #FFE440">S</span>=${fixedNum(16*4+9+3*3)}*${fixedNum(a**2)}=<span style="color: #FFE440">${fixedNum(82*a**2)}</span>`,
        `Наконец, в ответ запишем сумму площади и объёма <span style="color: #FFE440">S</span>+<span style="color: #25D400">V</span>=<span style="color: #FFE440">${fixedNum(82*a**2)}</span>+<span style="color: #25D400">${fixedNum(23*a**3)}</span>=<b>${answer}</b> <br><b>ОТВЕТ: ${answer}</b>`
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
    let colors6 = hexColorToBabylonColors('#00E9FF') // blue2
    
    const rectanglePoints = [
        0,0,0,
        0,a,0,
        0,a,a,
        0,0,a
    ]

    const lenStrA = String(a).length
    let multi, multiSize
    if ((0 < a && a < 6) && (a % 2 == 0)) multi = 1.7
    else if (0 < a && a < 6) multi = 1
    else if (30 < a) multi = 2.5
    else multi = 2

    const sizeText = multi * (a**2 / 2)**(1/3)

    let shiftText035, shiftText05
    if (lenStrA < 3) {
        shiftText035 = a/5
        shiftText05 = a/1.5
    } else {        
        shiftText035 =  0.35 * Math.sqrt(a**2 / 2) * Math.sqrt(lenStrA/3)
        shiftText05 = 0.5 * Math.sqrt(a**2 / 2) * Math.sqrt(lenStrA/3)
    }

    if (a == 2) multiSize = 4
    else multiSize = 5
    const bigSParams = [String(ScientificNotationsIfVeryBig(82*a**2, 4)), "#000000", sizeText*multiSize, 2*a,2*a,-0.05, 0,0,0]
    const SgParams = [String(ScientificNotationsIfVeryBig(a**2, 4)), "#000000", sizeText, -0.05*a**(1/3),a/2,a/2-a/8, 0,toRadians(90),0]

    const VgParams = [String(ScientificNotationsIfVeryBig(a**3, 4)), "#000000", sizeText, -0.05*a**(1/3),a/2,a/2-a/8, 0,toRadians(90),0]
    const bigVParams = [String(ScientificNotationsIfVeryBig(23*a**3, 4)), "#000000", sizeText*multiSize, 2*a,2*a,-0.05, 0,0,0]

    const aParams = [String(ScientificNotationsIfVeryBig(a, 4)), "#00E9FF", sizeText, shiftText05,0,-shiftText035, toRadians(90),0,0]
    const arrScenarioDictsBuildParams = [{
        'setCameraPosition': [35*a**1/3, Math.PI / 3, Math.PI / 5, [2*a,2*a,1.5*a]],
        'fieldClear': [],
        'createTextPlane': aParams,
        'parallelepiped': [...parallelepipedParams, 2*a, a, 0, true],
        'parallelepiped_2': [...parallelepipedParams2, 4.5*a, 1.5*a, 0, true],
        'parallelepiped_3': [...parallelepipedParams3, 2*a, 2.5*a, 3*a, true],
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
        'createTextPlane_2': VgParams,
    },
    {
        'fieldClear': [],
        'createTextPlane': aParams,
        'parallelepiped': [...parallelepipedParams, 2*a, a, 0, true, colors3],
        'parallelepiped_2': [...parallelepipedParams2, 4.5*a, 1.5*a, 0, true, colors3],
        'parallelepiped_3': [...parallelepipedParams3, 2*a, 2.5*a, 3*a, true, colors3],
        'createTextPlane_2': bigVParams,
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
    },{
        'fieldClear': [],
        'createTextPlane': aParams,
        'parallelepiped': [...parallelepipedParams, 2*a, a, 0, true, colors4],
        'parallelepiped_2': [...parallelepipedParams2, 4.5*a, 1.5*a, 0, true, colors4],
        'parallelepiped_3': [...parallelepipedParams3, 2*a, 2.5*a, 3*a, true, colors4],
        'createTextPlane_2': bigSParams,
    },{
        'fieldClear': [],
        'createTextPlane': aParams,
        'parallelepiped': [...parallelepipedParams, 2*a, a, 0, true],
        'parallelepiped_2': [...parallelepipedParams2, 4.5*a, 1.5*a, 0, true],
        'parallelepiped_3': [...parallelepipedParams3, 2*a, 2.5*a, 3*a, true],
    }]

    let plusId = 0
    if (nowStage === 1) {
        plusId += 43
    }
    for (let numStage=0; numStage<arrScenarioDictsBuildParams.length; numStage++){
        for (let x=0; x<5; x++){  // строим большую фигуру из маленьких кубов
            for (let y=0; y<3; y++){
                for (let z=0; z<4; z++){
                    let nameFunc = 'cube_'+x+y+z
                    if (!((x === 4 && z === 3) || (x===4 && y === 0) || (y===2 && z<3))){
                        if (x === 0 && y === 0 && z === 0) {
                            arrScenarioDictsBuildParams[numStage][nameFunc] = [...cubeParams, -(x+0.5)*a, -(y+0.5)*a, z*a, 0, 5]
                            continue
                        }
                        arrScenarioDictsBuildParams[numStage][nameFunc] = [...cubeParams, -(x+0.5)*a, -(y+0.5)*a, z*a]
                    }
                }
            }
        }
        arrScenarioDictsBuildParams[numStage]['changeColorLine'] = [colors6[0], colors6[1], colors6[2], 5, 0]
    }


    return [text, arrScenarioDictsBuildParams, answer]
}