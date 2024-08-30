import { now, size } from 'lodash'
import { fixedNum, hexColorToBabylonColors, toRadians, RectangleCalculateParametersWithSides, CubeCalcWithSides, ParallelepipedCalcWithSides, ScientificNotationsIfVeryBig } from '../../components/FormShapes/formulas.js'


export function egeLevel1(nowStage, S=96) {
    const a = Math.sqrt(S/6)
    const r = a/2
    const answer = fixedNum(4/3 * Math.PI * r**3)

    const text = [
        `Площадь поверхности куба Sпп, описанного около сферы, равна ${fixedNum(S)}. Найдите <u>объём сферы</u>.`,
        `Площадь поверхности куба равна суммарной площади шести квадратов, составляющих его грани. Следовательно площадь одной грани S = Sпп/6 = ${fixedNum(S/6)}`,
        `Найдём сторону куба, зная площадь одного квадрата: a = S^(1/2) = ${fixedNum(a)}.`,
        `Радиус сферы r равен половине длины ребра куба r = a/2 = ${fixedNum(a/2)}`,
        `Теперь, зная радиус, найдём объём сферы<br>V = 4/3 * π * r^3 = ${answer}<br><b><u>ОТВЕТ: ${answer}</b></u>`
    ]
    let z = 0
    const shiftX = a / 2, shiftY = a / 2
    let [b, c] = [a, a]
    const cubeLines = [
        [0 - shiftX, z, 0 - shiftY, b - shiftX, z, 0 - shiftY, [1,1,1]],
        [b - shiftX, z, 0 - shiftY, b - shiftX, z, c - shiftY, [1,1,1]],
        [b - shiftX, z, c - shiftY, 0 - shiftX, z, c - shiftY, [1,1,1]],
        [0 - shiftX, z, c - shiftY, 0 - shiftX, z, 0 - shiftY, [1,1,1]],

        [0 - shiftX, a+z, 0 - shiftY, b - shiftX, a+z, 0 - shiftY, [1,1,1]],
        [b - shiftX, a+z, 0 - shiftY, b - shiftX, a+z, c - shiftY, [1,1,1]],
        [b - shiftX, a+z, c - shiftY, 0 - shiftX, a+z, c - shiftY, [1,1,1]],
        [0 - shiftX, a+z, c - shiftY, 0 - shiftX, a+z, 0 - shiftY, [1,1,1]],

        [0 - shiftX, z, 0 - shiftY, 0 - shiftX, a+z, 0 - shiftY, [1,1,1]],
        [b - shiftX, z, 0 - shiftY, b - shiftX, a+z, 0 - shiftY, [1,1,1]],
        [b - shiftX, z, c - shiftY, b - shiftX, a+z, c - shiftY, [1,1,1]],
        [0 - shiftX, z, c - shiftY, 0 - shiftX, a+z, c - shiftY, [1,1,1]]
    ]
    const sphereParams = [r, r*2, Math.PI*r*2, 4*Math.PI*r**2, answer]
    

    const arrScenarioDictsBuildParams = [{
        'fieldClear': [],
        'sphere':sphereParams
    },
    {
        'fieldClear': [],
    },
    {
        'fieldClear': [],
    },
    {
        'fieldClear': [],
    },
    {
        'fieldClear': [],
    },
    ]

    for (let j = 0; j<arrScenarioDictsBuildParams.length; j++){
        let i = 0;
        cubeLines.forEach(line => {
            arrScenarioDictsBuildParams[0][`line3d_${i}`] = line;
            i++;
        });
    }
    return [text, arrScenarioDictsBuildParams, answer] 
}

export function egeLevel2(nowStage) {
    
}