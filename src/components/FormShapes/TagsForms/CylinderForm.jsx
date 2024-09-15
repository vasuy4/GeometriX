import { fixedNum, checkCalculate, checkBelowZero, } from '../formulas.js'
import cylindr from '../formShapesImg/cylindr.svg'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'


// Отображает форму трапеции
export default function PolygonalPrismForm({ handleFormSubmit, selectedShape, handleClose, updateFigure, handleOptionsClick }) {
    const translateShape = dictTranslate[selectedShape];

    const calcWithSides = (R, h) => {

        let d = Math.sqrt(R * R + h * h);
        let P = Math.PI * R * 2;
        let So = Math.PI * R * R;
        let V = So * h;
        let Sbp = P * h;
        let S = 2 * So + Sbp;

        return [R,d,h, V,P,   So, Sbp, S ]
    }

    const calcWithSRadiusAndVolume = (R, V) => {
        let So = Math.PI * R * R;
        let h = V / So;
        let d = Math.sqrt(R * R + h * h);
        let P = Math.PI * R * 2;
        let Sbp = P * h;
        let S = 2 * So + Sbp;
        return [R,d,h, V,P,   So, Sbp, S ]
    }

    const calcWithSRadiusAndDiagonal = (R, d) => {
        let h = Math.sqrt(d * d - R * R);
        let P = Math.PI * R * 2;
        let So = Math.PI * R * R;
        let V = So * h;
        let Sbp = P * h;
        let S = 2 * So + Sbp;
        return [R,d,h, V,P,   So, Sbp, S ]
    }

    const calcWithHeightAndSo = (h, So) => {
        let R = Math.sqrt(So / Math.PI);
        let d = Math.sqrt(R * R + h * h);
        let P = Math.PI * R * 2;
        let V = So * h;
        let Sbp = P * h;
        let S = 2 * So + Sbp;


        return [R,d,h, V,P,   So, Sbp, S ]
    }
    const calcWithShEIGHTAndDiagonal = (h, d) => {

        let R = Math.sqrt(d * d - h * h);
        let P = Math.PI * R * 2;
        let So = Math.PI * R * R;
        let V = So * h;
        let Sbp = P * h;
        let S = 2 * So + Sbp;

        return [R,d,h, V,P,   So, Sbp, S ]
    }


    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let R = fixedNum(Number(document.getElementById('R').value))
        let d = fixedNum(Number(document.getElementById('d').value))
        let h = fixedNum(Number(document.getElementById('h').value))
        let V = fixedNum(Number(document.getElementById('volume').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let So = fixedNum(Number(document.getElementById('so').value))
        let Sbp = fixedNum(Number(document.getElementById('Sbp').value))
        let S = fixedNum(Number(document.getElementById('s').value))


        const arrInput = [R,d,h, V,P,   So, Sbp, S ]
        console.log(arrInput)
        const idInputs = ['R', 'd', 'h', 'volume', 'perimeter', 'so', 'Sbp', 's']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        if (R && h) {
            let arrCheck = calcWithSides(R, h)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (R && V) {
            let arrCheck = calcWithSRadiusAndVolume(R, V)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (R && d) {
            let arrCheck = calcWithSRadiusAndDiagonal(R, d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (h && So) {
            let arrCheck = calcWithHeightAndSo(h, So)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (h && d) {
            let arrCheck = calcWithShEIGHTAndDiagonal(h, d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }

    }
   
    let Rform = 2, dform = null, hform = 3, volumeform = null, perimeterform = null, soform = null,Sbpform = null,sform = null;
    if (updateFigure != null) {
        console.log(updateFigure)
        Rform = updateFigure.formValues[0];
        dform = updateFigure.formValues[1];
        hform = updateFigure.formValues[2];
        volumeform = updateFigure.formValues[3];
        perimeterform = updateFigure.formValues[4];
        soform = updateFigure.formValues[5];
        Sbpform = updateFigure.formValues[6];
        sform = updateFigure.formValues[7];
    }


    return (
        <div className="form-container">
            <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
                <p>{translateShape[0].toUpperCase() + translateShape.slice(1, translateShape.length)}</p>
                <img className="cylindr" src={cylindr} alt='cylindr' />

                <div className='form-group row'>
                    <label htmlFor="R">
                        R=
                    </label>
                    <input className='w220' type="text" id="R" name="R"value={Rform} />
                </div>
                <div className='form-group row'>
                    <label htmlFor="d">
                        d=
                    </label>
                    <input className='w220' type="text" id="d" name="d"value={dform} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="h">
                        h=
                    </label>
                    <input className='w220' type="text" id="h" name="h"value={hform} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="volume">
                        V=
                    </label>
                    <input className='w220' type="text" id="volume" name="volume" value={volumeform}/>
                </div>

                <div className='form-group row'>
                    <label htmlFor="perimeter">
                        P=
                    </label>
                    <input className='w220' type="text" id="perimeter" name="perimeter"value={perimeterform} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="so">
                        So=
                    </label>
                    <input className='w220' type="text" id="so" name="so"value={soform} />
                </div>


                <div className='form-group row'>
                    <label htmlFor="Sbp">
                        Sбп=
                    </label>
                    <input className='w220' type="text" id="Sbp" name="Sbp"value={Sbpform} />
                </div>


                <div className='form-group row'>
                    <label htmlFor="s">
                        Sпп=
                    </label>
                    <input className='w220' type="text" id="s" name="s"value={sform} />
                </div>

                <div className="row">
                    {!updateFigure && <button type="submit" className="sFormText">Построить</button>}
                    <button onClick={handleClose} className="sFormText">Закрыть</button>
                </div>


            </form>
        </div>
    )
}