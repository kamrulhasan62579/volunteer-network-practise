import './App.css';
import Header from "../src/components/Header/Header"
import Donations from './components/Donations/Donations';
import Events from './components/Events/Events';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Blog from './components/Blog/Blog';
import Login from './components/Login/Login';
import AddEvent from './components/AddEvent/AddEvent';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log(loggedInUser);
  return (
     <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
        <Header></Header>
        <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/donation">
              <Donations></Donations>
            </Route>
            <PrivateRoute path="/events">
              <Events></Events>
            </PrivateRoute>
            <Route path="/blog">
              <Blog></Blog>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/calledEvent/:id">
              <AddEvent></AddEvent>
            </PrivateRoute>
            <Route exact path="/">
              <Home></Home>
            </Route>
        </Switch>
        </Router>
     </UserContext.Provider>
  );
}

export default App;
