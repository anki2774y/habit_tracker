import { FaCalendarAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SiHashicorp } from "react-icons/si";
import styles from "./HabitList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { actions, habitSelector } from "../redux/reducers/habitReducer";
import { useValue } from "../itemContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HabitList() {

    const { setShowWeek } = useValue();
    const habits = useSelector(habitSelector);
    const dispatch = useDispatch();

    function weekView(id) {
        setShowWeek(true);
        dispatch(actions.showWeekView(id));
    }

    return (
        <>  
            <div className={styles.habitListContainer}>
                {habits.map((habit, i) => (
                    <div className={styles.habitListCnt} key={i}>
                        <div className={styles.habitP1}>
                            <div className={styles.habitIcon}>
                                <SiHashicorp />
                            </div>
                            <div className={styles.habitName}>
                                <p> {habit.text.name} </p>
                                <p> {habit.text.currentScore}/{habit.text.totalDays} </p>
                            </div>
                        </div>
                        <div className={styles.actionCnt}>
                            <div className={styles.view} onClick={()=>weekView(i)}>
                                <FaCalendarAlt />
                                <p> Week View </p>
                            </div>
                            <div 
                                className={styles.delete} 
                                onClick={
                                    ()=>{
                                        dispatch(actions.delete(i)); 
                                        toast.info("Deleted Successfully !");
                                    }
                                }
                            >
                                <MdDelete />
                            </div>
                        </div>
                    </div>
                ))}
                </div>
        </>
    )
}

export default HabitList;