import './HomePage.css';
import { Link } from "react-router-dom";
import logo from "../../components/Header/LogoBlue.png";
import image1 from './images/image128.png'
import image2 from "./images/image129.png";
import pyramid1 from "./images/pyramidProject.svg"
import pyramid2 from "./images/pyramid2Project.svg"

function Home() {
    return (
        <div className="Home">
            <header className='headerHome'>
                <div className='logoHome'>
                    <Link to="/" className="logolink">
                        <img className="imgLogo" src={logo} alt="Logo" />
                    </Link>
                    <Link to="/">
                        <h3>Геометрикс</h3>
                    </Link>
                </div>

                <div className='containerNav row'>
                    <nav className='navHome'>
                        <a href="#project-block">О проекте</a>
                        <a href="#theory">Руководство</a>
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
                    <img src={image2} className='imgGrid' alt="screen2" />
                </div>
                <div className="grid-item item4">
                    <h3 className='headGrid'>Геометрический 3D-учебник</h3>
                    <p className='descrGrid'>Графическая, интерактивная форма представления геометрических задач с использованием трёхмерной графики.</p>
                    <Link to="/ChoosingDifficulty" className="btnGrid">Открыть учебник</Link>
                </div>
            </div>

            <div id="project-block">
                <div className='project-title-cont'>
                    <h2 className="project-title">Наш проект</h2>
                    <svg width="511" height="8" viewBox="0 0 511 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 4C408.8 4.00004 511 4.00004 511 4.00004" stroke="#9290C3" strokeWidth="8" />
                    </svg>
                </div>
                <img src={pyramid1} className='pyramidImg' alt="pyramid1" />
                <p className="project-description"><span className='bold-descr-project'>Геометрический калькулятор</span> - это приложение, разработанное студентами. Проект создан для обучения предмету геометрия (планиметрия и стереометрия). Благодаря геометрическому калькулятору пользователи смогут получить 2D и 3D изображение задачи с необходимыми аннотациями и алгоритмом решения.</p>
                <img src={pyramid2} className='pyramidImg2' alt="pyramid2" />
            </div>


            <div id="theory">
                <div className='project-title-cont-theory'>
                    <h2 className='project-title rLine'>Теоретический проект</h2>
                    <svg width="868" height="8" viewBox="0 0 868 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 4C697.6 4.00006 872 4.00008 872 4.00008" stroke="#9290C3" stroke-width="8" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Home;