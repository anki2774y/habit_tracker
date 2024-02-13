import './App.css';
import Habit from './Habit/Habit';
import Navbar from './Navbar/Navbar';
import Form from './Form/Form';
import { useValue } from './itemContext';
import WeekView from './HabitWeekView/WeekView';

function App() {

  const { showForm, showWeek } = useValue();

  return (
    <div className="App">
      <Navbar />
      
      { showWeek ? <WeekView /> : <Habit /> }
      {/* <WeekView /> */}
      {
        showForm &&
        <div className="moodlOverlay">
            <Form />
        </div>
      }

    </div>
  );
}

export default App;