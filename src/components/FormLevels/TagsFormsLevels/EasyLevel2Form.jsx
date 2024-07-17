import { fixedNum, checkBelowZero } from "../../FormShapes/formulas";

export default function EasyLevel2({handleFormSubmit, nowLevel, handleClose}) {

    const handleFormSubmitCheckParameters = (event, nowLevel) => {
        event.preventDefault();
        let a = fixedNum(Number(document.getElementById('a').value))

        const arrInput = [a]
        const idInputs = ['a']
        const belowZero = checkBelowZero(arrInput, idInputs)

        if (a<=0) return

        let arrCheck = arrInput.slice()
        handleFormSubmit(event, nowLevel)
    }

    return (
        <form className="formLevelsForm" onSubmit={(event) => handleFormSubmitCheckParameters(event, nowLevel)} action="">
            <p>Изменить дано:</p>
            <div className='form-group row'>
                <label htmlFor="a">a =</label>
                <input className='w220' type="text" id="a" name="a" required/>
            </div>

            <div className="row">
                <button type="submit" className= "sFormText">Заново</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>
        </form>
    )
}