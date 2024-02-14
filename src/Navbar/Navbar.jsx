import { NavLink, Outlet } from 'react-router-dom';
import { useValue } from '../itemContext';
import styles from './Navbar.module.css';

function Navbar() {

    const { openForm, showWeek } = useValue();

    return (
        <>
            <div className={styles.navbarCnt}>
                <div className={styles.navbarP1}>
                    <h3 className={styles.appName}> Habit Tracker </h3>
                </div>
                <div className={styles.navbarP2}>
                    <div className={styles.view}>
                        <p className={styles.navP2}> { !showWeek ? 'Detail' : 'Week' } View </p>
                    </div>
                    <NavLink to={'/form'} className={styles.addHbt} onClick={openForm}>
                        <p  className={styles.navP2}> Add Habit </p>
                    </NavLink>
                </div>                
            </div>
            <Outlet />            
        </>
    )
}

export default Navbar;