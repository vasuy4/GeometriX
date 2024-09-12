import { Link } from "react-router-dom";


export default function LevelsBtns({difficulty, levels}) { // difficulty - easy, medium, OGE, EGE
    return (
        <div className="level-container">
        {levels.map((level, index) => (
            <Link to={{
                pathname: '/workbench/learn',
                search: `?level=${difficulty}${level}`
            }} key={index} className="level-button" href="#">
                <div className='contLevelName'>
                    <p className='digitSize'>{level.replace('Level', '')}</p>
                    <p className='wordSize'>уровень</p>
                </div>
            </Link>
        ))}
    </div>
    )
}