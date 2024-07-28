import { size } from "lodash";
import { fixedNum, ScientificNotationsIfVeryBig, hexColorToBabylonColors, toRadians, middlePointLine, calcWithSidesTriangle, areaOfHeron } from "../../components/FormShapes/formulas";


export function mediumLevel1(nowStage, BK=15, KC=9) {
    const answer = fixedNum(4*BK+2*KC)
    const text = [
        `Биссектриса угла A, параллелограмма ABCD пересекает сторону BC в точке K. Найдите <u>периметр</u> этого параллелограмма, если <span style="color: #71FA00">BK=${fixedNum(BK)}</span>,  <span style="color: #FFB2E1">KC=${fixedNum(KC)}</span>`,
        `Биссектриса параллелограмма отсекает от него равнобедренный треугольник. Следовательно треугольник ABK равнобедренный при основании AK.`,
        `Следовательно <span style="color: #C3FF51">AB</span> = <span style="color: #71FA00">BK</span> = <span style="color: #C3FF51">${fixedNum(BK)}</span>, теперь можно найти периметр: P=(<span style="color: #71FA00">BK</span>+<span style="color: #FFB2E1">KC</span>)*2+<span style="color: #C3FF51">AB</span>*2 =
        (<span style="color: #71FA00">${fixedNum(BK)}</span>+<span style="color: #FFB2E1">${fixedNum(KC)}</span>)*2+<span style="color: #C3FF51">${fixedNum(BK)}</span>*2=<b>${answer}</b>  <br><u><b>ОТВЕТ: ${answer}</b></u>`
    ]

    let limeColor = hexColorToBabylonColors('#71FA00')  // lime BK
    let pinkColor = hexColorToBabylonColors('#FFB2E1')  // pink KC
    let lightLimeColor = hexColorToBabylonColors('#C3FF51') // lightLime

    let a = BK
    let h2= KC*1.3
    let b= BK+KC
    let c = Math.sqrt(a ** 2 - h2 ** 2)
    const katet = Math.sqrt(a ** 2 - h2 ** 2)
    const shiftX = (b + katet) / 2, shiftY = h2 / 2
    let parallelogramCoords = [
        [-shiftX, 0, -shiftY, c - shiftX, 0, h2 - shiftY, [1,1,1]],  // AK ?
        [c - shiftX, 0, h2 - shiftY, b + c - shiftX, 0, h2 - shiftY, [1,1,1]], // AD ?
        [b + c - shiftX, 0, h2 - shiftY, b - shiftX, 0, 0 - shiftY, [1,1,1]],  // AB
        [b - shiftX, 0, 0 - shiftY, 0 - shiftX+KC, 0, 0 - shiftY, limeColor],  // BK
        [0 - shiftX+KC, 0, 0 - shiftY, 0 - shiftX, 0, 0 - shiftY, pinkColor],  // KC
        [b + c - shiftX, 0, h2 - shiftY, - shiftX+KC, 0, 0 - shiftY, [1,1,1]],  //CD ?
    ]

    const shiftText05 = 0.5 * Math.sqrt(BK*KC / (15*9)) 
    const shiftText15 = 1.5 * Math.sqrt(BK*KC / (15*9)) 

    const sizeText = 3.5 * Math.sqrt(BK*KC / (15*9))
    const Aparams = [String("A"), "#FFFFFF", sizeText, b + c - shiftX, 0, h2 - shiftY,  toRadians(90), toRadians(180), 0]
    const Bparams = [String("B"), "#FFFFFF", sizeText, b - shiftX+shiftText05, 0, 0 - shiftY,  toRadians(90), toRadians(180), 0]
    const Cparams = [String("C"), "#FFFFFF", sizeText, - shiftX-shiftText15, 0, 0 - shiftY,  toRadians(90), toRadians(180), 0]
    const Dparams = [String("D"), "#FFFFFF", sizeText, c - shiftX-shiftText15, 0, h2 - shiftY,  toRadians(90), toRadians(180), 0]
    const Kparams = [String("K"), "#FFFFFF", sizeText, - shiftX-shiftText15+KC+shiftText05, 0, 0 - shiftY-shiftText15,  toRadians(90), toRadians(180), 0]
    const BKparams = [String(ScientificNotationsIfVeryBig(BK, 4)), '#71FA00', sizeText, -shiftX-shiftText15+KC+shiftText05+BK/2, 0, 0 - shiftY-shiftText15,  toRadians(90), toRadians(180), 0]
    const KCparams = [String(ScientificNotationsIfVeryBig(KC, 4)), "#FFB2E1", sizeText, - shiftX-shiftText15+KC/2+shiftText05, 0, 0 - shiftY-shiftText15,  toRadians(90), toRadians(180), 0]
    
    const middleBK = middlePointLine(b - shiftX, 0, 0 - shiftY, 0 - shiftX+KC, 0, 0 - shiftY)
    const middleAB = middlePointLine(b + c - shiftX, 0, h2 - shiftY, b - shiftX, 0, 0 - shiftY)
    const equalBKparams = [middleBK[0]-sizeText/20, middleBK[1], middleBK[2]-sizeText/6,   middleBK[0]+sizeText/20, middleBK[1], middleBK[2]+sizeText/6, [1,1,1]]
    const equalABparams = [middleAB[0]+sizeText/6, middleAB[1], middleAB[2]-sizeText/20, middleAB[0]-sizeText/6, middleAB[1], middleAB[2]+sizeText/20, [1,1,1]]

    const ABparams = [String(ScientificNotationsIfVeryBig(BK, 4)), "#C3FF51", sizeText, middleAB[0]+shiftText15, middleAB[1], middleAB[2]-shiftText05, toRadians(90), toRadians(180), 0]

    const angleParams = [b + c - shiftX, h2 - shiftY, sizeText, toRadians(180), toRadians(26.5)]
    const angleParams2 = [b + c - shiftX, h2 - shiftY, sizeText*1.1, toRadians(180+25), toRadians(27)]
    const angleParams3 = [- shiftX+KC, 0 - shiftY, sizeText, 0, toRadians(26.5)]
    const arrScenarioDictsBuildParams = [{
        'setCameraPosition': [3*(BK*KC)**(1/2)],
        'fieldClear': [],
        'createTextPlane': Aparams,
        'createTextPlane_2': Bparams,
        'createTextPlane_3': Cparams,
        'createTextPlane_4':Dparams,
        'createTextPlane_5':Kparams,
        'createTextPlane_6':BKparams,
        'createTextPlane_7':KCparams,
        'createAngle2d': angleParams,
        'createAngle2d_2': angleParams2,
        'updateDistance': [],
        'updateLineLength': [],
    },{
        'fieldClear': [],
        'createTextPlane': Aparams,
        'createTextPlane_2': Bparams,
        'createTextPlane_3': Cparams,
        'createTextPlane_4':Dparams,
        'createTextPlane_5':Kparams,
        'createTextPlane_6':BKparams,
        'createTextPlane_7':KCparams,
        'createAngle2d': angleParams,
        'createAngle2d_2': angleParams2,
        'createAngle2d_3': angleParams3,
        'line3d_7': equalBKparams,
        'line3d_8': equalABparams,
    },{
        'fieldClear': [],
        'createTextPlane': Aparams,
        'createTextPlane_2': Bparams,
        'createTextPlane_3': Cparams,
        'createTextPlane_4':Dparams,
        'createTextPlane_5':Kparams,
        'createTextPlane_6':BKparams,
        'createTextPlane_7':KCparams,
        'createTextPlane_8': ABparams,
        'createAngle2d': angleParams,
        'createAngle2d_2': angleParams2,
        'createAngle2d_3': angleParams3,
        'line3d_7': equalBKparams,
        'line3d_8': equalABparams,
    }]

    for (let stage=0; stage<arrScenarioDictsBuildParams.length; stage++){
        for (let i=0; i<parallelogramCoords.length; i++) {
            arrScenarioDictsBuildParams[stage][`line3d_${i}`] = parallelogramCoords[i]
        }
    }

    arrScenarioDictsBuildParams[2]['line3d_2'] = [...parallelogramCoords[2].slice(0, -1), lightLimeColor] // меняем цвет линии на светло салатовый во 2 stage  

    return [text, arrScenarioDictsBuildParams, answer] 
}

