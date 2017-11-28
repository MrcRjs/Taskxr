require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import TaskGraph from './Taskr'
import Scheduler from '../util/Scheduler';
import schConfig from '../util/example5';

class Navbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  defaultProps = {
    brand: 'Title',
    color: 'default'
  }

  render() {
    return <nav className={'navbar navbar-'+this.props.color}>
    <div className="container-fluid">
    <div className="navbar-header">
    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
    <span className="sr-only">Toggle navigation</span>
    <span className="icon-bar"></span>
    <span className="icon-bar"></span>
    <span className="icon-bar"></span>
    </button>
    <a className="navbar-brand" href="#">{ this.props.brand }</a>
    </div>
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul className="nav navbar-nav">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    </ul>
    </div>
    </div>
    </nav>
  }
}

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  defaultProps = {
    brand: 'La Terminal, Inc.',
    year: 2017
  }

  render() {
    return <footer className="footer">
    <div className="container">
    <p className="text-muted text-footer">&copy; { this.props.year } { this.props.brand }</p>
    </div>
    </footer>
  }
}


class AppComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'home'
    };
  }

  render() {
    const SCH = new Scheduler(schConfig);
    SCH.schedule();
    const schResults = SCH.getChannelsTaskExes();
    const executedTasks = SCH.getTasks();
    const totalTime = SCH.getTime();
    console.log(schResults)
    return <div >
    <Navbar
    brand="Taskxr"
    activePage={ this.state.currentPage }
    color="inverse"
    />
    <br />
    <div className="container">
    <div className="row">
    <div className="col-sm-12 col-md-8 col-md-offset-2">
    <h1>Task Manager</h1>
    <div>
    <TaskGraph tasks={executedTasks} results={schResults} totalTime={totalTime}/>
    </div>
    </div>
    </div>
    <div className="row">
    <div className="col-md-8 col-md-offset-2">
    </div>
    </div>
    </div>
    <Footer brand="Made with 🍻 by Marco A. Rojas"/>
    </div>
  }
}


export default AppComponent;
