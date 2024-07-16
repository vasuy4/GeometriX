import { fixedNum, checkBelowZero } from "../../FormShapes/formulas";

export default function EasyLevel1({handleFormSubmit, nowLevel, handleClose}) {

    const handleFormSubmitCheckParameters = (event, nowLevel) => {
        event.preventDefault();
        let a = fixedNum(Number(document.getElementById('MN').value))
        let b = fixedNum(Number(document.getElementById('MK').value))

        const arrInput = [a, b]
        const idInputs = ['MN', 'MK']
        const belowZero = checkBelowZero(arrInput, idInputs)

        if (a<=0 || b<=0) return

        let arrCheck = arrInput.slice()
        handleFormSubmit(event, nowLevel)
    }

    return (
        <form className="formLevelsForm" onSubmit={(event) => handleFormSubmitCheckParameters(event, nowLevel)} action="">
            <p>Изменить дано:</p>
            <div className='form-group row'>
                <label htmlFor="MN">MN =</label>
                <input className='w220' type="text" id="MN" name="MN" required/>
            </div>
            <div className='form-group row'>
                <label htmlFor="MK">MK =</label>
                <input className='w220' type="text" id="MK" name="MK" required/>
            </div>

            <div className="row">
                <button type="submit" className= "sFormText">Заново</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>
        </form>
    )
}