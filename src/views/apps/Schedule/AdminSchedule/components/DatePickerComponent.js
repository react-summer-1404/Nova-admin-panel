import React from 'react'
import { useState } from 'react'
import { Label } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import { Fragment } from 'react'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const DatePickerComponent = ({setPicker,picker}) => {

  return (
    <div className='w-50'>
  
    <div style={{marginBottom:20}}>
      <Label className='form-label' for='range-picker'>
        بر اساس تاریخ فیلتر کنید
      </Label>
      <Flatpickr
        value={picker}
        id='range-picker'
        className='form-control'
        onChange={date => setPicker(date)}
        options={{
          mode: 'range',
        }}
      />
    </div>
    </div>
    
  )
}

export default DatePickerComponent
