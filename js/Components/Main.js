import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import About from './About'
import ControlPanel from './ControlPanel'

const Main = () => (
    <div className="main">
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/about' component={About} />
            <Route path='/panel' component={ControlPanel} />
        </Switch>
    </div>
)

export default Main
