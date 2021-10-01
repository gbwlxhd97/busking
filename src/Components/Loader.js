import React from "react";
import "./style/Loader.css"


const Loader = () => {
    return(
        <div className="loading-conatiner">
            <span>
                <img alt="loading" src="assets/loading.gif" />
            </span>
        </div>
    )
}

export default Loader;