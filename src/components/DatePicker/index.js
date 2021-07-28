import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { getAllDays } from './formatAllDays'

import './index.css'

function DatePicker(props) {

  const [dateValue, setDateValue] = useState([])
  const [showDatePickePage, setShowDatePickePage] = useState(false)
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const [showYearBtn, setShowYearBtn] = useState(false)
  const [showMonthBtn, setShowMonthBtn] = useState(false)
  const [beforeYear, setBeforeYear] = useState('')
  const [dataRange, setDataRange] = useState([])
  const [hideClearIcon, setHideClearIcon] = useState(true)

  useEffect(() => {
    document.addEventListener('click', gloabalClick)
    return () => {
      document.removeEventListener('click', gloabalClick)
    }
  }, [])

  function gloabalClick() {
    setShowDatePickePage(false)
  }

  useEffect(() => {
    let { value, showDateRangePickePage } = props
    if (showDateRangePickePage && Array.isArray(value)) {
      let minVal = value[0] || null
      let maxVal = value[1] || null

      if (minVal && typeof minVal === 'string' && maxVal && typeof maxVal === 'string') {
        let list = maxVal.split('-')

        setYear(list[1] == 1 ? list[0] - 1 : +list[0])
        setMonth((list[1] - 2 + 12) % 12)
        setDataRange([
          minVal.split('-'),
          list
        ])
      }
      
    } else {
      let arr = typeof value === 'string' ? value.split('-') : []
      if (arr.length && arr.length === 3) {
        setYear(arr[0])
        setMonth(arr[1] - 1)
        setDateValue(arr)
      }
    }
  }, [props.value])

  function onYearClick() {
    let beforeYear = year - year % 10
    setBeforeYear(beforeYear)
    setShowYearBtn(true)
    setShowMonthBtn(false)
  }

  function onMonthClick() {
    setBeforeYear(year)
    setShowYearBtn(false)
    setShowMonthBtn(true)
  }

  function handleClickDateItem(disabled, showDateRangePickePage, dataRange, day) {
    if (disabled) return

    if (showDateRangePickePage) {
      let arr = dataRange.length > 1 ? [] : [...dataRange]

      // 特殊处理：如果先选大日期，后选小日期，小日期置前
      if (arr.length === 1 && new Date(arr[0]) > new Date(day.value)) {
        arr.unshift(day.value)
      } else {
        arr.push(day.value)
      }

      setYear(+arr[0][0])
      setMonth(Number(arr[0][1]) - 1)
      setDataRange(arr)
      setShowDatePickePage(arr.length !== 2)

      if (arr.length === 2) {
        let rangeValues = arr.map(date => date.join('-'))
        props.changeValue(rangeValues)
      }

    } else {
      setYear(+day.value[0])
      setMonth(+day.value[1] - 1)
      setDateValue(day.value)
      setShowDatePickePage(false)

      props.changeValue(day.value.join('-'))
    }
  }

  function onClearDateValue() {
    setDateValue([])
    setDataRange([])

    props.changeValue('')
  }


  let {
    placeholder,
    showDateRangePickePage,
    showClearIcon,
    width,
    showDateTimeRangePicker
  } = props

  let allDays = []

  let rightAllDays = []
  if (showDateRangePickePage) {
    allDays = getAllDays(year, month, dataRange, showDateRangePickePage)
    rightAllDays = getAllDays((month == 11 ? year + 1 : year), (month + 1) % 12, dataRange, showDateRangePickePage)
  } else {
    allDays = getAllDays(year, month, [dateValue], showDateRangePickePage)
  }
  // console.log('allDays: ', allDays)

  let tenYearList = []
  for (let i = 0; i < 10; i++) {
    tenYearList[i] = beforeYear + i
  }

  let dateInputValue = ''
  if (showDateRangePickePage) {
    dateInputValue = dataRange.length === 2 ? `${dataRange[0].join('-')} 至 ${dataRange[1].join('-')}` : ''
  } else {
    dateInputValue = dateValue.join('-')
  }

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block', verticalAlign: 'middle', ...(!!width ? {width: width + 18} : {}) }}
      onClick={e => e.stopPropagation()}
    >
      {
        !showDateTimeRangePicker &&
        <div
          className="comp__date-picker__input-wrap"
          style={{ ...(!!width ? {width: width} : {}) }}
          onMouseEnter={() => setHideClearIcon(false)}
          onMouseLeave={() => setHideClearIcon(true)}
        >
          <input
            className={showDatePickePage ? 'comp__date-picker__input light-color' : 'comp__date-picker__input'}
            readOnly={true}
            style={{ ...(!!width ? {width: width} : {}) }}
            value={dateInputValue}
            placeholder={placeholder}
            onClick={() => setShowDatePickePage(v => !v)}
          />
          {
            showClearIcon &&
            !hideClearIcon &&
            <i 
              className="comp__date-picker__input-clear-icon"
              onClick={onClearDateValue}
            ></i>
          }
        </div>
      }
      {
        (showDatePickePage || props.fixedDatePickerPage) &&
        <div className="comp__date-picker__date-page-wrap" style={{
          width: !showDateRangePickePage || (showYearBtn || showMonthBtn || !showDateRangePickePage) ? 346 : 686,
          top: showDateTimeRangePicker ? 40 : 56
        }}>
          <div className="comp__date-picker__date-range-wrap">
            <div className="comp__date-picker__date-range-title">
              <span 
                className="comp__date-picker__date-range-btn left-year-btn"
                onClick={() => {
                  setYear(--year)
                  setBeforeYear(beforeYear - 10)
                }}
              ></span>
              {
                !showYearBtn &&
                !showMonthBtn &&
                <span 
                  className="comp__date-picker__date-range-btn left-month-btn"
                  onClick={() => {
                    let sholdYearDown = month - 1 === -1
                    setMonth(sholdYearDown ? 11 : --month)
                    setYear(sholdYearDown ? --year : year)
                  }}
                ></span>
              }
              <span className={(showYearBtn || showMonthBtn) ? 'comp__date-picker__date-range-year' : 'comp__date-picker__date-range-year-month'}>
                {
                  showYearBtn &&
                  <span>{`${beforeYear}年-${beforeYear + 9}年`}</span>
                }
                {
                  showMonthBtn &&
                  <span onClick={onYearClick}>{`${year}年`}</span>
                }
                {
                  !showYearBtn &&
                  !showMonthBtn &&
                  <>
                    <span onClick={onYearClick}>{`${year}年`}</span>
                    <span onClick={onMonthClick} style={{ marginLeft: 8 }}>{`${month + 1}月`}</span>
                  </>
                }
              </span>
              {
                !showYearBtn &&
                !showMonthBtn &&
                !showDateRangePickePage &&
                <span 
                  className="comp__date-picker__date-range-btn right-month-btn"
                  onClick={() => {
                    let sholdYearUp = month + 1 === 12
                    setMonth(sholdYearUp ? 0 : ++month)
                    setYear(sholdYearUp? ++year : year)
                  }}
                ></span>
              }
              {
                (showYearBtn || showMonthBtn || !showDateRangePickePage) &&
                <span
                  className="comp__date-picker__date-range-btn right-year-btn"
                  onClick={() => {
                    setYear(++year)
                    setBeforeYear(beforeYear + 10)
                  }}
                ></span>
              }
            </div>
            {
              !showYearBtn &&
              !showMonthBtn &&
              <div className="comp__date-picker__date-range-week">
                <span>日</span>
                <span>一</span>
                <span>二</span>
                <span>三</span>
                <span>四</span>
                <span>五</span>
                <span>六</span>
              </div>
            }
            {
              !showYearBtn &&
              !showMonthBtn &&
              [0,7,14,21,28,35].map(key => (
                <div key={key} className="comp__date-picker__date-range-day">
                  {
                    allDays.slice(key,key + 7).map((day, index) => {
                      let disabled = props.disabledDateFun(new Date(day.value[0],+day.value[1] - 1,day.value[2]))

                      let dayColorClass = day.colorClass
                      if (disabled) {
                        dayColorClass += ` disabled`
                      }

                      return (
                        <span
                          key={index}
                          className={`${dayColorClass} comp__date-picker__date-range-day-btn-wrap`}
                        >
                          <span
                            className={`${dayColorClass} comp__date-picker__date-range-day-btn`}
                            onClick={() => handleClickDateItem(disabled, showDateRangePickePage, dataRange, day)}
                          >{day.num}</span>
                        </span>
                      )
                    })
                  }
                </div>
              ))
            }
            {
              showYearBtn &&
              <div className="comp__date-picker__ten-years-wrap">
                {
                  tenYearList.map((year, index) => (
                    <span 
                      key={year}
                      className="comp__date-picker__ten-years-item"
                      onClick={() => {
                        setYear(year)
                        setShowYearBtn(false)
                        setShowMonthBtn(true)
                      }}
                    >{year}</span>
                  ))
                }
              </div>
            }
            {
              showMonthBtn &&
              <div className="comp__date-picker__ten-years-wrap">
                {
                  [1,2,3,4,5,6,7,8,9,10,11,12].map((month, index) => (
                    <span 
                      key={month}
                      className="comp__date-picker__ten-years-item"
                      onClick={() => {
                        setMonth(month - 1)
                        setShowMonthBtn(false)
                      }}
                    >{month + '月'}</span>
                  ))
                }
              </div>
            }
          </div>
          {
            showDateRangePickePage &&
            !(showYearBtn || showMonthBtn || !showDateRangePickePage) &&
            <div className="comp__date-picker__date-range-wrap second">
              <div className="comp__date-picker__date-range-title left-year-btn">
                {
                  !showDateRangePickePage &&
                  <span 
                    className="comp__date-picker__date-range-btn"
                    onClick={() => {
                      setYear(--year)
                      setBeforeYear(beforeYear - 10)
                    }}
                  ></span>
                }
                {
                  !showYearBtn &&
                  !showMonthBtn &&
                  !showDateRangePickePage &&
                  <span 
                    className="comp__date-picker__date-range-btn left-month-btn"
                    onClick={() => {
                      let sholdYearDown = month - 1 === -1
                      setMonth(sholdYearDown ? 11 : --month)
                      setYear(sholdYearDown ? --year : year)
                    }}
                  ></span>
                }
                <span 
                  className={(showYearBtn || showMonthBtn) ? 'comp__date-picker__date-range-year' : 'comp__date-picker__date-range-year-month'}
                  style={{
                    marginLeft: 62,
                    width: 190
                  }}
                >
                  {
                    !showYearBtn &&
                    !showMonthBtn &&
                    <>
                      <span onClick={onYearClick}>{`${month == 11 ? year + 1 : year}年`}</span>
                      <span onClick={onMonthClick} style={{ marginLeft: 8 }}>{`${(month + 1) % 12 + 1}月`}</span>
                    </>
                  }
                </span>
                {
                  !showYearBtn &&
                  !showMonthBtn &&
                  <span 
                    className="comp__date-picker__date-range-btn right-month-btn"
                    onClick={() => {
                      let sholdYearUp = month + 1 === 12
                      setMonth(sholdYearUp ? 0 : ++month)
                      setYear(sholdYearUp? ++year : year)
                    }}
                  ></span>
                }
                {
                  !showYearBtn &&
                  !showMonthBtn &&
                  <span
                    className="comp__date-picker__date-range-btn right-year-btn"
                    onClick={() => {
                      setYear(++year)
                      setBeforeYear(beforeYear + 10)
                    }}
                  ></span>
                }
              </div>
              {
                !showYearBtn &&
                !showMonthBtn &&
                <div className="comp__date-picker__date-range-week">
                  <span>日</span>
                  <span>一</span>
                  <span>二</span>
                  <span>三</span>
                  <span>四</span>
                  <span>五</span>
                  <span>六</span>
                </div>
              }
              {
                !showYearBtn &&
                !showMonthBtn &&
                [0,7,14,21,28,35].map(key => (
                  <div key={key} className="comp__date-picker__date-range-day">
                    {
                      rightAllDays.slice(key,key + 7).map((day, index) => {
                        let disabled = props.disabledDateFun(new Date(day.value[0],+day.value[1] - 1,day.value[2]))

                        let dayColorClass = day.colorClass
                        if (disabled) {
                          dayColorClass += ` disabled`
                        }

                        return (
                          <span
                            key={index}
                            className={`${dayColorClass} comp__date-picker__date-range-day-btn-wrap`}
                          >
                            <span
                              className={`${dayColorClass} comp__date-picker__date-range-day-btn`}
                              onClick={() => handleClickDateItem(disabled, showDateRangePickePage, dataRange, day)}
                            >{day.num}</span>
                          </span>
                        )
                      })
                    }
                  </div>
                ))
              }
            </div>
          }
        </div>
      }
    </div>
  )
}

DatePicker.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  changeValue: PropTypes.func,
  disabledDateFun: PropTypes.func,
  showDateRangePickePage: PropTypes.bool, // 是否是选择日期范围
  showClearIcon: PropTypes.bool,
  width: PropTypes.number,
  fixedDatePickerPage: PropTypes.bool,
  showDateTimeRangePicker: PropTypes.bool,
}

DatePicker.defaultProps = {
  placeholder: '请选择日期',
  showDateRangePickePage: false,
  showClearIcon: true,
  fixedDatePickerPage: false,
  showDateTimeRangePicker: false,
  changeValue: _.noop,
  disabledDateFun: _.noop,
}

export default DatePicker