import HabitList from "../HabitList/HabitList";
import styles from "./Habit.module.css";

function Habit() {
    return (
        <div className={styles.habitCnt}>
            <HabitList />
        </div>
    )
}

export default Habit;