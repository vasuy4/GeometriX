import { Link } from "react-router-dom";
import logo from '../../components/Header/LogoBlue.png'


export default function LogoLevels() {
    return (
        <div className='logoDiffCont'>
            <div className='logoHome logoChooseDiff'>
                <Link to="/" className="logolink">
                    <img className="imgLogo" src={logo} alt="Logo" />
                </Link>
                <Link to="/">
                    <h3>Геометрикс</h3>
                </Link>
            </div>
        </div>
    )
}