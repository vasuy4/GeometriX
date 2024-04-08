import cube from './ShapesImg/cube.png';
import sphere from './ShapesImg/sphere.png';
import pyramid from './ShapesImg/pyramid.png';


export default function Shapes() {
    const imgStyle = {
        width: '25px',
        height: '25px',
        objectFit: 'cover'
    };

    return (
        <div class="button-container">
            <button className="button"><img style={imgStyle} src={cube} alt="cube" /></button>
            <button className="button"><img style={imgStyle} src={sphere} alt="sphere" /></button>
            <button className="button"><img style={imgStyle} src={pyramid} alt="pyramid" /></button>
        </div>
    )
}