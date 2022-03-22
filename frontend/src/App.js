// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import configData from "./config.json";
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import useToken from './libraries/UseToken';
import Navbar from './components/navbar/Navbar';
import NotFound from './components/misc/NotFound';
import TripHistory from './components/triphistory/TripHistory';
import { useLoadScript } from '@react-google-maps/api';
import DriveRide from './components/main/DriveRide';
import UseActiveTrip from 'libraries/UseActiveTrip';

const libraries = ['places'];

function App() {
  const { activeTrip, setActiveTrip } = UseActiveTrip();
  const { token, setToken } = useToken(setActiveTrip);


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: configData.MAPS_API_KEY,
    libraries
  });

  if (loadError) return <h1>Map load error</h1>;
  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <Router>
      <Navbar setToken={setToken} />
      <Routes>
        <Route exact path='/' element={activeTrip ? <Navigate to="/active-trip" /> : <Navigate to="/trip-history" />} />
        <Route exact path='/login' element={token ? <Navigate to="/" /> : <Login setToken={setToken} setActiveTrip={setActiveTrip} />} />
        <Route exact path='/signup' element={token ? <Navigate to="/" /> : <SignUp setToken={setToken} />} />
        <Route exact path='/drive' element={activeTrip ? <Navigate to="/active-trip" /> : (token ? <DriveRide type='drive' setToken={setToken} setActiveTrip={setActiveTrip} /> : <Navigate to="/login" />)} />
        <Route exact path='/ride' element={activeTrip ? <Navigate to="/active-trip" /> : (token ? <DriveRide type='ride' setToken={setToken} setActiveTrip={setActiveTrip} /> : <Navigate to="/login" />)} />
        <Route exact path='/trip-history' element={token ? <TripHistory /> : <Navigate to="/login" />} />
        <Route exact path='/active-trip' element={token ? <TripHistory /> : <Navigate to="/login" />} /> {/*change to: ActiveTrip*/}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
