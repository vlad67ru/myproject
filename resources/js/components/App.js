import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Header from './Header';
import Targets from './Targets';
import Add from './Add';
import Edit from './Edit';
import Error404 from './Error404';


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={Targets}/>
                        <Route path="/add" exact component={Add}/>
                        <Route path="/edit/:id" exact render={p => <Edit{...p}/>}/>
                        <Route component={Error404}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}