import React from 'react'

const EmptyQuote = ({itemName}) => {
  return (
    <div className=" d-flex align-items-center justify-content-center p-5">
    <div className="main-sub1">
      <h4>No {itemName} to display</h4>
    </div>
  </div>
  )
}

export default EmptyQuote