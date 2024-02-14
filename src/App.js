import './App.css';
import Habit from './Habit/Habit';
import Navbar from './Navbar/Navbar';
import Form from './Form/Form';
import { useValue } from './itemContext';
import WeekView from './HabitWeekView/WeekView';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {

  const { showForm, showWeek } = useValue();

  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      errorElement: "Some error occured!...",
      children: [
        {path: '/', element: <Habit />},
        {path: `/weekview`, element: showWeek && <WeekView />},
        {path: '/form', element: showForm && <div className="moodlOverlay">  <Form /> </div>},
      ]
    }
  ])


  return (
    <div className="App">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;