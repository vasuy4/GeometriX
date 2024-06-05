import React, { useState } from 'react';
import TriangleForm from './TrianglesForms/Coordvertex.jsx';

export default function TrapezoidForm({ handleFormSubmit, selectedShape, handleClose }) {
    const [showTriangleForm, setShowTriangleForm] = useState(false);

    return (
        <form>
            {/* Кнопка для отображения формы TriangleForm */}
            <button type="button" onClick={() => setShowTriangleForm(true)}>по координатам вершин</button>
            {/* Остальные кнопки вашей формы */}
            <button type="submit">По сторонам</button>
            <button type="submit">По вершине и двум смежным углам</button>
            <button type="submit">По вершине, углу и прилежащей стороне</button>
            <button type="submit">По сторонам и углу между ними</button>

            {/* Компонент TriangleForm, который отображается при условии showTriangleForm === true */}
            {showTriangleForm && <TriangleForm />}
        </form>
    )
}