import { FaCircleCheck, FaCircleMinus, FaCircleXmark } from "react-icons/fa6";
import styles from './WeekView.module.css';
import { useValue } from '../itemContext';
import { actions, habitSelector } from '../redux/reducers/habitReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { format, lastDayOfWeek } from "date-fns";

function WeekView() {
    const { setShowWeek } = useValue();
    const habits = useSelector(habitSelector);
    const dispatch = useDispatch();

    function handleWeekView(id) {
        setShowWeek(false);
        dispatch(actions.hideWeekView(id));
    }

    const habit = habits.filter((habit => habit.text.weekView === true));
    
    // Accessing and mapping weekDayStatus
    const weekDayStatus = habit[0].text.weekDayStatus;

    const weekDayStatusKeys = Object.keys(weekDayStatus);
    const lastDate = Object.keys(weekDayStatus)[weekDayStatusKeys.length - 1];

    // State to track the total days
    const [totalDays, setTotalDays] = useState(weekDayStatusKeys.length);

    const todayDate = new Date();
    const formattedDate = format(todayDate, 'MM-dd-yyyy');

    useEffect(() => {
        if (lastDate !== formattedDate) {
          // Calculate dates between lastDate and todayDate
            let currentDate = new Date(lastDate);
            let endDate = new lastDayOfWeek(todayDate);
            
            while (currentDate < endDate) {
                currentDate.setDate(currentDate.getDate() + 1);
                const date = format(currentDate, 'MM-dd-yyyy');
                const day = format(currentDate, 'EEEE');
                if(new Date() >= currentDate) {
                    dispatch(actions.addDates({day: day, date: date, view: true, status: ""}));
                } else {
                    dispatch(actions.addDates({day: day, date: date, view: false, status: ""}));
                }
            }
        }
        dispatch(actions.habitTotalDays([totalDays]));
    }, [lastDate, formattedDate, totalDays]);

    function handleDayStatus(status) {
        dispatch(actions.statusHabit(status));
    }

    return (
        <>
            <div className={styles.weekViewCnt}>
                {
                    <>
                        <div className={styles.habitDetails}>
                            <p className={styles.habitName}> {habit[0].text.name} </p>
                            <p className={styles.createdDate}> Created On : {habit[0].text.startDate} </p>
                        </div>
                        <div className={styles.habit}>
                            <div className={styles.weekDaysMarkCnt}>
                                {Object.keys(weekDayStatus).map((day, index) => (
                                    <>                                        
                                        <div 
                                            className= {weekDayStatus[day].view ? styles.weekDaysMark : styles.abvCurrentDt }
                                        >
                                            <div className={styles.weekDetail}>
                                                <p className={styles.weekDay}> {weekDayStatus[day].day} </p>
                                                <p className={styles.weekDate}> {weekDayStatus[day].date} </p>
                                            </div>
                                            <div className={styles.dayAction}>
                                                <div 
                                                    className= {weekDayStatus[day].status === 'done' ? styles.statusDone : "" }
                                                    onClick={weekDayStatus[day].view ? ()=> handleDayStatus({ date: weekDayStatus[day].date, status: 'done' }) : () => {}} 
                                                    data-tooltip='Done'
                                                >
                                                    <FaCircleCheck />
                                                </div>
                                                <div
                                                    className= {weekDayStatus[day].status === 'none' ? styles.statusNone : "" }
                                                    onClick={weekDayStatus[day].view ? ()=> handleDayStatus({ date: weekDayStatus[day].date, status: 'none' }) : () => {}} 
                                                    data-tooltip='None'
                                                >
                                                    <FaCircleXmark />
                                                </div>
                                                <div
                                                    className= {weekDayStatus[day].status === 'not done' ? styles.statusNotDone : "" }                                                    
                                                    onClick={weekDayStatus[day].view ? ()=> handleDayStatus({ date: weekDayStatus[day].date, status: 'not done' }) : () => {}} 
                                                    data-tooltip='Not Done'
                                                >
                                                    <FaCircleMinus />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                        <div tabIndex={0} className={styles.backBtn} onClick={()=>handleWeekView(habit[0].text.id)}>
                            <p> Back To Detail View </p>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default WeekView;