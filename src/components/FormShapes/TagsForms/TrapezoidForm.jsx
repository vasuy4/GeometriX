import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'

import trapezoid from '../formShapesImg/trapezoid.svg'
import rectangleAlfaBeta from '..//formShapesImg/rectangleAlfaBeta.svg'
import trapezoidK from '..//formShapesImg/trapezoidK.svg'
// Отображает форму трапеции
export default function TrapezoidForm({ handleFormSubmit, selectedShape, handleClose }) {
    const calcWithSides = (a, b, c, d) => {

        // calc sides
        let m = (a + b) / 2.0  // true
        let P = a + b + c + d  // true
        let p = P / 2.0  // true
        let d1 = Math.sqrt(d ** 2 + a * b - (a * (d ** 2 - c ** 2)) / (a - b))  // true
        let d2 = Math.sqrt(c ** 2 + d ** 2 + 2 * a * b - d1 ** 2)  // true
        let S = (a + b) / 2.0 * Math.sqrt(c ** 2 - (((a - b) ** 2 + c ** 2 - d ** 2) / (2 * (a - b))) ** 2)  // true
        let h = S / m  // true

        // calc angles
        let alpha = toDegrees(Math.asin(h/c))
        let betta = 180-alpha
        let angle_o = toDegrees(Math.asin(h/d))
        let angle_y = 180-angle_o
        let angle_e = toDegrees(Math.asin(h/((d1*d2)/(a+b))))
        let angle_z = 180-angle_e
        return [a, b, c, d, d1, d2, h, m, S, P, alpha, betta, angle_y, angle_o, angle_e, angle_z]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {

        event.preventDefault();
        // a - нижнее основание, b - верхнее
        // c - левая сторона d - правая сторона
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let side_b = fixedNum(Number(document.getElementById('side_b').value))
        let side_c = fixedNum(Number(document.getElementById('side_c').value))
        let side_d = fixedNum(Number(document.getElementById('side_d').value))
        let alpha = fixedNum(Number(document.getElementById('alpha').value))
        let betta = fixedNum(Number(document.getElementById('betta').value))
        let angle_y = fixedNum(Number(document.getElementById('angle_y').value))
        let angle_o = fixedNum(Number(document.getElementById('angle_o').value))
        let angle_e = fixedNum(Number(document.getElementById('angle_y').value))
        let angle_z = fixedNum(Number(document.getElementById('angle_o').value))
        let h = fixedNum(Number(document.getElementById('height1').value))
        let m = fixedNum(Number(document.getElementById('m').value))
        let S = fixedNum(Number(document.getElementById('s').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let diagonal1 = fixedNum(Number(document.getElementById('diagonal1').value))
        let diagonal2 = fixedNum(Number(document.getElementById('diagonal2').value))

        const arrInput = [side_a, side_b, side_c, side_d, diagonal1, diagonal2, h, m, S, P, alpha, betta, angle_y, angle_o, angle_e, angle_z]
        const idInputs = ['side_a', 'side_b', 'side_c', 'side_d', 'alpha', 'betta', 'angle_y', 'angle_o', 'angle_e', 'angle_z', 'height1', 'm', 's', 'perimeter', 'diagonal1', 'diagonal2']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        // Подсчёт остальных параметров, опираясь на:
        // 4 стороны
        if (side_a && side_b && side_c && side_d) {
            let arrCheck = calcWithSides(side_a, side_b, side_c, side_d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'sides ok', 'sides bad')
        }
    }


    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
           <img src={trapezoid} alt='parallelogram' />

           <p className='subtitle mt0'>Стороны трапеции</p>

           <div className="row">
                <div className='form-group'>
                    <label htmlFor="side_a" className='label_inner_text'>
                        a =
                        <input className='labela w70' type="text" id="side_a" name="side_a"/>
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="side_b" className='label_inner_text'>
                        b =
                        <input className='labela w70' type="text" id="side_b" name="side_b"/>
                    </label>
                </div>
            </div>
           
            <div className="row">
                <div className='form-group'>
                    <label htmlFor="side_c" className='label_inner_text'>
                        c =
                        <input className='labela w70' type="text" id="side_c" name="side_c"/>
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="side_d" className='label_inner_text'>
                        d =
                        <input className='labela w70' type="text" id="side_d" name="side_d"/>
                    </label>
                </div>
            </div>
            <p className='subtitle mt0'>Углы трапеции</p>


            <div className="row">
                <div className='form-group'>
                    <label htmlFor="alpha" className='label_inner_text bgc0 colfff borderfff'>
                    α=
                        <input className='w70 bgc0 colfff' type="text" id="alpha" name="alpha"/>
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="betta" className='label_inner_text bgc0 colfff borderfff'>
                    β=
                        <input className='w70 bgc0 colfff' type="text" id="betta" name="betta"/>
                    </label>
                </div>
            </div>
  

            <div className="row">
                <div className='form-group'>
                    <label htmlFor="angle_y" className='label_inner_text bgc0 colfff borderfff'>
                    c=
                        <input className='w70 bgc0 colfff' type="text" id="angle_y" name="angle_y"/>
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="angle_o" className='label_inner_text bgc0 colfff borderfff'>
                    d=
                        <input className='w70 bgc0 colfff' type="text" id="angle_o" name="angle_o"/>
                    </label>
                </div>
            </div>
            <div className="row">
                 <div className='form-group'>
                 <img className='input-size bgc0 colfff' src={rectangleAlfaBeta} alt='rectangleAlfaBeta' />
                </div>
                <div className='form-group'>
                    <label htmlFor="angle_e" className='label_inner_text bgc0 colfff borderfff'>
                    l=
                        <input className='w160 bgc0 colfff' type="text" id="angle_e" name="angle_e"/>
                    </label>
                </div>
            </div>


            <div className="row">
                 <div className='form-group'>
                 <img className='input-size bgc0 colfff' src={trapezoidK} alt='rectangleAlfaBeta' />
                </div>
                <div className='form-group'>
                    <label htmlFor="angle_z" className='label_inner_text bgc0 colfff borderfff'>
                    k=
                        <input className='w160 bgc0 colfff' type="text" id="angle_z" name="angle_z"/>
                    </label>
                </div>
            </div>



            <div className='form-group row'>
                        <label htmlFor="height1">h =</label>
                        <input  type="text" id="height1" name="height1" className='w220'/>
            </div>
            <div className='form-group row'>
                        <label htmlFor="m">m =</label>
                        <input type="text" id="m" name="m" className='w220'/>
            </div>
         
            <div className='form-group row'>
                        <label htmlFor="s">S =</label>
                        <input  type="text" id="s" name="s" className='w220'/>
            </div>
            <div className='form-group row'>
                        <label htmlFor="perimeter">P =</label>
                        <input type="text" id="perimeter" name="perimeter" className='w220'/>
            </div>

            <div className="row">
                <div className='form-group'>
                    <label htmlFor="diagonal1" className='label_inner_text'>
                        d1 =
                        <input className='labela w70' type="text" id="diagonal1" name="diagonal1"/>
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="diagonal2" className='label_inner_text'>
                        d2 =
                        <input className='labela w70' type="text" id="diagonal2" name="diagonal2"/>
                    </label>
                </div>

            </div>
            
            <div className="row">
                <button type="submit" className= "sFormText">Построить</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>


        </form>
    )



  
}