import React from 'react';
import {Route, IndexRoute } from 'react-router';
import Main from '../components/Main.jsx';
import Properties from '../components/properties/propertiesContainer.jsx';
<<<<<<< HEAD
import Analytics from '../components/analytics/analytics.jsx';
=======
import SignIn from '../components/SignIn.jsx';
>>>>>>> Implement authentication with passport and server redirect

module.exports = (
  <Route path='/' component={Main}>
    <Route path='/properties' component={Properties} />
    <Route path='/analytics' component={Analytics} />
    <Route path='/signin' component={SignIn} />
  </Route>

);
    // <Route path='/settings' component={Settings} />