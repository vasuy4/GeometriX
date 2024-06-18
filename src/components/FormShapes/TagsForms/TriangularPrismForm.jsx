import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'


// Отображает форму трапеции
export default function TriangularPrismForm({handleFormSubmit, selectedShape, handleClose}) {
    const calcWithSides = (a, b) => {
        let h = (a * Math.sqrt(3)) / 2

        let Sbase = (a**2*Math.sqrt(3)) / 4  // площадь основания
        // let Sface = a * b  // площадь одной боковой грани
        let Ssurface = a * b * 3  // площадь боковой поверхности
        let Sfull = Ssurface + Sbase*2  // площадь полной поверхности

        let V = Sbase * b
        console.log(V)
        let d = Math.sqrt(a**2 + b**2)
        let P = a*6+b*3
        return [a, b, d, h, P, Sbase, Ssurface, Sfull, V]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let side_b = fixedNum(Number(document.getElementById('side_b').value))
        let diagonal = fixedNum(Number(document.getElementById('diagonal').value))
        let h = fixedNum(Number(document.getElementById('height1').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let Sbase = fixedNum(Number(document.getElementById('sbase').value))
        // let Sface = fixedNum(Number(document.getElementById('sface').value))
        let Ssurface = fixedNum(Number(document.getElementById('ssurface').value))
        let Sfull = fixedNum(Number(document.getElementById('sfull').value))
        let V = fixedNum(Number(document.getElementById('volume').value))
        const arrInput = [side_a, side_b, diagonal, h, P, Sbase, Ssurface, Sfull, V]
        const idInputs = ['side_a', 'side_b', 'diagonal', 'height1','perimeter','sbase','ssurface','sfull', 'volume']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return
        
        // if (Sfull) {
        //     if (Sbase) Ssurface = Sfull - 
        // }
        // Подсчёт остальных параметров, опираясь на:
        if (side_a && side_b) {
            let arrCheck = calcWithSides(side_a, side_b)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'a b ok', 'a b bad')
        } 
        // b и высоту
        else if (side_b && h) {
            let side_a = (2*h) / Math.sqrt(3)
            let arrCheck = calcWithSides(side_a, side_b)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'h b ok', 'h b bad')
        }
        // диагональ и ребро
        else if (diagonal && (side_a || side_b)) {
            if (side_a) side_b = Math.sqrt(diagonal**2-side_a**2)
            else if (side_b) side_a = Math.sqrt(diagonal**2-side_b**2)
            let arrCheck = calcWithSides(side_a, side_b)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'd ab ok', 'd ab bad')
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
                <label htmlFor="diagonal">d</label>
                <input type="text" id="diagonal" name="diagonal" />
            </div>

            <div className='form-group'>
                <label htmlFor="height1">h</label>
                <input type="text" id="height1" name="height1" />
            </div>

            <div className='form-group'>
                <label htmlFor="perimeter">P</label>
                <input type="text" id="perimeter" name="perimeter" />
            </div>

            <div className='form-group'>
                <label htmlFor="sbase">S основания</label>
                <input type="text" id="sbase" name="sbase" />
            </div>

            <div className='form-group'>
                <label htmlFor="ssurface">S боковой поверхности</label>
                <input type="text" id="ssurface" name="ssurface" />
            </div>

            <div className='form-group'>
                <label htmlFor="sfull">S полной поверхности</label>
                <input type="text" id="sfull" name="sfull" />
            </div>

            <div className='form-group'>
                <label htmlFor="volume">V</label>
                <input type="text" id="volume" name="volume" />
            </div>

            <button type="submit">Построить</button>
        </form>
    )
}