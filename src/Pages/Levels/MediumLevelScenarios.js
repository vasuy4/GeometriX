import { fixedNum } from "../../components/FormShapes/formulas";


export function mediumLevel1(nowStage, BK=15, KC=9) {
    const answer = 4*BK+2*KC
    const text = [
        `Биссектриса угла A, параллелограмма ABCD пересекает сторону BC в точке K. Найдите периметр этого параллелограмма, если BK=${fixedNum(BK)}, KC=${fixedNum(KC)}`
    ]

    const arrScenarioDictsBuildParams = [{
        'fieldClear': [],
    }]

    return [text, arrScenarioDictsBuildParams, answer] 
}