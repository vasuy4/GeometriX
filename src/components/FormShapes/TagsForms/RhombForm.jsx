import { fixedNum, toDegrees, toRadians, checkCalculate } from '../formulas.js'
import rhombImage from '../formShapesImg/rhomb.svg'

export default function RhombForm({handleFormSubmit, selectedShape, handleClose}) {
    // Подсчёт параметров при известных стороне и высоте
    const calcParamsSideHeight = (a, h) => {
        let P = 4 * a
        let S = a * h
        let alpha = Math.asin(h/a)
        let betta = toRadians(180-toDegrees(alpha))
        let d1 = a*Math.sqrt(2 + 2*Math.cos(alpha))
        let d2 = a*Math.sqrt(2 + 2*Math.cos(betta))
        let r = h / 2
        return [a, d1, d2, h, S, P, toDegrees(alpha), toDegrees(betta), r]
    }   
    
    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault()
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let alpha = fixedNum(Number(document.getElementById('alpha').value))
        let betta = fixedNum(Number(document.getElementById('betta').value))
        let S = fixedNum(Number(document.getElementById('s').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let diagonal1 = fixedNum(Number(document.getElementById('diagonal1').value))
        let diagonal2 = fixedNum(Number(document.getElementById('diagonal2').value))
        let h1 = fixedNum(Number(document.getElementById('height1').value))
        let r = fixedNum(Number(document.getElementById('r').value))
        let arrInput = [side_a, diagonal1, diagonal2, h1, S, P, alpha, betta, r]
        const idInputs = ['side_a', 'alpha', 'betta', 's','perimeter', 'diagonal1', 'diagonal2', 'height1', 'r']
        // Проверка на то, что какое то число введено меньше/равно нулю
        if ((!side_a || side_a <= 0) && (!diagonal1 || diagonal1 <= 0) && (!diagonal2 || diagonal2 <= 0) && (!h1 || h1 <= 0) && (!S || S <= 0) && (!P || P <= 0) && (!alpha || alpha <= 0) && (!betta || betta <= 0) && (!r || r <= 0)) {
            console.log('error under zero')
            return
        }
        
        // Подсчёт остальных параметров, опираясь на:
        // Сторону и высоту
        if (side_a && h1) {
            if (h1 > side_a) {
                console.log('error h1 > side_a')
                return
            }
            let arrCheck = calcParamsSideHeight(side_a, h1)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'a h ok', 'a h bad')
        }
        // Площадь и угол
        else if (S && (alpha || betta)){
            if (alpha > 179 || betta > 179) {
                console.log('alpha > 179 || betta > 179')
                return
            }
            if (betta) alpha = 180 - betta
            betta = 180 - alpha

            side_a = Math.sqrt(S) / Math.sqrt(Math.sin(toRadians(alpha)))
            h1 = S / side_a
            let arrCheck = calcParamsSideHeight(side_a, h1)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'S alpha/betta ok', 'S alpha/betta bad')
        }
        // Площадь и диагональ
        else if (S && (diagonal1 || diagonal2)){
            if (diagonal2) diagonal1 = (2*S)/diagonal2
            diagonal2 = (2*S)/diagonal1

            side_a = Math.sqrt(diagonal1**2+diagonal2**2)/2.0
            h1 = S / side_a
            let arrCheck = calcParamsSideHeight(side_a, h1)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'S d ok', 'S d bad')
        }
        // Сторону и угол
        else if (side_a && (alpha || betta)){
            if (alpha > 179 || betta > 179) {
                console.log('alpha > 179 || betta > 179')
                return
            }
            if (betta) alpha = 180 - betta
            betta = 180 - alpha

            S = side_a*side_a*Math.sin(toRadians(alpha))
            h1 = S / side_a
            let arrCheck = calcParamsSideHeight(side_a, h1)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs,'side_a alpha/betta ok','side_a alpha/betta bad')
        }
        // Диагонали
        else if (diagonal1 && diagonal2) {
            side_a = Math.sqrt(diagonal1**2+diagonal2**2)/2
            S = 1/2 * diagonal1*diagonal2
            h1 = S / side_a
            // опять хз, диагонали меняются местами, поэтому снова свап
            let arrCheck = calcParamsSideHeight(side_a, h1)
            let d2 = arrCheck[1]
            let d1 = arrCheck[2]
            arrCheck[1] = d1
            arrCheck[2] = d2
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'd d ok', 'd d bad')
        }
        // Площадь и сторону
        else if (S && side_a) {
            h1 = S / side_a
            if (side_a <= h1){
                console.log('error side_a <= h1')
                return
            }
            let arrCheck = calcParamsSideHeight(side_a, h1)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs,'side_a S ok','side_a S bad')
        }
        // Диагональ и сторону
        else if (side_a && (diagonal1 || diagonal2)) {
            if (diagonal2) diagonal1 = Math.sqrt(4*side_a**2-diagonal2**2)
            else if (diagonal1) diagonal2 = Math.sqrt(4*side_a**2-diagonal1**2)
            S = 1/2 * diagonal1*diagonal2
            h1 = S / side_a
            let arrCheck = calcParamsSideHeight(side_a, h1)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs,'side_a d ok','side_a d bad')
        }
        // Радиус и сторону
        else if (r && side_a) {
            h1 = 2*r
            let arrCheck = calcParamsSideHeight(side_a, h1)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs,'side_a r ok','side_a r bad')
        }
        // Радиус и угол
        else if (r && (alpha || betta)) {
            if (alpha) betta = 180-alpha
            else if (betta) alpha = 180-betta
            S = (4*r**2)/Math.sin(toRadians(alpha))
            side_a = S / (2*r)
            h1 = S / side_a
            let arrCheck = calcParamsSideHeight(side_a, h1)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs,'r alpha/betta ok','r alpha/betta bad')
        }
        else console.log("Недостаточно данных")
    }
    
    return (
        <div  className="form-container">
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
        <img src={rhombImage} alt='parallelogram' />
        <p className='subtitle mt0'>Сторона ромба</p>
        <div className='form-group'>
                    <label htmlFor="side_a" className='label_inner_text'>
                        a =
                        <input className='labela w230' type="text" id="side_a" name="side_a"/>
                    </label>
        </div>
        <p className='subtitle mt0'>Углы ромба</p>

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

            <div className='form-group row'>
                        <label htmlFor="s">S=</label>
                        <input  type="text" id="s" name="s" className='w220'/>
            </div>
            <div className='form-group row'>
                        <label htmlFor="perimeter">P=</label>
                        <input type="text" id="perimeter" name="perimeter" className='w220'/>
            </div>


            <div className="row">
                <div className='form-group'>
                    <label htmlFor="diagonal1" className='label_inner_text'>
                        d1=
                        <input className='labela w70' type="text" id="diagonal1" name="diagonal1"/>
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="diagonal2" className='label_inner_text'>
                        d2=
                        <input className='labela w70' type="text" id="diagonal2" name="diagonal2"/>
                    </label>
                </div>

            </div>

            <div className='form-group row'>
                <label htmlFor="height1">h=</label>
                <input className='w220' type="text" id="height1" name="height1" />
            </div>

            <div className='form-group row'>
                <label htmlFor="r">r=</label>
                <input className='w220' type="text" id="r" name="r" />
            </div>
            <div className="row">
                <button type="submit" className= "sFormText">Построить</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>
        </form>
        </div>
    )

}