import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DatePicker from '../DatePicker'
import TimePicker from '../TimePicker'
import _ from 'lodash'

import './index.css'

function DateTimePicker(props) {

  const [showTimePickerPage, setShowTimePickerPage] = useState(false)
  const [enterTimePickerInput, setEnterTimePickerInput] = useState(false)
  const [originDateTime, setOriginDateTime] = useState('')
  const [curTime, setCurTime] = useState('')
  const [curRightTime, setCurRightTime] = useState('')
  const [curDate, setCurDate] = useState('')

  useEffect(() => {
    document.addEventListener('click', gloabalClick)
    return () => {
      document.removeEventListener('click', gloabalClick)
    }
  }, [])

  useEffect(() => {
    setOriginDateTime(props.value)
  }, [props.value])

  useEffect(reSetDateTime, [originDateTime])

  useEffect(() => {
    if(showTimePickerPage && !!props.value) {
      reSetDateTime()
    }
  }, [showTimePickerPage])

  function gloabalClick() {
    setShowTimePickerPage(false)
  }

  function reSetDateTime() {
    let { value, showDateTimeRangePicker } = props
    
    if (!showDateTimeRangePicker && typeof value === 'string' && value.length > 0) {
      let arr = value.split(' ')
      setCurDate(arr[0])
      setCurTime(arr[1])
    }

    if (showDateTimeRangePicker && Array.isArray(value) && value.length === 2) {
      let curDate = []
      let curTime = ''
      let curRightTime = ''
      value.forEach((str, index) => {
        let arr = str.split(' ')
        curDate[index] = arr[0]
        
        if (index === 0) {
          curTime = arr[1]
        } else {
          curRightTime = arr[1]
        }
      })

      setCurDate(curDate)
      setCurTime(curTime)
      setCurRightTime(curRightTime)
    }
  }

  function handleClearValue() {
    setOriginDateTime('')
    setCurTime('')
    setCurDate('')

    props.changeValue('')
  }
  
  function onParentChangeValue() {
    let { showDateTimeRangePicker } = props
    if (!curDate || !curTime) return
    if (showDateTimeRangePicker && (!Array.isArray(curDate) || curDate.length !== 2)) return

    let curDateTime = showDateTimeRangePicker ? [
      `${curDate[0]} ${curTime}`,
      `${curDate[1]} ${curRightTime}`
    ] : `${curDate} ${curTime}`
    
    setOriginDateTime(curDateTime)

    props.changeValue(curDateTime)
  }

  function onSure() {
    onParentChangeValue()
    setShowTimePickerPage(false)
  }

  let {
    placeholder,
    showDateTimeRangePicker
  } = props

  return (
    <div 
      className="comp__date-time-picker__wrap" 
      onClick={e => e.stopPropagation()}
    >
      <div
        style={{ ...(showDateTimeRangePicker ? {width: 333} : {}) }}
        className={showTimePickerPage ? 'comp__date-time-picker__show-time-wrap hover' : 'comp__date-time-picker__show-time-wrap'}
        onClick={() => setShowTimePickerPage(v => !v)}
        onMouseEnter={() => setEnterTimePickerInput(true)}
        onMouseLeave={() => setEnterTimePickerInput(false)}
      >
        {
          !!originDateTime ? (
            showDateTimeRangePicker ? originDateTime.join(' 至 ') : originDateTime
          ) : <span className="comp__date-time-picker__placeholder">{placeholder}</span>
        }
        {
          enterTimePickerInput &&
          originDateTime !== '' &&
          <i
            className="comp__date-time-picker__clear-icon"
            onClick={handleClearValue}
          />
        }
      </div>
      
      {
        showTimePickerPage &&
        <div className="comp__date-time-picker-page-wrap" style={{ width: showDateTimeRangePicker ? 688 : 344 }}>
          {
            showDateTimeRangePicker &&
            <span className="comp__date-time-picker-page__left-date">{!!curDate[0] ? curDate[0] : <span style={{ color: '#757575' }}>请选择日期</span>}</span>
          }
          <DatePicker
            width={144}
            value={curDate}
            fixedDatePickerPage={true}
            disabledDateFun={props.disabledDateFun}
            showDateRangePickePage={showDateTimeRangePicker}
            showDateTimeRangePicker={showDateTimeRangePicker}
            changeValue={setCurDate}
            showClearIcon={true}
          />
          <span style={{ marginLeft: 12 }} />
          <TimePicker
            width={144}
            listWidth={156}
            value={curTime}
            changeValue={setCurTime}
            showClearIcon={false}
          />

          {
            showDateTimeRangePicker &&
            <>
              <span className="comp__date-time-picker-page__right-date">{!!curDate[1] ? curDate[1] : <span style={{ color: '#757575' }}>请选择日期</span>}</span>
              <span style={{ marginLeft: 12 }} />
              <TimePicker
                width={144}
                listWidth={156}
                value={curRightTime}
                changeValue={setCurRightTime}
                showClearIcon={false}
              />
            </>
          }

          <div className="comp__date-time-picker-page__footer">
            <span 
              className="right"
              onClick={onSure}
            >确定</span>
          </div>
        </div>
      }
    </div>
  )
}

DateTimePicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  placeholder: PropTypes.string,
  changeValue: PropTypes.func,
  showDateTimeRangePicker: PropTypes.bool,
  disabledDateFun: PropTypes.func
}

DateTimePicker.defaultProps = {
  placeholder: '请选择',
  showDateTimeRangePicker: false,
  changeValue: _.noop,
  disabledDateFun: _.noop
}

export default DateTimePicker