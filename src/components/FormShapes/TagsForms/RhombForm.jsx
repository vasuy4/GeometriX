import { fixedNum, toDegrees, toRadians, checkCalculate } from '../formulas.js'
import rhombImage from '../formShapesImg/rhomb.png'

export default function RhombForm({handleFormSubmit, selectedShape, handleClose}) {
    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault()
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let diagonal1 = fixedNum(Number(document.getElementById('diagonal1').value))
        let diagonal2 = fixedNum(Number(document.getElementById('diagonal2').value))
        let h1 = fixedNum(Number(document.getElementById('height1').value))
        let h2 = fixedNum(Number(document.getElementById('height2').value))
        let S = fixedNum(Number(document.getElementById('s').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let alpha = fixedNum(Number(document.getElementById('alpha').value))
        let betta = fixedNum(Number(document.getElementById('betta').value))
        let r = fixedNum(Number(document.getElementById('r').value))
        let arrInput = [side_a, diagonal1, diagonal2, h1, h2, S, P, alpha, betta, r]
        const idInputs = ['side_a', 'diagonal1', 'diagonal2', 'height1', 'height2','s', 'perimeter', 'alpha', 'betta', 'r']
        // Проверка на то, что какое то число введено меньше/равно нулю
        if ((!side_a || side_a <= 0) && (!diagonal1 || diagonal1 <= 0) && (!diagonal2 || diagonal2 <= 0) && (!h1 || h1 <= 0) && (!h2 || h2 <= 0) && (!S || S <= 0) && (!P || P <= 0) && (!alpha || alpha <= 0) && (!betta || betta <= 0) && (!r || r <= 0)) {
            console.log('error under zero')
            return
        }
        
        // Подсчёт остальных параметров, опираясь на:
    }
    
    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
        <button onClick={handleClose}>Close</button>
        <p>{selectedShape}</p>
        <img src={rhombImage} alt='parallelogram' />
        <div className='form-group'>
                <label htmlFor="side_a">Сторона a</label>
                <input type="text" id="side_a" name="side_a" />
            </div>
            
            <div className='form-group'>
                <label htmlFor="diagonal1">Диагональ d1</label>
                <input type="text" id="diagonal1" name="diagonal1" />
            </div>

            <div className='form-group'>
                <label htmlFor="diagonal2">Диагональ d2</label>
                <input type="text" id="diagonal2" name="diagonal2" />
            </div>

            <div className='form-group'>
                <label htmlFor="height1">Высота h1</label>
                <input type="text" id="height1" name="height1" />
            </div>

            <div className='form-group'>
                <label htmlFor="height2">Высота h2</label>
                <input type="text" id="height2" name="height2" />
            </div>

            <div className='form-group'>
                <label htmlFor="s">Площадь S</label>
                <input type="text" id="s" name="s" />
            </div>

            <div className='form-group'>
                <label htmlFor="perimeter">Периметр P</label>
                <input type="text" id="perimeter" name="perimeter" />
            </div>


            <div className='form-group'>
                <label htmlFor="alpha">Угол α</label>
                <input type="text" id="alpha" name="alpha" />
            </div>

            <div className='form-group'>
                <label htmlFor="betta">Угол β</label>
                <input type="text" id="betta" name="betta" />
            </div>

            <div className='form-group'>
                <label htmlFor="r">Радиус вписангной окружности r</label>
                <input type="text" id="r" name="r" />
            </div>


            <div className='form-group'>
                <label htmlFor="points">Точка размещения</label>
                <select name="points" id="points" defaultValue="O">
                    <option value="O">O</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </div>

            <div className='form-group'>
                <label htmlFor="x">x</label>
                <input type="text" id="x" name="x" defaultValue="0"/>
            </div>
            <div className='form-group'>
                <label htmlFor="y">y</label>
                <input type="text" id="y" name="y" defaultValue="0"/>
            </div>
            <button type="submit">Построить</button>
        </form>
    )
}