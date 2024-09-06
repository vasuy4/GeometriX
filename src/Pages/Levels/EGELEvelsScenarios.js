import { now, size } from 'lodash'
import { fixedNum, hexColorToBabylonColors, toRadians, ScientificNotationsIfVeryBig, areaOfHeron, calculateNormalVector } from '../../components/FormShapes/formulas.js'


export function egeLevel1(nowStage, S=12) {
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

export function egeLevel2(nowStage, angleASB=36, baseSide=7) {
    const angleSAC = (180-angleASB)/2
    const angleMAC = angleSAC/2
    const angleAMC = 180-angleMAC-angleSAC
    const angleNMC = 180-90-angleSAC
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

    const colorAngleASB = hexColorToBabylonColors("#70ff4c")  // green
    const colorSC = hexColorToBabylonColors("#FFBC40")  // orange
    const colorAM = hexColorToBabylonColors("#4cccff")  // lightblue 
    const colorBaseSide = hexColorToBabylonColors("#f478ff")  // pink
    const colorAngleASC = hexColorToBabylonColors("#a1fce1")  // lightgreen
    const colorAngleSAC = hexColorToBabylonColors("#00b7ff")  // blue
    const colorAngleSCA = hexColorToBabylonColors("#2de7ff")  // lightblue
    const colorAngleMAC = hexColorToBabylonColors("#c0ff2d")  // lime

    const text = [
        `В правильной треугольной пирамиде SABC с основанием ABC угол ASB равен <span style="color: #70ff4c">${fixedNum(angleASB)}°</span>. На ребре <span style="color: #FFBC40">SC</span> взята точка M так, что <span style="color: #4cccff">AM</span> биссектриса угла SAC. Сторона основания <span style="color: #f478ff">${fixedNum(baseSide)}</span>. Найдите <u>площадь сечения пирамиды</u>, проходящего через точки A, M и B.`,
        `Для нахождения площади сечения, найдём все стороны треугольника AMB.<br>Рассмотрим треугольник ASC. Пирамида SABC является правильной, поэтому: <span style="color: #a1fce1">∠ASC</span> = <span style="color: #70ff4c">∠ASB</span> = <span style="color: #a1fce1">${fixedNum(angleASB)}°</span>, и<br><span style="color: #00b7ff">∠SAC</span> = <span style="color: #2de7ff">∠SCA</span> = (180° - <span style="color: #a1fce1">∠ASC</span>)/2 = <span style="color: #00b7ff">${fixedNum(angleSAC)}°</span><br><span style="color: #c0ff2d">∠MAC</span> = <span style="color: #00b7ff">∠SAC</span>/2 = <span style="color: #c0ff2d">${fixedNum(angleMAC)}°</span>`,
        `Теперь рассмотрим треугольник CAM<br>∠AMC = 180° - ∠MAC - ∠SCA = 180° - ${fixedNum(angleMAC)}° - ${fixedNum(angleSAC)}° = ${fixedNum(angleAMC)}°`,
        `Найдём AM по теореме синусов<br>AC/sin(∠AMC) = AM/sin(∠MCA). Выразим:<br>AM = AC*sin(∠MCA) / sin(∠AMC) = ${fixedNum(baseSide)} * sin(${fixedNum(angleSAC)}°) / sin(${fixedNum(angleAMC)}°) = ${fixedNum(AM)}`,
        `Докажем, что треугольники AMC и BMC равны<br>1) Пирамида SABC правильная => все углы в основании треугольников равны => ∠SCA = ∠SCB<br>2) BC = AC, т.к. в основании правильной пирамиды лежит равносторонний треугольник<br>3) MC - общая сторона<br>Следовательно треугольники AMC и BMC равны по двум сторонам и углу между ними.`,
        `Так как ΔAMC = ΔBMC, BM = AM = ${fixedNum(BM)}. Найдём площадь треугольного сечения AMB по формуле Герона:<br>S = (p * (p-AB) * (p-AM) * (p-BM))^(1/2) =<br>= (${fixedNum(PAMB/2)} * (${fixedNum(PAMB/2)} - ${fixedNum(AB)}) * (${fixedNum(PAMB/2)} - ${fixedNum(AM)}) * (${fixedNum(PAMB/2)} - ${fixedNum(BM)}))^(1/2) = ${answer} <br><b><u>ОТВЕТ: ${answer}</b></u>`
    ]

    const BS = Math.sin(toRadians(angleSAC)) * baseSide / Math.sin(toRadians(angleASB))
    const BH = baseSide * Math.sqrt(3) / 3
    const SH = Math.sqrt(BS**2 - BH**2)

    const AK = baseSide / 2
    const KM = Math.sqrt(AM**2 - AK**2)
    const MN = KM * Math.sin(toRadians(angleSAC/2))

    const MC = Math.sin(toRadians(angleMAC)) * baseSide / Math.sin(toRadians(angleAMC))
    const NC = MC * Math.sin(toRadians(angleNMC))
    const CL = Math.sin(toRadians(60))*NC  // отриц. сдвиг от C по x
    const NL = Math.sin(toRadians(30))*NC  // сдвиг от C по y

    
    let x = (AB * AB + AB * AB - AB * AB) / (2 * AB)
    let y = Math.sqrt(AB * AB - x * x)
    let shiftX = (0 + AB + x) / 3, shiftY = (0 + 0 + y) / 3

    const A = [0 - shiftX, 0, 0 - shiftY]
    const B = [x - shiftX, 0, y - shiftY]
    const C = [AB - shiftX, 0, 0 - shiftY]
    const M = [C[0] - CL, MN, C[2] + NL]
    const S = [0, SH, 0]
    const middleAB = [(A[0]+B[0])/2, (A[1]+B[1])/2, (A[2]+B[2])/2,]
    const middleAC = [(A[0]+C[0])/2, (A[1]+C[1])/2, (A[2]+C[2])/2,]
    const middleAM = [(A[0]+M[0])/2, (A[1]+M[1])/2, (A[2]+M[2])/2,]
    const middleBM = [(B[0]+M[0])/2, (B[1]+M[1])/2, (B[2]+M[2])/2,]
    const middleAMB = [(A[0]+B[0]+M[0])/3, (A[1]+B[1]+M[1])/3, (A[2]+B[2]+M[2])/3]

    const sizeText = 2*Math.sqrt(sAMB / 45)


    const ABparams = [...A, ...B, [1,1,1]]
    const BCparams = [...B, ...C, [1,1,1]]
    const ACparams = [...A, ...C, [1,1,1]]
    
    const BSparams = [...B, ...S, [1,1,1]]
    const ASparams = [...A, ...S, [1,1,1]]
    const CSparams2 = [...C, ...S, colorSC]
    const CSparams = [...C, ...S, [1,1,1]]


    const BMparams = [...B, ...M, [1,1,1]]
    const AMparams2 = [...A, ...M, colorAM]
    const AMparams = [...A, ...M, [1,1,1]]

    const eqAMparams = [middleAM[0], middleAM[1]-sizeText/5, middleAM[2], middleAM[0], middleAM[1]+sizeText/5, middleAM[2], [1,1,1]]
    const eqBMparams = [middleBM[0], middleBM[1]-sizeText/5, middleBM[2], middleBM[0], middleBM[1]+sizeText/5, middleBM[2], [1,1,1]]


    const Aparams = ['A', "#FFFFFF", sizeText, A[0]-sizeText/3, A[1], A[2], toRadians(90), toRadians(180), 0]
    const Bparams = ['B', "#FFFFFF", sizeText, B[0], B[1], B[2]+sizeText/5, toRadians(90), toRadians(180), 0]
    const Cparams = ['C', "#FFFFFF", sizeText, ...C, toRadians(90), toRadians(180), 0]
    const Mparams = ['M', "#FFFFFF", sizeText, M[0]+sizeText/5, M[1], M[2], 0, toRadians(180), 0]
    const Sparams = ['S', "#FFFFFF", sizeText, ...S, 0, toRadians(180), 0]

    const valABparams2 = [`${fixedNum(baseSide)}`, "#f478ff", sizeText, middleAB[0]-sizeText/2.7, middleAB[1], middleAB[2]-sizeText/8, toRadians(90), toRadians(120), 0]
    const valABparams = [`${fixedNum(baseSide)}`, "#FFFFFF", sizeText, middleAB[0]-sizeText/2.7, middleAB[1], middleAB[2]-sizeText/8, toRadians(90), toRadians(120), 0]
    const valACparams = [`${fixedNum(baseSide)}`, "#FFFFFF", sizeText, middleAC[0]+sizeText/2.5, 0, middleAC[2]-sizeText/3, toRadians(90), 0, 0]
    const valAMparams = [`${fixedNum(AM)}`, "#FFFFFF", sizeText, middleAM[0]+sizeText/3, middleAM[1]+sizeText/2, middleAM[2], toRadians(90-angleSAC), 0, toRadians(angleMAC)]

    const valSparams = [`${answer}`, '#FFFFFF', sizeText*1.1, ...middleAMB, toRadians(angleSAC), toRadians(120), 0]

    const shiftZforCSB = sizeText
    const shiftXforCSB = Math.sin(toRadians(90-angleSAC)) * shiftZforCSB / Math.sin(toRadians(angleSAC))
    const shiftZforSCB = sizeText/1.4
    const shiftXforSCB = 0.5 * shiftZforSCB / Math.sin(toRadians(60))
    
    const valAngleCSBparams = [`${fixedNum(angleASB)}°`, "#70ff4c", sizeText*0.8, S[0]-shiftXforCSB, S[1]-shiftZforCSB, S[2], toRadians(90-angleSAC), toRadians(120), 0]
    const valAngleASCparams = [`${fixedNum(angleASB)}°`, "#a1fce1", sizeText*0.8, S[0]+sizeText/8, S[1]-shiftZforCSB, S[2]-shiftXforCSB, toRadians(90-angleSAC), 0, 0]
    const valAngleSACparams = [`${fixedNum(angleSAC)}°`, "#FFFFFF", sizeText, -sizeText/3, A[1]+sizeText/2, A[2], toRadians(90-angleSAC), 0, 0] 
    const valAngleSACparams2 = [`${fixedNum(angleSAC)}°`, "#00b7ff", sizeText, -sizeText/3, A[1]+sizeText/2, A[2], toRadians(90-angleSAC), 0, 0] //00b7ff

    const valAngleMACparams = [`${fixedNum(angleMAC)}°`, "#FFFFFF", sizeText*0.8, A[0]+sizeText*1.2, A[1]+sizeText/5, A[2], toRadians(90-angleSAC), 0, 0] 
    const valAngleMACparams2 = [`${fixedNum(angleMAC)}°`, "#c0ff2d", sizeText*0.8, A[0]+sizeText*1.2, A[1]+sizeText/5, A[2], toRadians(90-angleSAC), 0, 0]  //c0ff2d

    const valAngleSCBparams = [`${fixedNum(angleSAC)}°`, "#FFFFFF", sizeText, C[0]-shiftXforSCB, C[1]+sizeText/5, C[2]+shiftZforSCB, toRadians(90-angleSAC), toRadians(-120), 0]

    const normalVectorMAC = calculateNormalVector(M, A, C)

    const angleMACparams = [...A, sizeText*0.8, 0, toRadians(angleMAC), 1, 0, ...normalVectorMAC]
    const angleMACparams2 = [...A, sizeText*0.8, 0, toRadians(angleMAC), 1, 0, ...normalVectorMAC, 1, colorAngleMAC]
    const angleMASparams = [...A, sizeText*0.7, toRadians(angleMAC*2), toRadians(angleMAC)*1.2, 1, 0, ...normalVectorMAC, -1]

    const angleSACparams = [...A, sizeText*1.5, 0, toRadians(angleMAC*2)*1.05, 2, 0.2, ...normalVectorMAC]
    const angleSACparams2 = [...A, sizeText*1.5, 0, toRadians(angleMAC*2)*1.05, 2, 0.2, ...normalVectorMAC, 1, colorAngleSAC]

    const angleSCAparams = [...C, sizeText*0.8, toRadians(180), toRadians(angleMAC*2)*1.05, 2, 0.2, ...normalVectorMAC, -1]
    const angleSCAparams2 = [...C, sizeText*0.8, toRadians(180), toRadians(angleMAC*2)*1.05, 2, 0.2, ...normalVectorMAC, -1, colorAngleSCA]


    let countArcs = 3
    if (angleSAC === angleAMC) countArcs = 2
    const angleAMCparams = [...M, sizeText*0.7, toRadians(180+angleMAC*0.9), toRadians(angleAMC)*1.111, countArcs, 0.3/countArcs, ...normalVectorMAC]

    const groundAMBparams = [[...A, ...M, ...B], [1,1,1], 0.3]

    const arrScenarioDictsBuildParams = [{
        'setCameraPosition': [8*(sAMB)**(1/2)],
        'fieldClear': [],
        'line3d': ABparams,
        'line3d_2': BCparams,
        'line3d_3': ACparams,
        'line3d_4': BSparams,
        'line3d_5': ASparams,
        'line3d_6': CSparams2,
        'line3d_7': BMparams,
        'line3d_8': AMparams2,
        'createTextPlane': Aparams,
        'createTextPlane_1': Bparams,
        'createTextPlane_2': Cparams,
        'createTextPlane_3': Mparams,
        'createTextPlane_4': Sparams,
        'createTextPlane_5': valABparams2,
        'createTextPlane_6': valAngleCSBparams,
        'createAngle3d_1': angleMACparams,
        'createAngle3d_2': angleMASparams,
        'light': [0, -1, 0]
    }, {
        'fieldClear': [],
        'light': [0, -1, 0],
        'line3d': ABparams,
        'line3d_2': BCparams,
        'line3d_3': ACparams,
        'line3d_4': BSparams,
        'line3d_5': ASparams,
        'line3d_6': CSparams,
        'line3d_7': BMparams,
        'line3d_8': AMparams,
        'createTextPlane': Aparams,
        'createTextPlane_1': Bparams,
        'createTextPlane_2': Cparams,
        'createTextPlane_3': Mparams,
        'createTextPlane_4': Sparams,
        'createTextPlane_5': valABparams,
        'createTextPlane_6': valAngleCSBparams,
        'createTextPlane_7': valAngleASCparams,
        'createTextPlane_8':valAngleSACparams2,
        'createTextPlane_9':valAngleMACparams2,
        'createAngle3d_1': angleMACparams2,
        'createAngle3d_2': angleMASparams,
        'createAngle3d_3': angleSACparams2,
        'createAngle3d_4': angleSCAparams2,
    }, {
        'fieldClear': [],
        'light': [0, -1, 0],
        'line3d': ABparams,
        'line3d_2': BCparams,
        'line3d_3': ACparams,
        'line3d_4': BSparams,
        'line3d_5': ASparams,
        'line3d_6': CSparams,
        'line3d_7': BMparams,
        'line3d_8': AMparams,
        'createTextPlane': Aparams,
        'createTextPlane_1': Bparams,
        'createTextPlane_2': Cparams,
        'createTextPlane_3': Mparams,
        'createTextPlane_4': Sparams,
        'createTextPlane_5': valABparams,
        'createTextPlane_6': valAngleCSBparams,
        'createTextPlane_7': valAngleASCparams,
        'createTextPlane_8':valAngleSACparams,
        'createTextPlane_9':valAngleMACparams,
        'createAngle3d_1': angleMACparams,
        'createAngle3d_2': angleMASparams,
        'createAngle3d_3': angleSACparams,
        'createAngle3d_4': angleSCAparams,
        'createAngle3d_5': angleAMCparams,
    }, {
        'fieldClear': [],
        'light': [0, -1, 0],
        'line3d': ABparams,
        'line3d_2': BCparams,
        'line3d_3': ACparams,
        'line3d_4': BSparams,
        'line3d_5': ASparams,
        'line3d_6': CSparams,
        'line3d_7': BMparams,
        'line3d_8': AMparams,
        'createTextPlane': Aparams,
        'createTextPlane_1': Bparams,
        'createTextPlane_2': Cparams,
        'createTextPlane_3': Mparams,
        'createTextPlane_4': Sparams,
        'createTextPlane_5': valABparams,
        'createTextPlane_6': valAngleCSBparams,
        'createTextPlane_7': valAngleASCparams,
        'createTextPlane_8':valAngleSACparams,
        'createTextPlane_9':valAngleMACparams,
        'createTextPlane_10':valACparams,
        'createTextPlane_11':valAMparams,
        'createAngle3d_1': angleMACparams,
        'createAngle3d_2': angleMASparams,
        'createAngle3d_3': angleSACparams,
        'createAngle3d_4': angleSCAparams,
        'createAngle3d_5': angleAMCparams,
    }, {
        'fieldClear': [],
        'light': [0, -1, 0],
        'line3d': ABparams,
        'line3d_2': BCparams,
        'line3d_3': ACparams,
        'line3d_4': BSparams,
        'line3d_5': ASparams,
        'line3d_6': CSparams,
        'line3d_7': BMparams,
        'line3d_8': AMparams,
        'createTextPlane': Aparams,
        'createTextPlane_1': Bparams,
        'createTextPlane_2': Cparams,
        'createTextPlane_3': Mparams,
        'createTextPlane_4': Sparams,
        'createTextPlane_5': valABparams,
        'createTextPlane_6': valAngleCSBparams,
        'createTextPlane_7': valAngleASCparams,
        'createTextPlane_8':valAngleSACparams,
        'createTextPlane_9':valAngleMACparams,
        'createTextPlane_10':valACparams,
        'createTextPlane_11':valAMparams,
        'createTextPlane_12':valAngleSCBparams,
        'createAngle3d_1': angleMACparams,
        'createAngle3d_2': angleMASparams,
        'createAngle3d_3': angleSACparams,
        'createAngle3d_4': angleSCAparams,
        'createAngle3d_5': angleAMCparams,
    }, {
        'fieldClear': [],
        'light': [0, -1, 0],
        'line3d': ABparams,
        'line3d_2': BCparams,
        'line3d_3': ACparams,
        'line3d_4': BSparams,
        'line3d_5': ASparams,
        'line3d_6': CSparams,
        'line3d_7': BMparams,
        'line3d_8': AMparams,
        'line3d_9': eqAMparams,
        'line3d_10': eqBMparams,
        'createTextPlane': Aparams,
        'createTextPlane_1': Bparams,
        'createTextPlane_2': Cparams,
        'createTextPlane_3': Mparams,
        'createTextPlane_4': Sparams,
        'createTextPlane_5': valABparams,
        'createTextPlane_6': valAngleCSBparams,
        'createTextPlane_7': valAngleASCparams,
        'createTextPlane_8':valAngleSACparams,
        'createTextPlane_9':valAngleMACparams,
        'createTextPlane_10':valACparams,
        'createTextPlane_11':valAMparams,
        'createTextPlane_12':valAngleSCBparams,
        'createTextPlane_13':valSparams,
        'createAngle3d_1': angleMACparams,
        'createAngle3d_2': angleMASparams,
        'createAngle3d_3': angleSACparams,
        'createAngle3d_4': angleSCAparams,
        'createAngle3d_5': angleAMCparams,
        'ground': groundAMBparams
    }]

    return [text, arrScenarioDictsBuildParams, answer]
}