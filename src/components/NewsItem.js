import React, { Component } from 'react'

export class NewsItem extends Component {

    //1) let variableName - Aise hum class ke andar kisi bhi function mein likh sakte hai(for ex - render() function ke andar par return ke bahar since return is jsx) but not in constructor method
    //2) this.variableName - constructor method ke andar aapko aise likhna padega
    //3) variableName - class ke andar likhna hai par na to  constructor method mein aur nahi kisi function mein

    // Constructor ki madad se hum states concept ko use kar sakte hai....hence hum card(bootstrap componenet) ki state ko set kar sakte hai....filhal hume newsItem componenet mein aisa kuch bhi nahi karna jise hum states ke through use karna chahe
    // constructor(){
    //     super();  //super ka matlab jisse ye aa raha hai(here it is Component) uske constructor ko call kardo....jab hum inheritence karte hai to super() use karte hai....inheritence use karne ke liye we use extends keyword....here hum Component class se NewsItem class mein properties of componenet class ko inherit kar rahe hai 
    //     console.log("I am a NewsItem Component Constructor");  // kyunki 3 NewsItem banaye hai isliye 3 baar run hoga
    // }

    render() {
        let { title, description, imageUrl, newsUrl } = this.props;   // We are using destructuring concept...props mein hum object denge aur us object se title aur description waali keys ko pull karlo 
        return (
            <div className="my-3">
                <div className="card" style={{ width: "18rem"}}>
                    <img src={!imageUrl?"https://images.moneycontrol.com/static-mcnews/2021/10/Google_Pixel-2-770x433.jpg": imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
