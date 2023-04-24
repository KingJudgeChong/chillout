import React from 'react'
import Category from './Filters/Category'
import Section from './Filters/Section'
import Interest from './Filters/Interest'
import Location from './Filters/Location'
import FindPost from './Filters/FindPost'
const Filters = () => {
  return (
    <div className="bg-transparent flex text-sm mt-32 mb-3 max-w-4xl">
        <Category/>
        <Section/>
        <Interest/>
        <Location/>
        <FindPost/>
    </div>
  )
}

export default Filters