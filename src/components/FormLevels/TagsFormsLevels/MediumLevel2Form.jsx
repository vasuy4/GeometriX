import { useState } from "react";
import { fixedNum, checkBelowZero, checkCalculate } from "../../FormShapes/formulas";

export default function MediumLevel2({handleFormSubmit, nowLevel, handleClose}) {
    const [angleUser, setAngleUser] =  useState(null);

    const handleFormSubmitCheckParameters = (event, nowLevel) => {
        event.preventDefault();
        let angle = fixedNum(Number(document.getElementById('angle').value))
        setAngleUser(angle)
        const arrInput = [angle]
        const idInputs = ['angle']
        const belowZero = checkBelowZero(arrInput, idInputs)

        if (angle <= 95 || angle >= 170) return

        let arrCheck = arrInput.slice()

        checkCalculate(handleFormSubmit, event, nowLevel, arrInput, arrCheck, idInputs, 'ok', 'bad')
    }

    return (
        <form className="formLevelsForm" onSubmit={(event) => handleFormSubmitCheckParameters(event, nowLevel)} action="">
            <p>Изменить дано:</p>
            <div className='form-group row'>
                <label htmlFor="angle">∠1 =</label>
                <input className='w220' type="text" id="angle" name="angle"/>
            </div>

            {(angleUser !== null && (angleUser <= 95 || angleUser >= 170)) && (
                <p style={{fontSize: 18}}>Введите значение между 95 и 170</p>
            )}

            <div className="row">
                <button type="submit" className= "sFormText">Заново</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>
        </form>
    )
}