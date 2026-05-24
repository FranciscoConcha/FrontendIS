
import {  Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CreateFuncion from './admin/Pages/CreateFuntion/CreateFuncion';
import ReservationPage from './admin/Pages/Reservation/Reservation';

function App() {
  return(
  <>
      <Routes>
        <Route path='/'element={<Login/>}/>
        <Route path='/CreateFunt' element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <CreateFuncion/>
          </ProtectedRoute>}
        />
        <Route path='/Reservation/:functionId' element={
          <ProtectedRoute allowedRoles={['User', 'Admin']}>
            <ReservationPage/>
          </ProtectedRoute>
        }/>
        <Route path='/noAdmin' element={
          <ProtectedRoute allowedRoles={['User', 'Admin']}>
            <Login/>
          </ProtectedRoute>
          }
        />
      </Routes>
  </>)
    
}

export default App;
