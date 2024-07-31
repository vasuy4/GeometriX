import { now, size } from 'lodash'
import { fixedNum, hexColorToBabylonColors, toRadians, RectangleCalculateParametersWithSides, CubeCalcWithSides, ParallelepipedCalcWithSides, ScientificNotationsIfVeryBig } from '../../components/FormShapes/formulas.js'


export function ogeLevel1(nowStage, AD=11, BC=7, S=45) {
    const MN = (AD+BC)/2
    const BH = (2*S)/(AD+BC)
    const BK = BH/2  // 5
    const answer = (BC + MN)/2 * BK
    const text = [
        `В трапеции ABCD AD=${AD}, BC=${BC}, а её площадь S равна ${S}. Найдите площадь трапеции BCNM, где MN - средняя линия трапеции ABCD.`,
        `Найдём среднюю линию MN = (AD+BC)/2=${(AD+BC)/2}.`        
    ]
    const h = BH, a = AD, b = BC
    const shiftX = a / 2, shiftY = h / 2, c1 = a / 9
    let pTrapezoid = [
        -shiftX,0,-shiftY,
        a - shiftX, 0, -shiftY,
        c1 + b - shiftX, 0, h - shiftY,
        c1 - shiftX, 0, h - shiftY,
    ]
    const MNparams = [(-shiftX+c1 - shiftX)/2, 0, (-shiftY+h - shiftY)/2,  (c1 + b - shiftX+a - shiftX)/2, 0, (h - shiftY-shiftY)/2, [1,1,1]]
    const ABparams = [-shiftX, 0, -shiftY, c1 - shiftX, 0, h - shiftY, [1,1,1]]
    const BCparams = [c1 - shiftX, 0, h - shiftY, c1 + b - shiftX, 0, h - shiftY, [1,1,1]]
    const CDparams = [c1 + b - shiftX, 0, h - shiftY, a - shiftX, 0, -shiftY, [1,1,1]]
    const ADparams = [a - shiftX, 0, -shiftY, -shiftX, 0, -shiftY, [1,1,1]]
    
    const sizeText = 1.5*Math.sqrt((a+b)/2*h / 45)
    const ADvalParams = [String(`${AD}`), "#FFFFFF", sizeText, (ADparams[0]+ADparams[3])/2, 0, (ADparams[2]+ADparams[5])/2-sizeText/2, toRadians(90), 0, 0]
    const BCvalParams = [String(`${BC}`), "#FFFFFF", sizeText, (BCparams[0]+BCparams[3])/2+sizeText/3, 0, (BCparams[2]+BCparams[5])/2+sizeText/2, toRadians(90), 0, 0]
    
    const Aparams = [String("A"), "#FFFFFF", sizeText, ABparams[0], ABparams[1], ABparams[2], toRadians(90), 0, 0]
    const Bparams = [String("B"), "#FFFFFF", sizeText, ABparams[3]-sizeText/7, ABparams[4], ABparams[5], toRadians(90), 0, 0]
    const Cparams = [String("C"), "#FFFFFF", sizeText, CDparams[0]+sizeText/1.9, CDparams[1], CDparams[2], toRadians(90), 0, 0]
    const Dparams = [String("D"), "#FFFFFF", sizeText, CDparams[3]+sizeText/2.4, CDparams[4], CDparams[5], toRadians(90), 0, 0]
    const Mparams = [String("M"), "#FFFFFF", sizeText, MNparams[0]-sizeText/5, MNparams[1], MNparams[2],  toRadians(90), 0, 0]
    const Nparams = [String("N"), "#FFFFFF", sizeText, MNparams[3]+sizeText/1.9, MNparams[4], MNparams[5],  toRadians(90), 0, 0]
    const arrScenarioDictsBuildParams = [{
        'setCameraPosition': [3*(S)**(1/2), -Math.PI / 3],
        'fieldClear': [],
        'line3d':ADparams,
        'line3d_1':ABparams,
        'line3d_2':BCparams,
        'line3d_3':CDparams,
        'line3d_4':MNparams,
        'ground':[pTrapezoid, [1,1,1], 0.2],
        'createTextPlane': Aparams,
        'createTextPlane_2': Bparams,
        'createTextPlane_3': Cparams,
        'createTextPlane_4': Dparams,
        'createTextPlane_5': Mparams,
        'createTextPlane_6': Nparams,
        'createTextPlane_7': ADvalParams,
        'createTextPlane_8': BCvalParams,

    }]

    return [text, arrScenarioDictsBuildParams, answer] 
}

export function ogeLevel2(nowStage) {
    
}