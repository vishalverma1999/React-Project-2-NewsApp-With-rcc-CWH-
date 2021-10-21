import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {

    static defaultProps = {
        country : "in",
        pageSize: 8,
        category: "general"
      }

      static propTypes = {
       country: PropTypes.string,
       pageSize: PropTypes.number,
       category: PropTypes.string
      }

    // Constructor ki madad se hum states concept ko use kar sakte hai
    constructor() {
        super();
        console.log("I am a News Component Constructor");
        // this.state = {date: new Date()};   // This is an example showing syntax of how to use States
        // this.setState({comment: 'Hello'});  // Do Not Modify State Directly Instead, use setState():
        this.state = {
            articles: [],  // jaise humne idhar state ko normally set kiya hai similarly hum this.props ki madad se state set kar sakte hai
            loading: false,
            page: 1
        }
    }

    // componentDidMount() method will run after render() method completes....baaki baad mein samjhenge
    // since ab hum fetch kar rahe hai api se data isliye isliye aritcles json k hata denge... we use async await concept to fetch api
    // pageSize and page are parameters provided by the news API to manipulate the fetch data we are requesting from API
    // pageSize-->The number of results to return per page (request). 20 is the default, 100 is the maximum.
    // page-->Use this to page through the results if the total results found is greater than the page size.
    async componentDidMount() {
        console.log("I am componentDidMount");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7aa5f77618b7445bbc4bcf7585201cfe&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ 
            articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading:false
         });
    }

    handlePrevClick = async () => {
        console.log("i am inside prevclick");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7aa5f77618b7445bbc4bcf7585201cfe&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        })
    }

    handleNextClick = async () => {
        console.log("i am inside nextclick");
        // if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){
        // INSTEAD of writting if else logic mene next button ko hi disabled kar diya by providing the same logic we provided in if parenthesis 
        // }
        // else{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7aa5f77618b7445bbc4bcf7585201cfe&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page + 1,
            loading: false
        })
        // }
    }

    render() {
        console.log("I am render() method");
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{margin: "35px 0px"}}>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner/>}  {/*saying-->agar this.state.loading true hai to spimmer component chalao warna nahi */}
                {/* maps is an higher order array method and expects a return value from arrow function technically array-callback-return. Also map ke through iterate karne ke liye ek unique key value deni padti hai to each element you iterate through */}

                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => { // jab tak loader true hone ke baad wapas se dalse nahi hi jata tan tak && ke baad waali cheez mat chalao
                        //   console.log(element.title);
                        // we are returning  div each time map iterate through an element
                        return (<div className="col md-4" key={element.url} >
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>)

                    })}
                </div>

                <div className="container d-flex justify-content-between">
                    {/* Adding previous and next Buttons */}
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} class="btn btn-dark">&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
