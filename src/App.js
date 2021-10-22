import './App.css';
import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  const pageSize = 8;
  const apiKey = process.env.REACT_APP_NEWS_API; // .env.local file se access

  const [progress, setprogress] = useState(10)
  
  const setProgress = (progress)=>{   
     setprogress(progress);
  }

    return (
      <div>
        {/* Ek problem occur ho rahi ki jab hum links par click kar rahe hai like sports etc. to content update nahi ho raha hai us corresponding category rather hume home category ka hi content dikha raha hai....to is problem ko solve karne ke liye hume forcefully remount(wapas se change karna hai) karna padega News component each time we want to navigate from one category to another...Remount karne ke liye exact keyword lagao aur Har category ke News component ko ek UNIQUE key provide karo...Kewal exact keyword lagane componenet abhi bhi remount nahi hoga par jaise maanlo aap sports se health par gaye aur fir reload kiya to health category waala content aa jayega, par aisa behaviour aapko exact keyword use karne ke pehle nahi dikhega*/}
        <Router>
        <Navbar />
        <LoadingBar
        height = {3}
        color='#f11946'
        progress={progress}
      />
        <Switch>
        <Route exact path="/">
          <News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />
          </Route>
          <Route exact path="/general">
          <News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />
          </Route>
          <Route exact path="/business">
          <News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" />
          </Route>
          <Route exact path="/entertainment">
          <News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />
          </Route>
          <Route exact path="/health">
          <News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" />
          </Route>
          <Route exact path="/science">
          <News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />
          </Route>
          <Route exact path="/sports">
          <News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />
          </Route>
          <Route exact path="/technology">
          <News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />
          </Route>
        </Switch>
        </Router>
      </div>
    )
}

export default App;