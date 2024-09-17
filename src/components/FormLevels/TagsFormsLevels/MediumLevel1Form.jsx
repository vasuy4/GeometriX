import { fixedNum, checkBelowZero, checkCalculate } from "../../FormShapes/formulas";

export default function MediumLevel1({handleFormSubmit, nowLevel, handleClose}) {

    const handleFormSubmitCheckParameters = (event, nowLevel) => {
        event.preventDefault();
        let BK = fixedNum(Number(document.getElementById('BK').value))
        let KC = fixedNum(Number(document.getElementById('KC').value))

        const arrInput = [BK, KC]
        const idInputs = ['BK', 'KC']
        const belowZero = checkBelowZero(arrInput, idInputs)

        if ((BK <=0 && KC <=0) || (BK && KC)) return
        if (BK) KC = fixedNum(BK / (15/9))
        else if (KC) BK = fixedNum(KC * (15/9))
        arrInput[0] = BK
        arrInput[1] = KC
        let arrCheck = arrInput.slice()

        checkCalculate(handleFormSubmit, event, nowLevel, arrInput, arrCheck, idInputs, 'ok', 'bad')

        // handleFormSubmit(event, nowLevel)
    }

    return (
        <form className="formLevelsForm" onSubmit={(event) => handleFormSubmitCheckParameters(event, nowLevel)} action="">
            <p>Изменить дано:</p>
            <div className='form-group row'>
                <label htmlFor="BK">BK =</label>
                <input className='w220' type="text" id="BK" name="BK"/>
            </div>
            <div className='form-group row'>
                <label htmlFor="KC">KC =</label>
                <input className='w220' type="text" id="KC" name="KC"/>
            </div>
            <p style={{fontSize: 18}}>*введите только одно из значений</p>
            <div className="row">
                <button type="submit" className= "sFormText">Заново</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>
        </form>
    )
}