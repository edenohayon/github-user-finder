import React from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";


import Home from '../containers/Home';
import About from '../containers/About';
import UserInfo from '../containers/UserInfo'


const Navbar = (props) => {
  return (
    <React.Fragment>
      <div className="bg-purple-500 p-2 flex justify-between items-center">

        <div className="flex items-center">
          <img src="https://cdn2.iconfinder.com/data/icons/social-icons-color/512/github-256.png" width="45" alt="Logo" className="z-0 mr-2 pb-2"/>
            <Link to="/"><button className="inline-block p-2 text-purple-200 hover:text-indigo-100 mr-2">Home</button></Link>
            <Link to="/about"><button className="inline-block p-2 text-purple-200 hover:text-indigo-100">About</button></Link>
        </div>

      </div>
        <Switch>

          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/user-info/:userName">
            <UserInfo />
          </Route>
        </Switch>
    </React.Fragment>
  );
}

export default Navbar;