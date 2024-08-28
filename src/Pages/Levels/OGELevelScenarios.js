import { now, size } from 'lodash'
import { fixedNum, calculateSlope, hexColorToBabylonColors, toRadians, coordsIntersectionBisectorAndSide, centerSegment, partSegment, distanceSegment } from '../../components/FormShapes/formulas.js'


export function ogeLevel1(nowStage, AD=11, BC=7, S=45) {
    const MN = (AD+BC)/2
    const BH = (2*S)/(AD+BC)
    const BK = fixedNum(BH/2)  // 5 
    const answer = fixedNum((BC + MN)/2 * BK)

    const ADcolor = hexColorToBabylonColors("#35FF00")
    const BCcolor = hexColorToBabylonColors("#00FFFF")
    const S1color = hexColorToBabylonColors("#FFF7AC")
    const MNcolor = hexColorToBabylonColors("#FFC140")
    const BHcolor = hexColorToBabylonColors("#FFACD0")
    const BKcolor = hexColorToBabylonColors("#FF6776")
    const S2color = hexColorToBabylonColors("#BEFD3F")

    const text = [
        `В трапеции ABCD <span style="color: #35FF00">AD=${AD}</span>, <span style="color: #00FFFF">BC=${BC}</span>, а её площадь <span style="color: #FFF7AC">S1</span> равна <span style="color: #FFF7AC">${fixedNum(S)}</span>. Найдите <u>площадь трапеции BCNM</u>, где <span style="color: #FFC140">MN</span> - средняя линия трапеции ABCD.`,
        `Найдём среднюю линию <span style="color: #FFC140">MN</span> = (<span style="color: #35FF00">AD</span>+<span style="color: #00FFFF">BC</span>)/2 = (<span style="color: #35FF00">${AD}</span>+<span style="color: #00FFFF">${BC}</span>)/2 = <span style="color: #FFC140">${fixedNum((AD+BC)/2)}</span>.`,
        `Проведём высоту <span style="color: #FFACD0">BH</span> в трапеции ABCD.<br>По формуле площади <span style="color: #FFF7AC">S1</span> = (<span style="color: #35FF00">AD</span>+<span style="color: #00FFFF">BC</span>)/2 * <span style="color: #FFACD0">BH</span> выразим <span style="color: #FFACD0">BH</span>.<br><span style="color: #FFACD0">BH</span> = (2*<span style="color: #FFF7AC">S1</span>) / (<span style="color: #35FF00">AD</span>+<span style="color: #00FFFF">BC</span>) = (2*<span style="color: #FFF7AC">${fixedNum(S)}</span>) / (<span style="color: #35FF00">${AD}</span>+<span style="color: #00FFFF">${BC}</span>) = <span style="color: #FFACD0">${fixedNum(BH)}</span>`,
        `Пусть <span style="color: #FFACD0">BH</span> пересекает <span style="color: #FFC140">MN</span> в точке K. <span style="color: #FFC140">MN</span> || <span style="color: #35FF00">AD</span>, т.к. <span style="color: #FFC140">MN</span> средняя линия. Поэтому <span style="color: #FF6776">BK</span> ⟂ <span style="color: #FFC140">MN</span>.<br>Отрезки AM и MB равны. <span style="color: #35FF00">AD</span> || <span style="color: #FFC140">MN</span> || <span style="color: #00FFFF">BC</span>, по теореме Фаллеса получаем, что <span style="color: #FF6776">BK</span> = KH = <span style="color: #FFACD0">BH</span>/2 = <span style="color: #FFACD0">${fixedNum(BH)}</span>/2 = <span style="color: #FF6776">${BK}</span>`,
        `Теперь найдём площадь трапеции <span style="color: #BEFD3F">BCNM S2</span> = (<span style="color: #00FFFF">BC</span>+<span style="color: #FFC140">MN</span>)/2 * <span style="color: #FF6776">BK</span> = (<span style="color: #00FFFF">${fixedNum(BC)}</span>+<span style="color: #FFC140">${fixedNum(MN)}</span>)/2 * <span style="color: #FF6776">${BK}</span>} = <span style="color: #BEFD3F">${answer}</span><br><b><u>ОТВЕТ: <span style="color: #BEFD3F">${answer}</span></b></u>`
    ]
    let h = BH, a = AD, b = BC
    let shiftX = a / 2, shiftY = h / 2, c1 = a / 9

    const M = [(-shiftX+c1 - shiftX)/2, 0, (-shiftY+h - shiftY)/2]
    const B = [c1 - shiftX, 0, h - shiftY]
    const A = [-shiftX, 0, -shiftY]
    const C = [c1 + b - shiftX, 0, h - shiftY]
    const D = [a - shiftX, 0, -shiftY]
    const N = [(c1 + b - shiftX+a - shiftX)/2, 0, (h - shiftY-shiftY)/2]
    const H = [c1 - shiftX, 0, - shiftY]
    const K = [c1 - shiftX, 0, 0]

    let pTrapezoid = [
        -shiftX,0,-shiftY,
        ...D,
        ...C,
        ...B,
    ]

    let h2 = BK, a2 = MN, b2 = BC
    let shiftX2 = a2/2, shiftY2 = 0, c12 = c1 / 2
    let pSmallTrapezoid = [
        -shiftX-c12+c1,0,-shiftY2,
        a2 - shiftX-c12+c1, 0, -shiftY2,
        ...C,
        ...B,
    ]

    const sizeText = 1.3*Math.sqrt((a+b)/2*h / 45)
    
    const MNparams = [...M, ...N, MNcolor]
    const ABparams = [...A, ...B, [1,1,1]]
    const BCparams = [...B, ...C, BCcolor]
    const CDparams = [...C, ...D, [1,1,1]]
    const ADparams = [...D, ...A, ADcolor]
    const BHparams = [...B, ...H, BHcolor]
    const BKparams = [...B, ...K, BKcolor]
    const eqLine1 = [(A[0]+M[0])/2 - sizeText/6, 0, (A[2]+M[2])/2, (A[0]+M[0])/2 + sizeText/6, 0, (A[2]+M[2])/2, [1,1,1]]
    const eqLine2 = [(M[0]+B[0])/2 - sizeText/6, 0, (M[2]+B[2])/2, (M[0]+B[0])/2 + sizeText/6, 0, (M[2]+B[2])/2, [1,1,1]]


    const ADvalParams = [String(`${AD}`), "#35FF00", sizeText/1.1, (ADparams[0]+ADparams[3])/2, 0, (ADparams[2]+ADparams[5])/2-sizeText/2, toRadians(90), 0, 0]
    const BCvalParams = [String(`${BC}`), "#00FFFF", sizeText/1.1, (BCparams[0]+BCparams[3])/2+sizeText/3, 0, (BCparams[2]+BCparams[5])/2+sizeText/2, toRadians(90), 0, 0]
    const S1valParams = [String(`${fixedNum((AD+BC)/2 * BH)}`), "#FFF7AC", sizeText, (MNparams[0]+MNparams[3]) + Math.abs(MNparams[0]-MNparams[3])/4, 0, (MNparams[2]+MNparams[5])/2+BK/2, toRadians(90), 0, 0]
    const BHvalParams = [String(`${fixedNum(BH)}`), "#FFACD0", sizeText/1.1, c1 - shiftX+sizeText/2.4, 0, - shiftY+BH/4,  toRadians(90), 0, 0]
    const MNvalParams = [String(`${(AD+BC)/2}`), '#FFC140', sizeText/1.1, (MNparams[0]+MNparams[3])/2-sizeText/2, 0, - shiftY+sizeText/2.4+BH/2, toRadians(90), 0, 0]
    const BKvalParams = [String(`${fixedNum(BH)/2}`), "#FF6776", sizeText/1.1, c1 - shiftX+sizeText/2.4, 0, - shiftY+BH*(3/4),  toRadians(90), 0, 0]
    const S2valParams = [String(`${answer}`), "#BEFD3F", sizeText/1.1, (MNparams[0]+MNparams[3])/2+sizeText/2, 0, (MNparams[2]+MNparams[5])/2+BH/4.8,  toRadians(90), 0, 0]

    const Aparams = [String("A"), "#FFFFFF", sizeText/1.2, ABparams[0], ABparams[1], ABparams[2], toRadians(90), 0, 0]
    const Bparams = [String("B"), "#FFFFFF", sizeText/1.2, ABparams[3]-sizeText/7, ABparams[4], ABparams[5], toRadians(90), 0, 0]
    const Cparams = [String("C"), "#FFFFFF", sizeText/1.2, CDparams[0]+sizeText/1.9, CDparams[1], CDparams[2], toRadians(90), 0, 0]
    const Dparams = [String("D"), "#FFFFFF", sizeText/1.2, CDparams[3]+sizeText/2.4, CDparams[4], CDparams[5], toRadians(90), 0, 0]
    const Mparams = [String("M"), "#FFFFFF", sizeText/1.2, MNparams[0]-sizeText/5, MNparams[1], MNparams[2],  toRadians(90), 0, 0]
    const Nparams = [String("N"), "#FFFFFF", sizeText/1.2, MNparams[3]+sizeText/1.9, MNparams[4], MNparams[5],  toRadians(90), 0, 0]
    const Hparams = [String("H"), "#FFFFFF", sizeText/1.2, H[0], H[1], H[2]-sizeText/2.4,  toRadians(90), 0, 0]
    const Kparams = [String("K"), "#FFFFFF", sizeText/1.2, c1 - shiftX+sizeText/2.4, 0, - shiftY+sizeText/2.4+BH/2,  toRadians(90), 0, 0]

    const perpendicular1a = [c1 - shiftX-sizeText/5, 0, - shiftY, c1 - shiftX-sizeText/5, 0, - shiftY+sizeText/5, [1,1,1]]
    const perpendicular1b = [c1 - shiftX-sizeText/5, 0, - shiftY+sizeText/5, H[0], H[1], H[2]+sizeText/5, [1,1,1]]
    const perpendicular2a = [c1 - shiftX-sizeText/5, 0, - shiftY+BH/2, c1 - shiftX-sizeText/5, 0, - shiftY+BH/2+sizeText/5, [1,1,1]]
    const perpendicular2b = [c1 - shiftX-sizeText/5, 0, - shiftY+BH/2+sizeText/5,  H[0], H[1], H[2]+BH/2+sizeText/5, [1,1,1]]

    const arrScenarioDictsBuildParams = [{
        'setCameraPosition': [3*(S)**(1/2), -Math.PI / 3],
        'fieldClear': [],
        'line3d':ADparams,
        'line3d_1':ABparams,
        'line3d_2':BCparams,
        'line3d_3':CDparams,
        'line3d_4':MNparams,
        'ground':[pTrapezoid, S1color, 0.2],
        'createTextPlane': Aparams,
        'createTextPlane_2': Bparams,
        'createTextPlane_3': Cparams,
        'createTextPlane_4': Dparams,
        'createTextPlane_5': Mparams,
        'createTextPlane_6': Nparams,
        'createTextPlane_7': ADvalParams,
        'createTextPlane_8': BCvalParams,
        'createTextPlane_9': S1valParams,
    },{
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
        'createTextPlane_9': MNvalParams,
    },{
        'fieldClear': [],
        'line3d':ADparams,
        'line3d_1':ABparams,
        'line3d_2':BCparams,
        'line3d_3':CDparams,
        'line3d_4':MNparams,
        'line3d_5':BHparams,
        'line3d_6':perpendicular1a,
        'line3d_7':perpendicular1b,
        'ground':[pTrapezoid, [1,1,1], 0.2],
        'createTextPlane': Aparams,
        'createTextPlane_2': Bparams,
        'createTextPlane_3': Cparams,
        'createTextPlane_4': Dparams,
        'createTextPlane_5': Mparams,
        'createTextPlane_6': Nparams,
        'createTextPlane_7': ADvalParams,
        'createTextPlane_8': BCvalParams,
        'createTextPlane_9': MNvalParams,
        'createTextPlane_10': Hparams,
        'createTextPlane_11': BHvalParams,

    },{
        'fieldClear': [],
        'line3d':ADparams,
        'line3d_1':ABparams,
        'line3d_2':BCparams,
        'line3d_3':CDparams,
        'line3d_4':MNparams,
        'line3d_5':BHparams,
        'line3d_6':perpendicular2a,
        'line3d_7':perpendicular2b,
        'line3d_8':perpendicular1a,
        'line3d_9':perpendicular1b,
        'line3d_10':eqLine1,
        'line3d_11':eqLine2,
        'ground':[pTrapezoid, [1,1,1], 0.2],
        'createTextPlane': Aparams,
        'createTextPlane_2': Bparams,
        'createTextPlane_3': Cparams,
        'createTextPlane_4': Dparams,
        'createTextPlane_5': Mparams,
        'createTextPlane_6': Nparams,
        'createTextPlane_7': ADvalParams,
        'createTextPlane_8': BCvalParams,
        'createTextPlane_9': MNvalParams,
        'createTextPlane_10': Hparams,
        'createTextPlane_11': BHvalParams,
        'createTextPlane_12': Kparams,
        'createTextPlane_13': BKvalParams,
    },{
        'fieldClear': [],
        'line3d':ADparams,
        'line3d_1':ABparams,
        'line3d_2':BCparams,
        'line3d_3':CDparams,
        'line3d_4':MNparams,
        'line3d_5':BKparams,
        'line3d_6':perpendicular2a,
        'line3d_7':perpendicular2b,
        'ground':[pSmallTrapezoid, S2color, 0.2],
        'createTextPlane': Aparams,
        'createTextPlane_2': Bparams,
        'createTextPlane_3': Cparams,
        'createTextPlane_4': Dparams,
        'createTextPlane_5': Mparams,
        'createTextPlane_6': Nparams,
        'createTextPlane_7': ADvalParams,
        'createTextPlane_8': BCvalParams,
        'createTextPlane_9': MNvalParams,
        'createTextPlane_10': Hparams,
        'createTextPlane_11': [Kparams[0], Kparams[1], Kparams[2], Kparams[3], Kparams[4], Kparams[5] - sizeText/1.5, Kparams[6], Kparams[7], Kparams[8]],
        'createTextPlane_12': BKvalParams,
        'createTextPlane_13':S2valParams
    },  
]
    
    return [text, arrScenarioDictsBuildParams, answer] 
}

