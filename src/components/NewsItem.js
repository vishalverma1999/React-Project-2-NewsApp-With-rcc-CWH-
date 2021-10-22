import React from 'react'

const NewsItem = (props)=> {

        let { title, description, imageUrl, newsUrl, author, date, source } = props;   // We are using destructuring concept...props mein hum object denge aur us object se title aur description waali keys ko pull karlo 
        return (
            <div className="my-3">
                <div className="card">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: 0
                    }} >
                        <span className="badge rounded-pill bg-danger">{source}</span>  {/*start-100--> ye waali bootstrap ki class hatakar left:"90%" add liya hai style mein */}
                    </div>
                    <img src={!imageUrl ? "https://images.moneycontrol.com/static-mcnews/2021/10/Google_Pixel-2-770x433.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
