import { now, size } from 'lodash'
import { fixedNum, hexColorToBabylonColors, toRadians, RectangleCalculateParametersWithSides, CubeCalcWithSides, ParallelepipedCalcWithSides, ScientificNotationsIfVeryBig } from '../../components/FormShapes/formulas.js'


export function egeLevel1(nowStage, S=96) {
    const a = Math.sqrt(S/6)
    const r = a/2
    const answer = fixedNum(4/3 * Math.PI * r**3)

    const text = [
        `Площадь поверхности куба Sпп, описанного около сферы, равна ${fixedNum(S)}. Найдите <u>объём сферы</u>.`,
        `Площадь поверхности куба равна суммарной площади шести квадратов, составляющих его грани. Следовательно площадь одной грани<br>S = Sпп/6 = ${fixedNum(S/6)}`,
        `Найдём сторону куба a, зная площадь одного квадрата: a = S^(1/2) = ${fixedNum(a)}.`,
        `Радиус сферы r равен половине длины ребра куба r = a/2 = ${fixedNum(a/2)}`,
        `Теперь, зная радиус, найдём объём сферы<br>V = 4/3 * π * r^3 = ${answer}<br><b><u>ОТВЕТ: ${answer}</b></u>`
    ]
    const sizeText = 1.3*Math.sqrt((a**3 / 45))

    let z = 0
    const shiftX = a / 2, shiftY = a / 2
    let [b, c] = [a, a]
    const cubeLines = [
        [0 - shiftX, z, 0 - shiftY, b - shiftX, z, 0 - shiftY],
        [b - shiftX, z, 0 - shiftY, b - shiftX, z, c - shiftY],
        [b - shiftX, z, c - shiftY, 0 - shiftX, z, c - shiftY],
        [0 - shiftX, z, c - shiftY, 0 - shiftX, z, 0 - shiftY],

        [0 - shiftX, a+z, 0 - shiftY, b - shiftX, a+z, 0 - shiftY],
        [b - shiftX, a+z, 0 - shiftY, b - shiftX, a+z, c - shiftY],
        [b - shiftX, a+z, c - shiftY, 0 - shiftX, a+z, c - shiftY],
        [0 - shiftX, a+z, c - shiftY, 0 - shiftX, a+z, 0 - shiftY],

        [0 - shiftX, z, 0 - shiftY, 0 - shiftX, a+z, 0 - shiftY],
        [b - shiftX, z, 0 - shiftY, b - shiftX, a+z, 0 - shiftY],
        [b - shiftX, z, c - shiftY, b - shiftX, a+z, c - shiftY],
        [0 - shiftX, z, c - shiftY, 0 - shiftX, a+z, c - shiftY]
    ]
    const sphereParams = [r, r*2, Math.PI*r*2, 4*Math.PI*r**2, answer]
    const sphereParamsColor = [r, r*2, Math.PI*r*2, 4*Math.PI*r**2, answer, [0.6, 0.6, 0.6], [0,0,1]]
    const square1 = [
        ...cubeLines[2],
        cubeLines[6][3], cubeLines[6][4], cubeLines[6][5],
        cubeLines[6][0], cubeLines[6][1], cubeLines[6][2],
    ]
    const square2 = [
        ...cubeLines[0],
        cubeLines[4][3], cubeLines[4][4], cubeLines[4][5],
        cubeLines[4][0], cubeLines[4][1], cubeLines[4][2],
    ]
    const square3 = [
        ...cubeLines[1],
        cubeLines[5][3], cubeLines[5][4], cubeLines[5][5],
        cubeLines[5][0], cubeLines[5][1], cubeLines[5][2],
    ]
    const square4 = [
        ...cubeLines[0],
        ...cubeLines[2]
    ]
    const square5 = [
        ...cubeLines[3],
        cubeLines[7][3], cubeLines[7][4], cubeLines[7][5],
        cubeLines[7][0], cubeLines[7][1], cubeLines[7][2],
    ]
    const square6 = [
        ...cubeLines[4],
        ...cubeLines[6]
    ]

    const radiusLine = [0, r, 0, r, r, 0, [1,1,1]]

    const valSparams = [`${fixedNum(S/6)}`, "#FFFFFF", sizeText, 0, r, r, 0, toRadians(180), 0]
    const valAparams = [`${fixedNum(a)}`, "#FFFFFF", sizeText, 0, 0, r+sizeText/2.5, toRadians(90), toRadians(180), 0]
    const valRparams = [`${fixedNum(r)}`, "#FFFFFF", sizeText, r/2, r, sizeText/3.5, toRadians(90), toRadians(180), 0]    
    const valVparams = [`${answer}`, "#FFFFFF", sizeText*2, -r/4, r, 0, 0, toRadians(180), 0]

    const arrScenarioDictsBuildParams = [{
        'setCameraPosition': [3*(a**3)**(1/2)],
        'fieldClear': [],
        'sphere':sphereParams,
        'ground':[square1, [1,1,1], 0.3],
        'ground_1':[square2, [1,1,1], 0.3],
        'ground_2':[square3, [1,1,1], 0.3],
        'ground_3':[square4, [1,1,1], 0.3],
        'ground_4':[square5, [1,1,1], 0.3],
        'ground_5':[square6, [1,1,1], 0.3],
    },
    {
        'fieldClear': [],
        'sphere':sphereParams,
        'ground':[square1, [1,1,1], 0.4],
        'createTextPlane': valSparams,
    },
    {
        'fieldClear': [],
        'sphere':sphereParams,
        'ground':[square1, [1,1,1], 0.4],
        'createTextPlane': valSparams,
        'createTextPlane_1': valAparams,
    },
    {
        'fieldClear': [],
        'sphere':sphereParams,
        'createTextPlane': valAparams,
        'createTextPlane_1': valRparams,
        'line3d': radiusLine
    },
    {
        'fieldClear': [],
        'sphere':sphereParamsColor,
        'createTextPlane': valRparams,
        'createTextPlane_1': valVparams,
        'line3d': radiusLine
    },
    ]



    for (let j = 0; j<arrScenarioDictsBuildParams.length; j++){
        let i = 0;
        cubeLines.forEach(line => {
            let line2 = line.slice()
            if (j === 2 && i === 2) {
                line2.push([0,1,1])
            }
            else line2.push([1,1,1])
            arrScenarioDictsBuildParams[j][`line3d_${i}`] = line2;
            i++;
        });
    }
    return [text, arrScenarioDictsBuildParams, answer] 
}

export function egeLevel2(nowStage) {
    
}