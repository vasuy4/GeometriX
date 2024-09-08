import './HomePage.css';
import { Link } from "react-router-dom";
import logo from "../../components/Header/LogoBlue.png";
import image1 from './images/image128.png'
import image2 from "./images/image129.png"; 

function Home() {
    return (
        <div className="Home">
            <header className='headerHome'>
                <div className='logoHome'>
                    <Link to="/" className="logolink">
                        <img src={logo} alt="Logo" />
                    </Link>
                    <Link to="/">
                        <h3>Геометрикс</h3>
                    </Link>
                </div>

                <div className='containerNav row'>
                    <nav className='navHome'>
                        <a href="#">О проекте</a>
                        <a href="#">Руководство</a>
                        <a href="#">Отзывы</a>
                    </nav>
                </div>
            </header>

            <div className="grid-container">
                <div className="grid-item item1">
                    <h3 className='headGrid'>Геометрический 3D-калькулятор</h3>
                    <p className='descrGrid'>Графическая форма представления геометрических фигур с использованием трёхмерной графики</p>
                    <Link to="/workbench/calculcator" className="btnGrid">Перейти к калькулятору</Link>
                </div>
                <div className="grid-item item2">
                    <img src={image1} className='imgGrid' alt="3D Calculator Screenshot" />
                </div>
                <div className="grid-item item3">
                    <img src={image2} className='imgGrid' alt="Another Program Screenshot" />
                </div>
                <div className="grid-item item4">
                    <h3 className='headGrid'>Геометрический 3D-учебник</h3>
                    <p className='descrGrid'>Графическая, интерактивная форма представления геометрических задач с использованием трёхмерной графики.</p>
                    <Link to="/ChoosingDifficulty" className="btnGrid">Открыть учебник</Link>
                </div>
            </div>

            
        </div>
    );
}

export default Home;