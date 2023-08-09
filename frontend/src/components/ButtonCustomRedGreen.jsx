import styles from '../styles/buttonRedGreen.module.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ButtonCustomRedGreen({ color, disabled, to, onClick, nameBtt }) {
    const buttonClasses = `m-1 font-monospace ${styles['custom-btt']} ${color === 'red' ? styles['custom-btt-close'] : styles['custom-btt-add']
        }`;

    if (to) {
        return (
            <div>
                <Link to={to} className={buttonClasses} disabled={disabled}>
                    {nameBtt}
                </Link>
            </div>
        );
    }
    else {
        return (
            <div>
                <Button className={buttonClasses} onClick={onClick} disabled={disabled}>
                    {nameBtt}
                </Button>
                {disabled && <p style={{ color: 'red' }}>Complete todos los campos.</p>}
            </div>
        );
    }
}

export default ButtonCustomRedGreen;


{/* 
<ButtonCustomRedGreen color="red" onClick={handleClick} nameBtt="Red Button" />

<ButtonCustomRedGreen color="green" to="/some-route" nameBtt="Green Link" /> 
*/}