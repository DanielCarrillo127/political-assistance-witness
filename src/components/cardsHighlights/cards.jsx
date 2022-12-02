import React from 'react'
import "./cards.css"

const Cards = (props) => {
  return (
    <>
      <div className="card__single">
          <div>
            <h1>{props.number}</h1>
            <span>{props.title}</span>
          </div>
          <div className='icon'>
            {props.icon}
          </div>
        </div>
    </>
  )
}

export default Cards