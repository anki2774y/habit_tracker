import { format, subDays } from "date-fns";
import { useValue } from "../itemContext";
import styles from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { actions, habitSelector } from "../redux/reducers/habitReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Form() {

    const { closeForm, formData, setFormData } = useValue();
    const disptach = useDispatch();
    const habits = useSelector(habitSelector);
    const navigate = useNavigate();

    // Current Date 
    const currentDate = new Date()
    // Create an array to store the next 7 days
    const next7Days = {};

    // Create an array to store the previous 7 days
    const previous7Days = {};
    
    // Loop to get the dates for the previous 7 days
    for (let i = 0; i <= 5; i++) {
        const previousDate = subDays(currentDate, i);
        const formattedDate = format(previousDate, 'MM-dd-yyyy');
        const formattedDay = format(previousDate, 'EEEE');
        previous7Days[formattedDate] = {day: formattedDay, date: formattedDate, view: true, status: ""};
    }

    const allDays = {...previous7Days};

    function handleChange(event) {
        setFormData((prev) => ({
            ...prev,
            id: habits.length,
            name: event.target.value,
            weekView: false,
            startDate: format(new Date(), 'dd-MM-yyyy'),
            startDay: format(new Date(), 'EEEE'),
            totalDays: Object.keys(allDays).length,
            currentScore: '0',
            weekDayStatus: allDays
        }))
    }

    function clearForm() {
        setFormData("");
    }

    function handleSubmitForm(e) {
        e.preventDefault();
        disptach(actions.add(formData));
        clearForm();
        toast.success("Added Successfully !");
        closeForm();
        navigate('/');
    }

    return (
        <div className={styles.formPage}>
            <p className={styles.heading}> Add New Habit </p>
            <form onSubmit={handleSubmitForm}>
                <div className={styles.formInput}>
                    <div className={styles.habitName}>
                        <label> Habit Name </label>                        
                    </div>
                    <div className={styles.habitInput}>
                        <input autoComplete="off" placeholder="Enter Habit Name" 
                            value={formData.name} onChange={(e)=>handleChange(e)}
                        /> 
                    </div>
                </div>
                <div className={styles.buttonCnt}>                    
                    <button type="button" onClick={closeForm}> Cancel Habit </button>
                    <button className={styles.saveHabit} type="submit"> Save Habit </button>
                </div>
            </form>
        </div>
    )
}

export default Form;