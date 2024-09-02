import { now, size } from 'lodash'
import { fixedNum, hexColorToBabylonColors, toRadians, ScientificNotationsIfVeryBig, areaOfHeron } from '../../components/FormShapes/formulas.js'


export function egeLevel1(nowStage, S=96) {
    const a = Math.sqrt(S/6)
    const r = a/2
    const answer = fixedNum(4/3 * Math.PI * r**3)

    const Scolor = hexColorToBabylonColors("#FFBC40")
    const S2color = hexColorToBabylonColors("#CDF93E")
    const Acolor = hexColorToBabylonColors("#3DF4ED")
    const Rcolor = hexColorToBabylonColors("#F970CC")
    const Vcolor = hexColorToBabylonColors("#DDFE72")

    const text = [
        `Площадь поверхности куба <span style="color: #FFBC40">Sпп</span>, описанного около сферы, равна <span style="color: #FFBC40">${fixedNum(S)}</span>. Найдите <u>объём сферы</u>.`,
        `Площадь поверхности куба равна суммарной площади шести квадратов, составляющих его грани. Следовательно площадь одной грани<br><span style="color: #CDF93E">S</span> = <span style="color: #FFBC40">Sпп</span>/6 = <span style="color: #CDF93E">${fixedNum(S/6)}</span>`,
        `Найдём сторону куба <span style="color: #3DF4ED">a</span>, зная площадь одного квадрата: <span style="color: #3DF4ED">a</span> = <span style="color: #CDF93E">S</span>^(1/2) = <span style="color: #CDF93E">${fixedNum(S/6)}</span>^(1/2) = <span style="color: #3DF4ED">${fixedNum(a)}</span>`,
        `Радиус сферы <span style="color: #F970CC">r</span> равен половине длины ребра куба <span style="color: #F970CC">r</span> = <span style="color: #3DF4ED">a</span>/2 = <span style="color: #F970CC">${fixedNum(a/2)}</span>`,
        `Теперь, зная радиус, найдём объём сферы<br><span style="color: #DDFE72">V</span> = 4/3 * π * <span style="color: #F970CC">r</span>^3 = <span style="color: #DDFE72">${answer}</span><br><b><u>ОТВЕТ: <span style="color: #DDFE72">${answer}</span></b></u>`
    ]
    const sizeText = 2.8 * Math.sqrt(a**2 / 45)  // 1.3*Math.sqrt((a**3 / 45))

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
    const sphereParamsColor = [r, r*2, Math.PI*r*2, 4*Math.PI*r**2, answer, [0.6, 0.6, 0.6], Vcolor]
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

    const radiusLine = [0, r, 0, r, r, 0, Rcolor]

    const valSparams = [`${fixedNum(S/6)}`, "#BAF300", sizeText, 0, r, r+0.01, 0, toRadians(180), 0]
    const valAparams = [`${fixedNum(a)}`, "#3DF4ED", sizeText, 0, 0, r+sizeText/2.5, toRadians(90), toRadians(180), 0]
    const valRparams = [`${fixedNum(r)}`, "#F970CC", sizeText, r/2, r, sizeText/2.5, toRadians(90), toRadians(180), 0]    
    const valVparams = [`${ScientificNotationsIfVeryBig(answer, 3)}`, "#DDFE72", sizeText*2, -r/6, r, 0, 0, toRadians(180), 0]

    const arrScenarioDictsBuildParams = [{
        'setCameraPosition': [4*(a**2)**(1/2)],
        'fieldClear': [],
        'sphere':sphereParams,
        'ground':[square1, Scolor, 0.3],
        'ground_1':[square2, Scolor, 0.3],
        'ground_2':[square3, Scolor, 0.3],
        'ground_3':[square4, Scolor, 0.3],
        'ground_4':[square5, Scolor, 0.3],
        'ground_5':[square6, Scolor, 0.3],
        'light': [0, -1, 0]
    },
    {
        'fieldClear': [],
        'sphere':sphereParams,
        'ground':[square1, S2color, 0.4],
        'createTextPlane': valSparams,
        'light': [0, -1, 0]
    },
    {
        'fieldClear': [],
        'sphere':sphereParams,
        'ground':[square1, S2color, 0.4],
        'createTextPlane': valSparams,
        'createTextPlane_1': valAparams,
        'light': [0, -1, 0]
    },
    {
        'fieldClear': [],
        'sphere':sphereParams,
        'createTextPlane': valAparams,
        'createTextPlane_1': valRparams,
        'line3d': radiusLine, 
        'light': [0, -1, 0]
    },
    {
        'fieldClear': [],
        'sphere':sphereParamsColor,
        'createTextPlane': valRparams,
        'createTextPlane_1': valVparams,
        'line3d': radiusLine,
        'light': [0, -1, 0]
    },
    ]



    for (let j = 0; j<arrScenarioDictsBuildParams.length; j++){
        let i = 0;
        cubeLines.forEach(line => {
            let line2 = line.slice()
            if ((j === 2 || j === 3) && i === 2) {
                line2.push(Acolor)
            }
            else line2.push([1,1,1])
            arrScenarioDictsBuildParams[j][`line3d_${i}`] = line2;
            i++;
        });
    }
    return [text, arrScenarioDictsBuildParams, answer] 
}

