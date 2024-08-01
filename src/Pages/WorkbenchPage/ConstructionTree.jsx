import './ConstructionTree.css';
import SphereForm from '../../components/FormShapes/TagsForms/SphereForm';
import React, { useState } from 'react';

let number;
let selectedShape=null;



export function ConstructionTree({constructionTree, handleOptionsClick, handleFormSubmit }) {
    const [pressedButton, setPressedButton] = useState(null);

   

    const handlBtnClck = (event) => {
        const buttonId = event.currentTarget.id;
        //console.log(event)
       // Toggle the button state: if it's already pressed, unpress it; otherwise, press it
        setPressedButton(prevButton => {
          
             const updatedButton = prevButton === buttonId ? null : buttonId;
            if(updatedButton!=null){
               
                number = parseInt(updatedButton.replace(/\D/g, ''), 10)-1; // Удаляет все нецифровые символы
                selectedShape=constructionTree[number].shape;
               // handleBtnClick1(constructionTree[number].shape);
            }  else{

                selectedShape=null;
               // handleBtnClick1(null)
            }
  
         
            handleOptionsClick(['SelectionOfFigures', updatedButton ? [updatedButton] : []]);
            return updatedButton;
        });
    };

    const handleFormSubmitWithReset = () => {
        setPressedButton(prevButton => {
          
           // const updatedButton = null;
            selectedShape=null
           handleOptionsClick(['SelectionOfFigures', []]);
           return 0;
       });
       
    }
    
    

    return (
        <div className="constructionTree">
            {constructionTree.map((shape) => (
                <button
                    onClick={handlBtnClck}
                    key={shape.id}
                    id={`shape-${shape.id}`}
                    className={pressedButton === `shape-${shape.id}` ? 'button-active' : ''}
                >
                    <div className="shape-item">
                        <img src={shape.shapeImage} alt={shape.shape} className="shape-image" />
                        <span className="shape-name">{shape.shapeText}</span>
                    </div>
                </button>
            ))}

            {selectedShape === 'sphere' ? (
            <SphereForm 
                handleFormSubmit={handleFormSubmit} 
                selectedShape={selectedShape} 
                handleClose={handleFormSubmitWithReset} 
                updateFigure={constructionTree[number]}
            />
        ) : null}
        </div>
    );
}