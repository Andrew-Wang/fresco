import React, {Component} from 'react';
import Pstyles from './page/Pstyles';
import Pstyle from './page/Pstyle';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import './App.css';

import {Provider} from 'react-redux';

import Store from './Store';

export default class App extends Component {
   render (){
      return (
         <Provider store={Store}>
            <Router>
               <Switch>
                  <Route exact path="/" component={Pstyles}/>
                  <Route path="/style/:id" component={Pstyle}/>
                  <Route path="/add" component={Pstyles}/>
               </Switch>
            </Router>
         </Provider>
      );
   }
}