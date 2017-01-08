import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../client/app/modules/routes';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../client/app/modules/reducers';

import express from 'express';
import path from 'path';
let app = express();
import db from './db';

var userRouter = require('./routers/userRouter.js');
var propertyRouter = require('./routers/propertyRouter.js');
var bookingRouter = require('./routers/bookingRouter.js');

// configure middleware
require('./config/middleware.js')(app, express);

// setup routers for users, property, and bookings
app.use('/', userRouter);
app.use('/property', propertyRouter);
app.use('/booking', bookingRouter);

// setup to serve static files
app.use('/', express.static(path.join(__dirname, '../client')));


app.get('*', (req, res) => {
  //const location = createLocation(req.url);
  const store = createStore(reducers);

  // match the routes to the url
  match({ routes: routes, location: req.url }, (err, redirect, props) => {

    if (err) {
      console.log('Error occurred', err);
      return res.status(500).end('Internal server error');
    }

    if (redirect) {
        return res.redirect(302, redirect.pathname + redirect.search);
    }

    if (!props) {
      app.use('/', express.static(path.join(__dirname, '../client')));
    }

    // `RouterContext` is what the `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.
    // dump the HTML into a template, lots of ways to do this, but none are
    // really influenced by React Router, so we're just using a little
    // function, `renderPage`

    function renderPage() {
      const initialState = store.getState();

      const InitialComponent = (
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      );

      const appHtml = renderToString(InitialComponent)

      return `
        <!doctype html public="storage">
        <html>
        <meta charset=utf-8/>
        <title>Guestbook</title>
        <div id=app>${appHtml}</div>
        <script src="/public/bundle.js"></script>
        <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
       `
    };
    
    res.send(renderPage());
  });
});

var port = (process.env.PORT || 4000);
app.listen(port, function() {
  console.log('Guestbook is listening at', port);
})

