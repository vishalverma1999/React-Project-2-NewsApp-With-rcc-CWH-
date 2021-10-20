import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description } = this.props;   // We are using destructuring concept...props mein hum object denge aur us object se title aur description waali keys ko pull karlo 
        return (
            <div>
                <div className="card" style={{width: "18rem"}}>
                    <img src="https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/A464/production/_121148024_pattinson_getty.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href="/takingtonowhere" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
