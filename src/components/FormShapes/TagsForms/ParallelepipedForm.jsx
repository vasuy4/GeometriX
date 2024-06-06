import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'


// Отображает форму трапеции
export default function ParallelepipedForm({handleFormSubmit, selectedShape, handleClose}) {
    const calcWithSides = (a, b, c) => {
        let d1 = Math.sqrt(a**2 + c**2)
        let d2 = Math.sqrt(a**2 + b**2)
        let d3 = Math.sqrt(b**2 + c**2)
        let d4 = Math.sqrt(d3**2 + a**2)
        let S1 = a*c
        let S2 = a*b
        let S3 = b*c
        let S = (S1+S2+S3)*2
        let P = (a+b+c)*4
        let V = a*b*c 
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
        const idInputs = ['side_a', 'side_b', 'side_c', 'diagonal1', 'diagonal2','diagonal3', 'diagonal4', 's1', 's2', 's3','S', 'perimeter', 'volume']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return
        
        // Подсчёт остальных параметров, опираясь на:
        // Три стороны
        if (side_a && side_b && side_c){
            let arrCheck = calcWithSides(side_a, side_b, side_c)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'sides ok', 'sides bad')
        }
        // Зная стороны a, c и одну диагональ
        else if (side_a && side_c && (diagonal2 || diagonal3 || diagonal4)) {
            if (diagonal2) side_b = Math.sqrt(diagonal2**2 - side_a**2)
            if (diagonal4) diagonal3 = Math.sqrt(diagonal4**2 - side_a**2)
            if (diagonal3) side_b = Math.sqrt(diagonal3**2 - side_c**2)

            let arrCheck = calcWithSides(side_a, side_b, side_c)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, '2sides and d ok', '2sides and d bad')
        } 
        // Зная стороны a, b и одну диагональ
        else if (side_a && side_b && (diagonal1 || diagonal3 || diagonal4)) {
            if (diagonal1) side_c = Math.sqrt(diagonal1**2 - side_a**2)
            if (diagonal4) diagonal3 = Math.sqrt(diagonal4**2 - side_a**2)
            if (diagonal3) side_c = Math.sqrt(diagonal3**2 - side_b**2)
            
            let arrCheck = calcWithSides(side_a, side_b, side_c)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, '2sides and d ok', '2sides and d bad')
        }
        // Зная стороны b, c и одну диагональ
        else if (side_b && side_c && (diagonal1 || diagonal2 || diagonal4)) {
            if (diagonal1) side_a = Math.sqrt(diagonal1**2 - side_c**2)
            if (diagonal4) diagonal2 = Math.sqrt(diagonal4**2 - side_c**2)
            if (diagonal2) side_a = Math.sqrt(diagonal2**2 - side_b**2)
            
            let arrCheck = calcWithSides(side_a, side_b, side_c)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, '2sides and d ok', '2sides and d bad')
        }
    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
        <button onClick={handleClose}>Close</button>
        <p>{selectedShape}</p>
        <div className='form-group'>
                <label htmlFor="side_a">a</label>
                <input type="text" id="side_a" name="side_a" />
            </div>

            <div className='form-group'>
                <label htmlFor="side_b">b</label>
                <input type="text" id="side_b" name="side_b" />
            </div>

            <div className='form-group'>
                <label htmlFor="side_c">c</label>
                <input type="text" id="side_c" name="side_c" />
            </div>

            <div className='form-group'>
                <label htmlFor="diagonal1">d1</label>
                <input type="text" id="diagonal1" name="diagonal1" />
            </div>

            <div className='form-group'>
                <label htmlFor="diagonal2">d2</label>
                <input type="text" id="diagonal2" name="diagonal2" />
            </div>

            <div className='form-group'>
                <label htmlFor="diagonal3">d3</label>
                <input type="text" id="diagonal3" name="diagonal3" />
            </div>

            <div className='form-group'>
                <label htmlFor="diagonal4">d4</label>
                <input type="text" id="diagonal4" name="diagonal4" />
            </div>

            <div className='form-group'>
                <label htmlFor="s1">S1</label>
                <input type="text" id="s1" name="s1" />
            </div>

            <div className='form-group'>
                <label htmlFor="s2">S2</label>
                <input type="text" id="s2" name="s2" />
            </div>

            <div className='form-group'>
                <label htmlFor="s3">S3</label>
                <input type="text" id="s3" name="s3" />
            </div>

            <div className='form-group'>
                <label htmlFor="S">Sпп</label>
                <input type="text" id="S" name="S" />
            </div>

            <div className='form-group'>
                <label htmlFor="perimeter">P</label>
                <input type="text" id="perimeter" name="perimeter" />
            </div>

            <div className='form-group'>
                <label htmlFor="volume">V</label>
                <input type="text" id="volume" name="volume" />
            </div>
            <button type="submit">Построить</button>
        </form>
    )
}