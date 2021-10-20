import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = [
        {
        "source": {
        "id": "bbc-sport",
        "name": "BBC Sport"
        },
        "author": "BBC Sport",
        "title": "Australia pace bowler Pattinson retires",
        "description": "Australia fast bowler James Pattinson retires from international cricket after deciding he is not able to push for an Ashes place.",
        "url": "http://www.bbc.co.uk/sport/cricket/58980308",
        "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/A464/production/_121148024_pattinson_getty.jpg",
        "publishedAt": "2021-10-20T10:22:23.4918351Z",
        "content": "James Pattinson took 81 wickets in 21 Test appearances for Australia\r\nAustralia fast bowler James Pattinson has retired from international cricket after deciding he is not ready to push for Ashes sel… [+1439 chars]"
        },
        {
        "source": {
        "id": "google-news-in",
        "name": "Google News (India)"
        },
        "author": "HT Correspondent",
        "title": "Former Goa deputy CM Dayanand Narvekar joins Aam Aadmi Party",
        "description": "Narvekar was accused of misusing his position as the Goa Cricket Association chairman in 2002 to print and sell fake tickets for an India-Australia one day international match | Latest News India",
        "url": "https://www.hindustantimes.com/india-news/former-goa-deputy-cm-joins-aap-101634724860672.html",
        "urlToImage": "https://images.hindustantimes.com/img/2021/10/20/1600x900/80ea3cb8-318a-11ec-901b-e0eb6ffe225f_1634724859678.jpg",
        "publishedAt": "2021-10-20T10:14:20+00:00",
        "content": "Former Goa deputy chief minister Dayanand Narvekar on Wednesday joined the Aam Aadmi Party (AAP) ahead of the assembly elections early next year even as his induction brought focus to his past, which… [+1771 chars]"
        },
        {
        "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
        },
        "author": null,
        "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
        "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
        "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
        "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
        "publishedAt": "2020-04-27T11:41:47Z",
        "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
        "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
        },
        "author": null,
        "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
        "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
        "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
        "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
        "publishedAt": "2020-03-30T15:26:05Z",
        "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
        ]
    // Constructor ki madad se hum states concept ko use kar sakte hai
    constructor() {
        super();
        console.log("I am a News Component Constructor");
        // this.state = {date: new Date()};   // This is an example showing syntax of how to use States
        // this.setState({comment: 'Hello'});  // Do Not Modify State Directly Instead, use setState():
        this.state = {
            articles : this.articles,  // jaise humne idhar state ko normally set kiya hai similarly hum this.props ki madad se state set kar sakte hai
            loading: false
        }
    }
    render() {
        return (
            <div className="container my-3">
                <h2>NewsMonkey - Top Headlines</h2>
                {/* maps is an higher order array method and expects a return value from arrow function technically array-callback-return. Also map ke through iterate karne ke liye ek unique key value deni padti hai to each element you iterate through */}
                
                <div className="row">
                {this.state.articles.map((element)=>{
                    //   console.log(element.title);
                    // we are returning  div each time map iterate through an element
                    return (<div className="col md-4" key={element.url} >  
                        <NewsItem title={element.title.slice(0,31)} description={element.description.slice(0,88)} imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>)
                    
                })}
                </div>
            </div>
        )
    }
}

export default News
