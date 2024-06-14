export function ConstructionTree({ constructionTree, show }) {

    return (
        <div className="constructionTree">
            {constructionTree.map((shape, index) => (
                <button key={index}>
                    <img src={shape.shapeImage} alt={shape.shape} className="shape-image" />
                    <span className="shape-name">{shape.shapeText}</span>
                </button>
            ))}
        </div>
    );
}

export function CossnstructionTree({ constructionTree, show }) {

    return (
        <div className="constructionTree">
            {constructionTree.map((shape, index) => (
                <div key={index} className="shape-item">
                    <img src={shape.shapeImage} alt={shape.shape} className="shape-image" />
                    <span className="shape-name">{shape.shapeText}</span>
                </div>
            ))}
        </div>
    );
}


