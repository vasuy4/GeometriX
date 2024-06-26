import './ConstructionTree.css'

export function ConstructionTree({ constructionTree, show }) {
    const handlBtnClck = (event) => {
        const buttonId = event.currentTarget.id;
        // TODO
    }
    return (
        <div className="constructionTree">
            {constructionTree.map((shape) => (
                <button onClick={handlBtnClck} key={shape.id} id={`shape-${shape.id}`}>
                    <div className="shape-item">
                        <img src={shape.shapeImage} alt={shape.shape} className="shape-image" />
                        <span className="shape-name">{shape.shapeText}</span>
                    </div>
                </button>
            ))}
        </div>
    );
}
