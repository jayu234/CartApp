import React from 'react'

const Spinner = ({width, height})=>{
    return (
        <div className="text-center">
            <img src={"./loading.gif"} alt="loading gif" width={width} height={height}/>
        </div>
    )
}

export default Spinner;