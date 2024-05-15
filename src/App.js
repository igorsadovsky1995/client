import react from 'react'
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import FormPage from './pages/FormPage/FormPage';
import EventBoard from './pages/EventBoard'
import UserPage from './pages/UsersPage/UsersPage'
function App() {
  return (
    <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<EventBoard/>}/>
            <Route path='/registration/:eventId' element={<FormPage/>}/>
            <Route path='/users/:eventId' element={<UserPage/>}/>
          </Routes>
        </div>
    </Router>
  );
}

export default App;