export function mediumLevel2(nowStage, angle1=132) {
    const answer = fixedNum(180-angle1)

    const text = [
        `AB = BC, <span style="color: #00FFFF">∠1 = ${angle1}°</span>. Найдите <span style="color: #3DFF00">∠2</span>`,
        `<span style="color: #FFB2E1">∠ACB</span> и <span style="color: #00FFFF">∠1</span> смежные углы, так как лежат на одной прямой => <span style="color: #FFB2E1">∠ACB</span> = 180° - <span style="color: #00FFFF">∠1</span> = 180° - <span style="color: #00FFFF">${angle1}°</span> = <span style="color: #FFB2E1">${answer}°</span>`,
        `AB = BC, значит треугольник ABC равнобедренный => <span style="color: #FF73DC">∠BAC</span> = <span style="color: #FFB2E1">∠ACB</span> = <span style="color: #FF73DC">${answer}°</span>`,
        `<span style="color: #3DFF00">∠2</span> и <span style="color: #FF73DC">∠BAC</span> - вертикальные => <span style="color: #3DFF00">∠2</span> = <span style="color: #FF73DC">∠BAC</span> = <span style="color: #3DFF00">${answer}°</span><br><u><b>ОТВЕТ: <span style="color: #3DFF00">${answer}°</span></b></u>`
    ]

    let lightBlue = hexColorToBabylonColors("#00FFFF")
    let green = hexColorToBabylonColors("#3DFF00")
    let pinkColor = hexColorToBabylonColors('#FFB2E1') 
    let pink2 = hexColorToBabylonColors('#FF73DC')

    const angleBase = answer
    const angleTop = 180 - answer * 2
    const AC = 6
    const bok = AC/(2 * Math.cos(toRadians(angleBase)))
    const triangleParams = calcWithSidesTriangle(bok, bok, AC)
    const a = bok, b = bok, c = AC
    let x = (a * a + c * c - b * b) / (2 * c)
    let y = Math.sqrt(a * a - x * x )
    let shiftX = (0 + c + x) / 3, shiftY = (0 + 0 + y) / 3

    const baseLine = [0 - shiftX, 0, 0 - shiftY,    c - shiftX, 0, 0 - shiftY]
    const bokLine = [x - shiftX, 0, y - shiftY, 0 - shiftX, 0, 0 - shiftY]
    const bokLine2 = [c - shiftX, 0, 0 - shiftY, x - shiftX, 0, y - shiftY]


    const k = (bokLine[5]-bokLine[2])/(bokLine[3]-bokLine[0])
    const k2 = (bokLine2[5]-bokLine2[2])/(bokLine2[3]-bokLine2[0])
    let areaTriangle = areaOfHeron(a, b, c)
    if (areaTriangle < 7.031570638560454) {
        areaTriangle *= 3
    }
    const combo = 7.031570638560454*(7.031570638560454/3) / (areaTriangle/5) // 7.031570638560454 for 142
    const combo2 = 7.031570638560454
    const lineParams1 = [baseLine[0]-combo2 / 5, 0, baseLine[2],    baseLine[3] + combo2/5, 0, baseLine[5], [1,1,1]]
    const lineParams2 = [baseLine[0], 0, baseLine[2],  baseLine[0] - combo/5, 0, baseLine[2] - k*(combo/5), [1,1,1]]
    const angleParams1 = [baseLine[3], baseLine[5], combo2/12, 0, toRadians(angle1), 1, 0, 0, "XOZ", lightBlue]
    const angleParams2 =[bokLine[3], bokLine[5], combo2/12, toRadians(180), toRadians(180-angle1*0.99), 2, combo2/30, 0, "XOZ", green]

    const middleLine1 = [(bokLine[0]+bokLine[3])/2 - combo/30, 0, (bokLine[2]+bokLine[5])/2-(-k)*combo/30,   (bokLine[0]+bokLine[3])/2+combo/30, 0, (bokLine[2]+bokLine[5])/2 + (-k)*combo/30, [1,1,1]]
    const middleLine2 = [(bokLine2[0]+bokLine2[3])/2 - combo/30, 0, (bokLine2[2]+bokLine2[5])/2-(-k2)*combo/30,   (bokLine2[0]+bokLine2[3])/2+combo/30, 0, (bokLine2[2]+bokLine2[5])/2 + (-k2)*combo/30, [1,1,1]]
    
    const sizeText = combo2/4
    const digitAngleParams = [String(`${angle1}°`), "#00FFFF", sizeText, bokLine2[0]+combo2/8, 0, bokLine2[2]+combo2/12, toRadians(90), 0, 0]
    const digitAngleParams2 = [String(`2`), "#3DFF00", sizeText/2.2, bokLine[3]-combo2/8, 0, bokLine[5]-combo2/30, toRadians(90), 0, 0]

    const Aparams = [String('A'), "#FFFFFF", sizeText/2.2, bokLine[3]+combo2/22, 0, bokLine[5]-combo2/30, toRadians(90), 0, 0]
    const Bparams = [String('B'), "#FFFFFF", sizeText/2.2, bokLine[0],0,bokLine[2]+combo2/30, toRadians(90), 0, 0]
    const Cparams = [String('C'), "#FFFFFF", sizeText/2.2, bokLine2[0], 0, bokLine2[2]-combo2/30, toRadians(90), 0, 0]
    
    const digitAngleACBparams = [String(`${answer}°`), '#FFB2E1', sizeText/2.2, bokLine2[0]-combo2/10, 0, bokLine2[2]+combo2/45, toRadians(90), 0, 0]
    const angleACBparams = [baseLine[3], baseLine[5], combo2/24, toRadians(angle1), toRadians(180-angle1), 3, combo2/50, 0, "XOZ", pinkColor]

    const angleBACparams = [bokLine[3], bokLine[5], combo2/24, 0, toRadians(180-angle1), 3, combo2/50, 0, "XOZ", pink2]

    const angleParams22 = [bokLine[3], bokLine[5], combo2/16, toRadians(180), toRadians(180-angle1*0.99), 3, combo2/50, 0, "XOZ", green]
    const digitAngleParams22 = [String(`${answer}°`), "#3DFF00", sizeText/2.2, bokLine[3]-combo2/8, 0, bokLine[5]-combo2/20, toRadians(90), 0, 0]
    const arrScenarioDictsBuildParams = [
        {
            'fieldClear': [],
            'setCameraPosition': [3*(5*5)**(1/2), -Math.PI / 3],
            'triangle': triangleParams,
            'line3d': lineParams1,
            'line3d_2': lineParams2,
            'createAngle2d': angleParams1,
            'createAngle2d_2': angleParams2,
            'line3d_3':middleLine1,
            'line3d_4':middleLine2,
            'createTextPlane':digitAngleParams,
            'createTextPlane_2':digitAngleParams2,
            'createTextPlane_3':Aparams,
            'createTextPlane_4':Bparams,
            'createTextPlane_5':Cparams,
        },{
            'fieldClear': [],
            'triangle': triangleParams,
            'line3d': lineParams1,
            'line3d_2': lineParams2,
            'createAngle2d': angleParams1,
            'createAngle2d_2': angleParams2,
            'line3d_3':middleLine1,
            'line3d_4':middleLine2,
            'createTextPlane':digitAngleParams,
            'createTextPlane_2':digitAngleParams2,
            'createTextPlane_3':Aparams,
            'createTextPlane_4':Bparams,
            'createTextPlane_5':Cparams,
            'createTextPlane_6':digitAngleACBparams,
            'createAngle2d_3': angleACBparams,
        },{
            'fieldClear': [],
            'triangle': triangleParams,
            'line3d': lineParams1,
            'line3d_2': lineParams2,
            'createAngle2d': angleParams1,
            'createAngle2d_2': angleParams2,
            'line3d_3':middleLine1,
            'line3d_4':middleLine2,
            'createTextPlane':digitAngleParams,
            'createTextPlane_2':digitAngleParams2,
            'createTextPlane_3':Aparams,
            'createTextPlane_4':Bparams,
            'createTextPlane_5':Cparams,
            'createTextPlane_6':digitAngleACBparams,
            'createAngle2d_3': angleACBparams,
            'createAngle2d_4': angleBACparams,
        },{
            'fieldClear': [],
            'triangle': triangleParams,
            'line3d': lineParams1,
            'line3d_2': lineParams2,
            'createAngle2d': angleParams1,
            'line3d_3':middleLine1,
            'line3d_4':middleLine2,
            'createTextPlane':digitAngleParams,
            'createTextPlane_3':Aparams,
            'createTextPlane_4':Bparams,
            'createTextPlane_5':Cparams,
            'createTextPlane_6':digitAngleACBparams,
            'createTextPlane_7':digitAngleParams22,
            'createAngle2d_3': angleACBparams,
            'createAngle2d_4': angleBACparams,
            'createAngle2d_5': angleParams22,
        },
    ]

    return [text, arrScenarioDictsBuildParams, answer]
}