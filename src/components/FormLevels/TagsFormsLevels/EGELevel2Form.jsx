import { fixedNum, checkBelowZero } from "../../FormShapes/formulas";

export default function EGELevel2({handleFormSubmit, nowLevel, handleClose}) {

    const handleFormSubmitCheckParameters = (event, nowLevel) => {
        event.preventDefault();
        let angle = fixedNum(Number(document.getElementById('angle').value))
        let AB = fixedNum(Number(document.getElementById('AB').value))

        const arrInput = [angle, AB]
        const idInputs = ['angle', 'AB']
        const belowZero = checkBelowZero(arrInput, idInputs)

        if (angle <= 9 || angle > 90 || AB <= 0) return

        let arrCheck = arrInput.slice()

        handleFormSubmit(event, nowLevel)
    }

    return (
        <form className="formLevelsForm" onSubmit={(event) => handleFormSubmitCheckParameters(event, nowLevel)} action="">
            <p>Изменить дано:</p>
            <div className='form-group row'>
                <label htmlFor="angle">∠ASB=</label>
                <input className='w220' type="text" id="angle" name="angle" required/>
            </div>
            <div className='form-group row'>
                <label htmlFor="AB">AB =</label>
                <input className='w220' type="text" id="AB" name="AB" required/>
            </div>
            <div className="row">
                <button type="submit" className= "sFormText">Заново</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>
        </form>
    )
}