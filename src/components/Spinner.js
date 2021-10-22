import React from 'react'
import loader from './loader.gif'

const Spinner = ()=> {

        return (
            <div className="text-center">
                <img className="my-3" src={loader} alt="loader" />   {/*my-3 diya hai taaki spinner footer se naa chipka rahe during infinite scrolling*/}
            </div>
        )
}

export default Spinner
