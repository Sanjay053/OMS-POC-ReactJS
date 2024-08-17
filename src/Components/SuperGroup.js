import React from 'react'
import GetThings from './ProductGroup'

function ProductGroup() {
  return (
    <div className='container border border-secondary p-0'>
      <header className='bg-secondary text-white d-flex justify-content-start align-items-start px-4'>
        <h4 className=''> Offer Type Details </h4> 
      </header>
      <div className='d-flex flex-column justify-content-start p-4'>
        <div className='col-1 text-start'>
        <label className='' form='type'>Type</label>
        </div>
        <select id='type' className='col-3'>
          <option>Item Discount</option>
        </select>
      </div>
      <GetThings />
    </div>
  )
}

export default ProductGroup
