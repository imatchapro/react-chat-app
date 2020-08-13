import React from 'react';
import {Provider} from 'react-redux'
import {store} from './store'
import {BrowserRouter, Switch, Route} from "react-router-dom";

// Authentication Components
import AuthContextProvider from "./helpers/AuthContextProvider";
import AuthPage from "./helpers/AuthPage";

// Page Components
import Index from "./components/pages/Index";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";

const App: React.FC = () => (
  <Provider store={store}>
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <AuthPage>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/:userId" component={Profile} />
            </Switch>
          </AuthPage>
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  </Provider>
);

export default App;
