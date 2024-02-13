import { createContext, useContext, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const itemContext = createContext();

function useValue() {
    const value = useContext(itemContext);
    return value;
}

function CustomItemContext({ children }) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: "",
        startDate:""
    });

    const [showWeek, setShowWeek] = useState(false);
    // console.log("show :: ", showWeek)
    function closeForm() {
        setShowForm(false);
    }
    
    function openForm() {
        setShowForm(true)
    }

    return (
        <>
            <itemContext.Provider value={
            { 
                showForm, formData, setFormData, showWeek, setShowWeek,
                closeForm, openForm
            }
            }>
                {children}
                <ToastContainer position="top-right"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    // toastStyle={{margin: 'auto', width: 'auto', fontSize: '10px', padding: '2px'}}
                /> 
            </itemContext.Provider>
        </>
    );
}


export { itemContext, useValue };
export default CustomItemContext;