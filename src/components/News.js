import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0);

    const capitaliseFirstLetter = (title) => {
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    
    // const updateNews = async ()=>{
        //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eae5ffbbec1448a7bcfcb887ccdf39c6&page=${page}&pageSize=${props.pageSize}`;
        // setloading(true);
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log(parsedData);
        // setarticles(parsedData.articles);
        // settotalResults(parsedData.totalResults);
        // setloading(false)
        // }
        
        
        // since ab hum fetch kar rahe hai api se data isliye isliye aritcles samplejson ko hata denge... we use async await concept to fetch api
        // pageSize and page are parameters provided by the news API to manipulate the fetch data we are requesting from API
        // pageSize-->The number of results to return per page (request). 20 is the default, 100 is the maximum.
    // page-->Use this to page through the results if the total results found is greater than the page size.
    
    // useEffect is replacable with componenetDidMount,componenetDidUpdate,componenetWillUnmount in function based components
    useEffect(async () => {     // either use async here or the one commented below both are workimg fine...also agar updateNews waale function ko use karoge to useEffect mein bas updateNews ko call karna padega
        // (async ()=>{
            document.title = `${capitaliseFirstLetter(props.category)} - NewsMonkey`;
            props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
        setloading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        console.log(parsedData);
        setarticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setloading(false);
        props.setProgress(100);
        // Here we are refactoring code(removing duplicacy of code, cleaning n all)
        // updateNews();
        // }) ()
    }, [])

    // const handlePrevClick = async () => {
        //     console.log("i am inside prevclick");
        //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pageSize=${props.pageSize}`;
        //   setloading(true);
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log(parsedData);
        // setarticles(parsedData.articles);
        // setpage(page-1);
        // setloading(false);
        //     // Here we are refactoring code(removing duplicacy of code, cleaning n all)
        //     // setpage(page-1);
        //     // updateNews();
    // }

    // const handleNextClick = async () => {
        //     console.log("i am inside nextclick");
        //     // if(page+1 > Math.ceil(totalResults/20)){
        //     // INSTEAD of writting if else logic mene next button ko hi disabled kar diya by providing the same logic we provided in if parenthesis 
        //     // }
        //     // else{
        //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        //    setloading(true);
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log(parsedData);
        // setarticles(parsedData.articles);
        // setpage(page+1);
        // setloading(false);
        //     // }
        //     // Here we are refactoring code(removing duplicacy of code, cleaning n all)
        //     // setpage(page+1);
        //     // updateNews();
    // }

    // kyunki ab humne infinite scroll baar laga diya hai isliye prev, next buttons aur unke corresponding functions ki jarurat nahi hai that's why commented
    // website ke chalne ka order hai--> News constructor-->render()-->componentDidMount-->render()....matlab sabse pehle componentDidMount ke through page 1 aajayega uske baad fetchMoreData handle karega aage ke pages ko

    const fetchMoreData = async () => {
        // setpage(page + 1);  // isko upar likhna padega kyunki 1st page to componentDidMount se aayega fir uske baad ke pages yaha se aayenge
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`; //kyunki page to update karna hai bhale he setpage baad mein chal raha ho...iske liye hume manually 1 add karna padega in page
        //  setloading(true);    // ye comment out kiya hai kyunki ab infinite scroll ka andar jo loader/spinner hai wo chalega 
        setpage(page + 1);  // isko upar ki jagah yaha likhna padega kyunki setpage function kuch time le raha hai to set the page aur kyunki ye asynchronously chal raha hai to tab tak url resolve ho ja raha hai aur isliye hi har baar pehle batch(pageSize) ka content repeat ho raha tha...Yahi same problem class ke time bhi aayi thi jab hum prev and next button ka istemaal kar rahe the
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setarticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
    };

        return (
            <>
                <h1 className="text-center" style={{ margin: "35px 0px" }}>NewsMonkey - Top {capitaliseFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                {/*saying-->agar loading true hai to spinner component chalao warna nahi */}
                {/* maps is an higher order array method and expects a return value from arrow function technically array-callback-return. Also map ke through iterate karne ke liye ek unique key value deni padti hai to each element you iterate through */}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}   // pehli dafa componentDidMount se data aane ke baad data fetchMoreData se laana hai 
                    hasMore={articles.length !== totalResults}     // kya aur data laaan hai, jab tak hasMore true hai tab tak data aayega uske baad nahi
                    loader=  {<Spinner />}    // loading ke time kya dikhana hai
                >

                    <div className="container">
                        <div className="row">
                            {articles.map((element) => { // jab tak loader true hone ke baad wapas se dalse nahi hi jata tan tak && ke baad waali cheez mat chalao
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
                {/* <button disabled={page <= 1} type="button" onClick={handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" onClick={handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div> */}

            </>
        )
}

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
