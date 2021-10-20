import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
 
    // Constructor ki madad se hum states concept ko use kar sakte hai
    constructor() {
        super();
        console.log("I am a News Component Constructor");
        // this.state = {date: new Date()};   // This is an example showing syntax of how to use States
        // this.setState({comment: 'Hello'});  // Do Not Modify State Directly Instead, use setState():
        this.state = {
            articles : [],  // jaise humne idhar state ko normally set kiya hai similarly hum this.props ki madad se state set kar sakte hai
            loading: false
        }
    }
    
    // componentDidMount() method will run after render() method completes....baaki baad mein samjhenge
    // since ab hum fetch kar rahe hai api se data isliye isliye aritcles json k hata denge... we use async await concept to fetch api
   async componentDidMount(){
        console.log("I am componentDidMount");
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=7aa5f77618b7445bbc4bcf7585201cfe";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles});
    }

    render() {
        console.log("I am render() method");
        return (
            <div className="container my-3">
                <h1>NewsMonkey - Top Headlines</h1>
                {/* maps is an higher order array method and expects a return value from arrow function technically array-callback-return. Also map ke through iterate karne ke liye ek unique key value deni padti hai to each element you iterate through */}
                
                <div className="row">
                {this.state.articles.map((element)=>{
                    //   console.log(element.title);
                    // we are returning  div each time map iterate through an element
                    return (<div className="col md-4" key={element.url} >  
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>)
                    
                })}
                </div>
            </div>
        )
    }
}

export default News
