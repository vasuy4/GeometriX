import EasyLevel1 from "./TagsFormsLevels/EasyLevel1Form.jsx";
import EasyLevel2 from "./TagsFormsLevels/EasyLevel2Form.jsx";
import MediumLevel1 from "./TagsFormsLevels/MediumLevel1Form.jsx";

export default function FormLevels({nowLevel, setSelectedLevel, draw, setNowStage, setArgs}){
    const handleFormSubmit = (event, level) => {  // вызвыается при отправке формы
        event.preventDefault();
        let formValues = new FormData(event.target);
        formValues = Array.from(formValues.entries()).map(([key, value]) => value);
        let numericFormValues = formValues.map(value => Number(value));  // извлечение данных
        setNowStage(0) // установка начальной стадии
        draw(0, numericFormValues)  // перерисовка сцены
        setArgs(numericFormValues)  // изменение аргументов
        setSelectedLevel(false);  // закрытие формы
    }

    const handleClose = (event) => {
        event.preventDefault();
        setSelectedLevel(false);
    }
    const renderFormLevel = () => {
        switch (nowLevel) {
            // формы для уровней
            case 'easyLevel1':
                return (
                    <EasyLevel1 handleFormSubmit={handleFormSubmit} nowLevel={nowLevel} handleClose={handleClose}/>
                )
            case 'easyLevel2':
                return (
                    <EasyLevel2 handleFormSubmit={handleFormSubmit} nowLevel={nowLevel} handleClose={handleClose}/>
                )
            case 'mediumLevel1':
                return (
                    <MediumLevel1 handleFormSubmit={handleFormSubmit} nowLevel={nowLevel} handleClose={handleClose}/>
                )
            default:
                return null;
        }
    }

    return (
        <div className='parent formLevels'>
            {renderFormLevel()}
        </div>
    )
}