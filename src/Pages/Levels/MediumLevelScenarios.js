import { size } from "lodash";
import { fixedNum, ScientificNotationsIfVeryBig, hexColorToBabylonColors, toRadians, middlePointLine } from "../../components/FormShapes/formulas";


export function mediumLevel1(nowStage, BK=15, KC=9) {
    const answer = fixedNum(4*BK+2*KC)
    const text = [
        `Биссектриса угла A, параллелограмма ABCD пересекает сторону BC в точке K. Найдите <u>периметр</u> этого параллелограмма, если <span style="color: #71FA00">BK=${fixedNum(BK)}</span>,  <span style="color: #FFB2E1">KC=${fixedNum(KC)}</span>`,
        `Биссектриса параллелограмма отсекает от него равнобедренный треугольник. Следовательно треугольник ABK равнобедренный при основании AK.`,
        `Следовательно <span style="color: #C3FF51">AB</span> = <span style="color: #71FA00">BK</span> = <span style="color: #C3FF51">${fixedNum(BK)}</span>, теперь можно найти периметр: P=(<span style="color: #71FA00">BK</span>+<span style="color: #FFB2E1">KC</span>)*2+<span style="color: #C3FF51">AB</span>*2 =
        (<span style="color: #71FA00">${fixedNum(BK)}</span>+<span style="color: #FFB2E1">${fixedNum(KC)}</span>)*2+<span style="color: #C3FF51">${fixedNum(BK)}</span>*2=<b>${answer}</b>  <br><u><b>ОТВЕТ: ${answer}</b></u>`
    ]

    let limeColor = hexColorToBabylonColors('#71FA00')  // lime BK
    let pinkColor = hexColorToBabylonColors('#FFB2E1')  // blue KC
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