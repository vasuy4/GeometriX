import { size } from "lodash";
import { fixedNum, ScientificNotationsIfVeryBig, hexColorToBabylonColors, toRadians } from "../../components/FormShapes/formulas";


export function mediumLevel1(nowStage, BK=15, KC=9) {
    const answer = 4*BK+2*KC
    const text = [
        `Биссектриса угла A, параллелограмма ABCD пересекает сторону BC в точке K. Найдите <u>периметр</u> этого параллелограмма, если <span style="color: #71FA00">BK=${fixedNum(BK)}</span>,  <span style="color: #FFB2E1">KC=${fixedNum(KC)}</span>`,
        `Биссектриса параллелограмма отсекает от него равнобедренный треугольник. Следовательно треугольник ABK равнобедренный при основании AK.`,
    ]

    let limeColor = hexColorToBabylonColors('#71FA00')  // lime BK
    let pinkColor = hexColorToBabylonColors('#FFB2E1')  // blue KC

    let a = BK
    let h2= KC*1.3
    let b= BK+KC
    let c = Math.sqrt(a ** 2 - h2 ** 2)
    const katet = Math.sqrt(a ** 2 - h2 ** 2)
    const shiftX = (b + katet) / 2, shiftY = h2 / 2
    let parallelogramCoords = [
        [-shiftX, 0, -shiftY, c - shiftX, 0, h2 - shiftY, [1,1,1]],
        [c - shiftX, 0, h2 - shiftY, b + c - shiftX, 0, h2 - shiftY, [1,1,1]],
        [b + c - shiftX, 0, h2 - shiftY, b - shiftX, 0, 0 - shiftY, [1,1,1]],
        [b - shiftX, 0, 0 - shiftY, 0 - shiftX+KC, 0, 0 - shiftY, limeColor],
        [0 - shiftX+KC, 0, 0 - shiftY, 0 - shiftX, 0, 0 - shiftY, pinkColor],
        [b + c - shiftX, 0, h2 - shiftY, - shiftX+KC, 0, 0 - shiftY, [1,1,1]],
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
    }]

    for (let stage=0; stage<arrScenarioDictsBuildParams.length; stage++){
        for (let i=0; i<parallelogramCoords.length; i++) {
            arrScenarioDictsBuildParams[stage][`line3d_${i}`] = parallelogramCoords[i]
        }
    }
    return [text, arrScenarioDictsBuildParams, answer] 
}