export function ogeLevel2(nowStage, BE=84) {
    const AM = BE, AN = BE / 2, NM = AN, NE = BE/4, NB = BE/4 * 3
    const AB = (AN**2+NB**2)**(1/2), AE = (AN**2+NE**2)**(1/2)
    const BC = AB*2, AC = 3*AE
    const answer = fixedNum(AB+AB*2+3*AE)


    const text = [
        `В треугольнике ABC биссектриса BE и медиана AM перпендикулярны и имеют одинаковую длину, равную 84. Найдите стороны треугольника ABC. В ответе укажите сумму сторон треугольника ABC.`,
        `Пусть N - точка пересечения отрезков BE и AM. Треугольник ABM - равнобедренный, так как его биссектриса BN является высотой.<br>Поэтому AN = NM = AM/2 = ${fixedNum(AN)}<br>BC = 2BM = 2AB`,
        `Восспользуемся свойством биссектрисы треугольника:<br>CE/AE = BC/AB<br>BC = 2AB => BC/AB = 2AB/AB = 2 => CE/AE = 2 => AC = 3AE`,
        `Проведём через вершину B прямую, папаллельную AC. Пусть L - точка пересечения этой прямой с продолжением медианы AM.<br>Тогда BK = AC = 3AE`,
        `Из подобия треугольников ANE и LNB следует, что NE/BN = AE/BK = 1/3. Поэтому NE = ${fixedNum(NE)} и NB = ${fixedNum(NB)}`,
        `Следоветльно:<br>AB = (AN^2 + BN^2)^(1/2) = (${fixedNum(AN)}^2 + ${fixedNum(NB)}^2)^(1/2) = ${fixedNum(AB)}<br>BC = 2AB = ${fixedNum(AB*2)}<br>AE = (AN^2+EN^2)^(1/2) = (${fixedNum(AN)}^2+${fixedNum(NE)}^2)^(1/2) = ${fixedNum(AE)}<br>AC = 3AE = ${fixedNum(3*AE)}<br>Найдём их сумму: AB+BC+AC = ${fixedNum(AB)}+${fixedNum(AB*2)}+${fixedNum(3*AE)} = ${answer}<br><b><u>ОТВЕТ: ${answer}</b></u>`
    ]
    const a = AB, b = BC, c = AC
    let x = (a * a + c * c - b * b) / (2 * c)
    let y = Math.sqrt(a * a - x * x)
    let shiftX = (0 + c + x) / 3, shiftY = (0 + 0 + y) / 3
    let coords = [
        [0 - shiftX, 0, 0 - shiftY, c - shiftX, 0, 0 - shiftY], // c AC
        [c - shiftX, 0, 0 - shiftY, x - shiftX, 0, y - shiftY], // b CB
        [x - shiftX, 0, y - shiftY, 0 - shiftX, 0, 0 - shiftY] // a BA
    ]
    const p = (AB + BC + AC)/2
    const S = Math.sqrt(p*(p-a)*(p-b)*(p-c))

    const A = [0 - shiftX, 0, -shiftY]
    const B = [x - shiftX, 0, y - shiftY]
    const C = [c - shiftX, 0, -shiftY]
    const M = centerSegment(B, C)
    const E = coordsIntersectionBisectorAndSide(A, B, C)  // точка пересечения биссектрисы и стороны AC
    const N = partSegment(A, M, AN/AM)
    const centerBM = centerSegment(B, M)
    const centerMC = centerSegment(M, C)

    const k_BC = calculateSlope(B[0], B[2], C[0], C[2])
    const pkbc = -k_BC

    const ABparams = [...A, ...B, [1,1,1]]
    const BCparams = [...B, ...C, [1,1,1]]
    const ACparams = [...A, ...C, [1,1,1]]
    const BNparams = [...B, ...E, [1,1,1]]
    const AMparams = [...A, ...M, [1,1,1]] 

    let sizeText = Math.sqrt(S/50) * 2


    const eqBM = [centerBM[0], 0, centerBM[2]-sizeText/10, centerBM[0], 0, centerBM[2]+sizeText/10, [1,1,1]]
    const eqMC = [centerMC[0], 0, centerMC[2]-sizeText/10, centerMC[0], 0, centerMC[2]+sizeText/10, [1,1,1]]


    const k_AM = calculateSlope(A[0], A[2], M[0], M[2])
    const perpN = partSegment(N, B, (sizeText/5)/NB)
    const perpN2 = [perpN[0]+sizeText/5, 0, (perpN[0]+sizeText/5)*k_AM+sizeText/4.5]
    const perpN3 = [perpN[0]+sizeText/3.5, 0, (perpN[0]+sizeText/3.5)*k_AM]
    const perpendicular1 = [...perpN, ...perpN2, [1,1,1]]
    const perpendicular2 = [...perpN2, ...perpN3, [1,1,1]]
    sizeText /= 2

    const test1 = [0,0,0, 5,0,5*k_AM, [1,1,1]]


    const angleA = 83.1 
    const angleB = 67.4 // градусов
    const angleBparams1 = [B[0], B[2], sizeText,toRadians(180+angleA), toRadians(angleB/2)]
    const angleBparams2 = [B[0], B[2], sizeText*0.9,toRadians(180+angleA+angleB/2), toRadians(angleB/2)]
    
    
    const Aparams = [String("A"), "#FFFFFF", sizeText, ...A, toRadians(90), 0, 0]
    const Bparams = [String("B"), "#FFFFFF", sizeText, B[0], B[1], B[2]+sizeText/5, toRadians(90), 0, 0]
    const Cparams = [String("C"), "#FFFFFF", sizeText, C[0]+sizeText/2.5, C[1], C[2], toRadians(90), 0, 0]
    const Nparams = [String("N"), "#FFFFFF", sizeText, N[0]-sizeText/2, N[1], N[2]+sizeText/4, toRadians(90), 0, 0]
    const Eparams = [String("E"), "#FFFFFF", sizeText, E[0], E[1], E[2]-sizeText/4, toRadians(90), 0, 0]
    const Mparams = [String("M"), "#FFFFFF", sizeText, M[0], M[1], M[2]+sizeText/2, toRadians(90), 0, 0]

    const arrScenarioDictsBuildParams = [{
        'setCameraPosition': [3*(S)**(1/2), -Math.PI / 3],
        'fieldClear': [],
        'line3d': ABparams,
        'line3d_2': BCparams,
        'line3d_3': ACparams,
        'line3d_4': BNparams,
        'line3d_5': AMparams,
        'line3d_6': perpendicular1,
        'line3d_7': perpendicular2,
        'line3d_8': eqBM,
        'line3d_9': eqMC,

        'createTextPlane': Aparams,
        'createTextPlane_1': Bparams,
        'createTextPlane_2': Cparams,
        'createTextPlane_3': Nparams,
        'createTextPlane_4': Eparams,
        'createTextPlane_5': Mparams,
        'createAngle2d': angleBparams1,
        'createAngle2d_1': angleBparams2,

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
    }, {
        'fieldClear': [],
    }]
    return [text, arrScenarioDictsBuildParams, answer] 
}