export function egeLevel2(nowStage, angleASB=36, baseSide=8) {
    const angleSAC = (180-angleASB)/2
    const angleMAC = angleSAC/2
    const angleAMC = 180-angleMAC-angleSAC
    const AM = baseSide * Math.sin(toRadians(angleSAC)) / Math.sin(toRadians(angleAMC))
    const BM = AM
    const AB = baseSide
    const PAMB = AM + BM + AB
    const sAMB = areaOfHeron(AB, BM, AM)
    const answer = fixedNum(sAMB)

    // const text0 = [
    //     `В правильной треугольной пирамиде SABC с основанием ABC угол ASB равен ${fixedNum(angleASB)}°. На ребре SC взята точка M так, что AM биссектриса угла SAC. Сторона основания 8. Найдите площадь сечения пирамиды, проходящего через точки A, M и B.`,
    //     `Для нахождения площади сечения, найдём все стороны треугольника AMB.<br>Рассмотрим треугольник ASC. Пирамида SABC является правильной, поэтому: ∠ASC = ∠ASB = ${fixedNum(angleASB)}°, и<br>∠SAC = ∠SCA = (180° - ∠ASC)/2 = ${fixedNum(angleSAC)}°<br>∠MAC = ∠SAC/2 = ${fixedNum(angleMAC)}°`,
    //     `Теперь рассмотрим треугольник CAM<br>∠AMC = 180° - ∠MAC - ∠SCA = 180° - ${fixedNum(angleMAC)}° - ${fixedNum(angleSAC)}° = ${fixedNum(180-angleMAC-angleSAC)}°<br>∠AMC = ∠SCA => треугольник CAM равнобедренный.`,
    //     `AC = ${fixedNum(baseSide)} и треугольник CAM равнобедренный, следовательно AM = AC = ${fixedNum(baseSide)}`,
    //     `Аналогичным способом найдём, что треугольник MBC является равнобедренным и BM = BS = ${fixedNum(baseSide)}`,
    //     `AB = AC = BM => треугольник AMB равносторонний со стороной ${fixedNum(baseSide)}. Найдём его площадь<br>S = (AB^2 * 3^(1/2)) / 4 = (${fixedNum(baseSide)}^2 * 3^(1/2)) / 4 = ${answer}<br><b><u>ОТВЕТ: ${answer}</b></u>`
    // ]

    const text = [
        `В правильной треугольной пирамиде SABC с основанием ABC угол ASB равен ${fixedNum(angleASB)}°. На ребре SC взята точка M так, что AM биссектриса угла SAC. Сторона основания 8. Найдите площадь сечения пирамиды, проходящего через точки A, M и B.`,
        `Для нахождения площади сечения, найдём все стороны треугольника AMB.<br>Рассмотрим треугольник ASC. Пирамида SABC является правильной, поэтому: ∠ASC = ∠ASB = ${fixedNum(angleASB)}°, и<br>∠SAC = ∠SCA = (180° - ∠ASC)/2 = ${fixedNum(angleSAC)}°<br>∠MAC = ∠SAC/2 = ${fixedNum(angleMAC)}°`,
        `Теперь рассмотрим треугольник CAM<br>∠AMC = 180° - ∠MAC - ∠SCA = 180° - ${fixedNum(angleMAC)}° - ${fixedNum(angleSAC)}° = ${fixedNum(angleAMC)}°`,
        `Найдём AM по теореме синусов<br>AC/sin(∠AMC) = AM/sin(∠MCA). Выразим:<br>AM = AC*sin(∠MCA) / sin(∠AMC) = ${fixedNum(baseSide)} * sin(${fixedNum(angleSAC)}°) / sin(${fixedNum(angleAMC)}°) = ${fixedNum(AM)}`,
        `Докажем, что треугольники AMC и BMC равны<br>1) Пирамида правильная, поэтому все углы при основании равны => ∠SCA = ∠SCB<br>2) ∠MBC = ∠SBC/2 = ${fixedNum(angleMAC)}<br>∠BMC = 180° - ∠MBC - ∠SCB = ${fixedNum(angleAMC)}° = ∠AMC<br>3) MC - общая сторона<br>Следовательно треугольники AMC и BMC равны по стороне и двум углам.`,
        `Так как ΔAMC = ΔBMC, BM = AM = ${fixedNum(BM)}. Найдём площадь треугольного сечения по формуле Герона:<br>S = (p * (p-AB) * (p-AM) * (p-BM))^(1/2) =<br>= (${fixedNum(PAMB/2)} * (${fixedNum(PAMB/2)}-${fixedNum(AB)}) * (${fixedNum(PAMB/2)} - ${fixedNum(AM)}) * (${fixedNum(PAMB/2)} - ${fixedNum(BM)}))^(1/2) = ${answer} <br><b><u>ОТВЕТ: ${answer}</b></u>`
    ]

    const arrScenarioDictsBuildParams = [{
        'fieldClear': [],

    }, {
        'fieldClear': [],
    }, {
        'fieldClear': [],
    }, {
        'fieldClear': [],
    }, {
        'fieldClear': [],
    }, {
        'fieldClear': [],
    }, {
        'fieldClear': [],
    }]

    return [text, arrScenarioDictsBuildParams, answer] 

}