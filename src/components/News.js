import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitaliseFirstLetter = (title) => {
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    // Constructor ki madad se hum states concept ko use kar sakte hai
    constructor(props) {
        super(props);
        console.log("I am a News Component Constructor");
        // this.state = {date: new Date()};   // This is an example showing syntax of how to use States
        // this.setState({comment: 'Hello'});  // Do Not Modify State Directly Instead, use setState():
        this.state = {
            articles: [],  // jaise humne idhar state ko normally set kiya hai similarly hum this.props ki madad se state set kar sakte hai
            // loading: false,
            loading: true,   //infinite scrolling lagane ke baad reload karne par spinner nahi dikh raha hai isliye true kiya  
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitaliseFirstLetter(this.props.category)} - NewsMonkey`;  //We need to pass the props in constructor to use them here
    }


    // async updateNews(){
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eae5ffbbec1448a7bcfcb887ccdf39c6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading: true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);
    //     this.setState({ 
    //         articles: parsedData.articles, 
    //         totalResults: parsedData.totalResults,
    //         loading:false
    //      });
    // }

    // componentDidMount() method will run after render() method completes....baaki baad mein samjhenge
    // since ab hum fetch kar rahe hai api se data isliye isliye aritcles json k hata denge... we use async await concept to fetch api
    // pageSize and page are parameters provided by the news API to manipulate the fetch data we are requesting from API
    // pageSize-->The number of results to return per page (request). 20 is the default, 100 is the maximum.
    // page-->Use this to page through the results if the total results found is greater than the page size.
    async componentDidMount() {
        this.props.setProgress(10);
        console.log("I am componentDidMount");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=183ab7b6e9934ec5b3df7ea63e04fe2a&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false    
        }); 
        this.props.setProgress(100);  
        // Here we are refactoring code(removing duplicacy of code, cleaning n all)
        // this.updateNews();
    }

    handlePrevClick = async () => {
        //     console.log("i am inside prevclick");
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eae5ffbbec1448a7bcfcb887ccdf39c6&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log(parsedData);
        //     this.setState({
        //         articles: parsedData.articles,
        //         page: this.state.page - 1,
        //         loading: false
        //     })
        //     // Here we are refactoring code(removing duplicacy of code, cleaning n all)
        //     // this.setState({page: this.state.page-1});
        //     // this.updateNews();
    }

    handleNextClick = async () => {
        //     console.log("i am inside nextclick");
        //     // if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){
        //     // INSTEAD of writting if else logic mene next button ko hi disabled kar diya by providing the same logic we provided in if parenthesis 
        //     // }
        //     // else{
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eae5ffbbec1448a7bcfcb887ccdf39c6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log(parsedData);
        //     this.setState({
        //         articles: parsedData.articles,
        //         page: this.state.page + 1,
        //         loading: false
        //     })
        //     // }
        //     // Here we are refactoring code(removing duplicacy of code, cleaning n all)
        //     // this.setState({page: this.state.page+1});
        //     // this.updateNews();
    }

    // kyunki ab humne infinite scrolll baar laga diya hai isliye prev, next buttons aur unke corresponding functions ki jarurat nahi hai that's why commented
    // website ke chalne ka order hai--> News constructor-->render()-->componentDidMount-->render()....matlab sabse pehle componentDidMount ke through page 1 aajayega uske baad fetchMoreData handle karega aage ke pages ko

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });  // isko upar likhna padega kyunki 1st page to componentDidMount se aayega fir uske baad ke pages yaha se aayenge
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=183ab7b6e9934ec5b3df7ea63e04fe2a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });    // ye comment out kiya hai kyunki ab infinite scroll ka andar jo loader/spinner hai wo chalega 
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        });
    };

    render() {

        console.log("I am render() method");
        return (
            <>
                <h1 className="text-center" style={{ margin: "35px 0px" }}>NewsMonkey - Top {this.capitaliseFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner/>}  
                {/*saying-->agar this.state.loading true hai to spinner component chalao warna nahi */}
                {/* maps is an higher order array method and expects a return value from arrow function technically array-callback-return. Also map ke through iterate karne ke liye ek unique key value deni padti hai to each element you iterate through */}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}   // pehli dafa componentDidMount se data aane ke baad data fetchMoreData se laana hai 
                    hasMore={this.state.articles.length !== this.state.totalResults}     // kya aur data laaan hai, jab tak hasMore true hai tab tak data aayega uske baad nahi
                    loader={<Spinner />}    // loading ke time kya dikhana hai
                >

                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => { // jab tak loader true hone ke baad wapas se dalse nahi hi jata tan tak && ke baad waali cheez mat chalao
                                //   console.log(element.title);
                                // we are returning  div each time map iterate through an element
                                return (<div className="col-md-4" key={element.url} >
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>)

                            })}
                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between"> */}
                {/* Adding previous and next Buttons */}
                {/* <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div> */}

            </>
        )
    }
}

export default News
