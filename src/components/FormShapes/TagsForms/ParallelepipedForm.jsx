import { fixedNum, checkCalculate, checkBelowZero } from '../formulas.js'
import parallelepiped from '../formShapesImg/parallelepiped.svg'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'

// Отображает форму трапеции
export default function ParallelepipedForm({ handleFormSubmit, selectedShape, handleClose, updateFigure, handleOptionsClick }) {
    const translateShape = dictTranslate[selectedShape];

    const calcWithSides = (a, b, c) => {
        let d1 = Math.sqrt(a ** 2 + c ** 2)
        let d2 = Math.sqrt(a ** 2 + b ** 2)
        let d3 = Math.sqrt(b ** 2 + c ** 2)
        let d4 = Math.sqrt(d3 ** 2 + a ** 2)
        let S1 = a * c
        let S2 = a * b
        let S3 = b * c
        let S = (S1 + S2 + S3) * 2
        let P = (a + b + c) * 4
        let V = a * b * c
        return [a, b, c, d1, d2, d3, d4, S1, S2, S3, S, P, V]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let side_b = fixedNum(Number(document.getElementById('side_b').value))
        let side_c = fixedNum(Number(document.getElementById('side_c').value))
        let diagonal1 = fixedNum(Number(document.getElementById('diagonal1').value))
        let diagonal2 = fixedNum(Number(document.getElementById('diagonal2').value))
        let diagonal3 = fixedNum(Number(document.getElementById('diagonal3').value))
        let diagonal4 = fixedNum(Number(document.getElementById('diagonal4').value))
        let S1 = fixedNum(Number(document.getElementById('s1').value))
        let S2 = fixedNum(Number(document.getElementById('s2').value))
        let S3 = fixedNum(Number(document.getElementById('s3').value))
        let S = fixedNum(Number(document.getElementById('S').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let V = fixedNum(Number(document.getElementById('volume').value))
        const arrInput = [side_a, side_b, side_c, diagonal1, diagonal2, diagonal3, diagonal4, S1, S2, S3, S, P, V]
        const idInputs = ['side_a', 'side_b', 'side_c', 'volume', 'perimeter', 's1', 's2', 's3', 'S', 'diagonal1', 'diagonal2', 'diagonal3', 'diagonal4']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        // Подсчёт остальных параметров, опираясь на:
        // Три стороны
        if (side_a && side_b && side_c) {
            let arrCheck = calcWithSides(side_a, side_b, side_c)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'sides ok', 'sides bad')
        }
        // Зная стороны a, c и одну диагональ
        else if (side_a && side_c && (diagonal2 || diagonal3 || diagonal4)) {
            if (diagonal2) side_b = Math.sqrt(diagonal2 ** 2 - side_a ** 2)
            if (diagonal4) diagonal3 = Math.sqrt(diagonal4 ** 2 - side_a ** 2)
            if (diagonal3) side_b = Math.sqrt(diagonal3 ** 2 - side_c ** 2)

            let arrCheck = calcWithSides(side_a, side_b, side_c)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, '2sides and d ok', '2sides and d bad')
        }
        // Зная стороны a, b и одну диагональ
        else if (side_a && side_b && (diagonal1 || diagonal3 || diagonal4)) {
            if (diagonal1) side_c = Math.sqrt(diagonal1 ** 2 - side_a ** 2)
            if (diagonal4) diagonal3 = Math.sqrt(diagonal4 ** 2 - side_a ** 2)
            if (diagonal3) side_c = Math.sqrt(diagonal3 ** 2 - side_b ** 2)

            let arrCheck = calcWithSides(side_a, side_b, side_c)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, '2sides and d ok', '2sides and d bad')
        }
        // Зная стороны b, c и одну диагональ
        else if (side_b && side_c && (diagonal1 || diagonal2 || diagonal4)) {
            if (diagonal1) side_a = Math.sqrt(diagonal1 ** 2 - side_c ** 2)
            if (diagonal4) diagonal2 = Math.sqrt(diagonal4 ** 2 - side_c ** 2)
            if (diagonal2) side_a = Math.sqrt(diagonal2 ** 2 - side_b ** 2)

            let arrCheck = calcWithSides(side_a, side_b, side_c)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, '2sides and d ok', '2sides and d bad')
        }
    }


    return (
        <div className="form-container">
            <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
                <p>{translateShape[0].toUpperCase() + translateShape.slice(1, translateShape.length)}</p>

                <img className="parallelepiped" src={parallelepiped} alt='parallelepiped' />

                <p className='subtitle mt0'>Ребра параллелепипеда</p>


                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="side_a" className='label_inner_text'>
                            a=
                            <input className='w50' type="text" id="side_a" name="side_a" />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="side_b" className='label_inner_text'>
                            b=
                            <input className='w50' type="text" id="side_b" name="side_b" />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="side_c" className='label_inner_text'>
                            c=
                            <input className='w50' type="text" id="side_c" name="side_c" />
                        </label>
                    </div>
                </div>
                {/* <p className='subtitle mt0'>Угол параллелепипеда</p>

    <div className="row">
                <div className='form-group'>
                    <label htmlFor="alpha" className='label_inner_text bgc0 colfff borderfff'>
                    a=
                        <input className='w230 bgc0 colfff' type="text" id="alpha" name="alpha"/>
                    </label>
                </div>
            </div> */}


                <div className='form-group row'>
                    <label htmlFor="volume">V=</label>
                    <input type="text" id="volume" name="volume" className='w220' />
                </div>
                <div className='form-group row'>
                    <label htmlFor="perimeter">P=</label>
                    <input type="text" id="perimeter" name="perimeter" className='w220' />
                </div>

                <div className='form-group row'>
                    <label htmlFor="s1">Sac=</label>
                    <input type="text" id="s1" name="s1" className='w220' />
                </div>
                <div className='form-group row'>
                    <label htmlFor="s2">Sab=</label>
                    <input type="text" id="s2" name="s2" className='w220' />
                </div>

                <div className='form-group row'>
                    <label htmlFor="s3">Sbc=</label>
                    <input type="text" id="s3" name="s3" className='w220' />
                </div>

                <div className='form-group row'>
                    <label htmlFor="S   ">Sпп=</label>
                    <input type="text" id="S" name="S" className='w220' />
                </div>


                <div className="row">

                    <div className="vert_flex">
                        <div className='form-group'>
                            <label htmlFor="diagonal1">d1=</label>
                            <input type="text" id="diagonal1" name="diagonal1" className='w70' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="diagonal2">d2=</label>
                            <input type="text" id="diagonal2" name="diagonal2" className='w70' />
                        </div>
                    </div>

                    <div className="vert_flex">
                        <div className='form-group'>
                            <label htmlFor="diagonal3">d3=</label>
                            <input type="text" id="diagonal3" name="diagonal3" className='w70' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="diagonal4">d4=</label>
                            <input type="text" id="diagonal4" name="diagonal4" className='w70' />
                        </div>
                    </div>

                </div>

                <div className="row">
                    {!updateFigure && <button type="submit" className="sFormText">Построить</button>}
                    <button onClick={handleClose} className="sFormText">Закрыть</button>
                </div>
            </form>
        </div>
    )

}