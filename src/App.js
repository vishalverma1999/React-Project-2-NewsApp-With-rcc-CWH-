import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 8;
  state = {    // state ek object hai
      progress: 10     // it can vary from 0 to 100
  }

  setProgress = (progress)=>{   //remember setProgres ko arrow function banana tabhi this. karke aap state objects ki properties ko acces karpoage...iska reason wahi hai ki normal function mein this apna bond karta hai par arrow function ka this binds to nearest parent function
     this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        {/* Ek problem occur ho rahi ki jab hum links par click kar rahe hai like sports etc. to content update nahi ho raha hai us corresponding category rather hume home category ka hi content dikha raha hai....to is problem ko solve karne ke liye hume forcefully remount(wapas se change karna hai) karna padega News component each time we want to navigate from one category to another...Remount karne ke liye exact keyword lagao aur Har category ke News component ko ek UNIQUE key provide karo...Kewal exact keyword lagane componenet abhi bhi remount nahi hoga par jaise maanlo aap sports se health par gaye aur fir reload kiya to health category waala content aa jayega, par aisa behaviour aapko exact keyword use karne ke pehle nahi dikhega*/}
        <Router>
        <Navbar />
        <LoadingBar
        height = {3}
        color='#f11946'
        progress={this.state.progress}
      />
        <Switch>
        <Route exact path="/">
          <News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />
          </Route>
          <Route exact path="/general">
          <News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />
          </Route>
          <Route exact path="/business">
          <News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" />
          </Route>
          <Route exact path="/entertainment">
          <News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />
          </Route>
          <Route exact path="/health">
          <News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" />
          </Route>
          <Route exact path="/science">
          <News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" />
          </Route>
          <Route exact path="/sports">
          <News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" />
          </Route>
          <Route exact path="/technology">
          <News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" />
          </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}
