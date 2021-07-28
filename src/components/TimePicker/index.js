import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import TimePage from './TimePage'

import './index.css'

const TIME_MAP = {
  hour: 'hour',
  min: 'min',
  sec: 'sec'
}

function TimePicker(props) {
  const HourRef = useRef()
  const MinRef = useRef()
  const SecRef = useRef()
  const HourRef2 = useRef()
  const MinRef2 = useRef()
  const SecRef2 = useRef()
  const TimePickerRef = useRef()

  const [hour, setHour] = useState(new Date().getHours())
  const [min, setMin] = useState(new Date().getMinutes())
  const [sec, setSec] = useState(new Date().getSeconds())
  const [hour2, setHour2] = useState(23)
  const [min2, setMin2] = useState(59)
  const [sec2, setSec2] = useState(59)
  const [showTimePickerPage, setShowTimePickerPage] = useState(false)
  const [originTime, setOriginTime] = useState(null)
  const [enterTimePickerInput, setEnterTimePickerInput] = useState(false)

  const RANGE_TIME_MAP = {
    0: {
      hour: setHour,
      min: setMin,
      sec: setSec
    },
    1: {
      hour: setHour2,
      min: setMin2,
      sec: setSec2
    }
  }

  useEffect(() => {
    document.addEventListener('click', gloabalClick)
    return () => {
      document.removeEventListener('click', gloabalClick)
    }
  }, [])

  useEffect(() => {
    setOriginTime(props.value)
  }, [props.value])

  useEffect(() => {
    onResetTime()
  }, [originTime])


  function gloabalClick(e) {
    let node = TimePickerRef.current

    if (!node.contains(e.target)) {
      onCancelTime()
    }
  }

  function getSingelCurTime(h, m, s) {
    return `${prefixInteger(h)}:${prefixInteger(m)}:${prefixInteger(s)}`
  }
  
  function getRangeCurTime() {
    return `${getSingelCurTime(hour, min, sec)} - ${getSingelCurTime(hour2, min2, sec2)}`
  }

  function onParentChangeValue() {

    let curTime = getSingelCurTime(hour, min, sec)

    if (props.showTimeRangePicker) {

      let startTime = getSingelCurTime(hour, min, sec)
      let endTime = getSingelCurTime(hour2, min2, sec2)
      curTime = `${startTime} - ${endTime}`

      props.changeValue([startTime, endTime])
    } else {
      props.changeValue(curTime)
    }

    setOriginTime(curTime)
  }

  useEffect(() => {
    onParentChangeValue()
  }, [showTimePickerPage])

  function handleNowTime() {
    setHour(new Date().getHours())
    setMin(new Date().getMinutes())
    setSec(new Date().getSeconds())
    setShowTimePickerPage(false)
  }

  function onResetTime() {

    if (!props.showTimeRangePicker) {
      let arr = []
      if (typeof originTime === 'string') {
        arr = originTime.split(':')
        
        if (arr[0] >= 0 && arr[0] <=23 && arr[1] >= 0 && arr[1] <= 59 && arr[2] >= 0 && arr[2] <= 59) {
          setHour(arr[0])
          setMin(arr[1])
          setSec(arr[2])
        }
      }
    } else {
      // ['08:08:08', '09:09:09']
      if (Array.isArray(originTime) && originTime.length === 2) {
        originTime.forEach((time, index) => {
          if (typeof time === 'string') {
            let arr = time.split(':')
            
            if (arr[0] >= 0 && arr[0] <=23 && arr[1] >= 0 && arr[1] <= 59 && arr[2] >= 0 && arr[2] <= 59) {
              if (typeof RANGE_TIME_MAP[index]['hour'] === 'function') RANGE_TIME_MAP[index]['hour'](arr[0])
              if (typeof RANGE_TIME_MAP[index]['min'] === 'function') RANGE_TIME_MAP[index]['min'](arr[1])
              if (typeof RANGE_TIME_MAP[index]['sec'] === 'function') RANGE_TIME_MAP[index]['sec'](arr[2])
            }
          }
        })
      } else if (originTime === '') {
        setHour('00')
        setMin('00')
        setSec('00')
        setHour2('23')
        setMin2('59')
        setSec2('59')
      }
    }
  }

  function onCancelTime() {
    onResetTime()
    setShowTimePickerPage(false)
  }

  function checkHour(val, disableArr, index) {
    if (!Array.isArray(disableArr) || disableArr.length < 3) return
    disableArr.forEach(arr => {
      if (val == arr[0] && index == 0) {
        setMin(arr[1])
        setSec(arr[2])
      }
      if (val == arr[3] && index == 0) {
        setMin(arr[4])
        setSec(arr[5])
      }
      if (val == arr[0] && index == 1) {
        setMin2(arr[1])
        setSec2(arr[2])
      }
      if (val == arr[3] && index == 1) {
        setMin2(arr[4])
        setSec2(arr[5])
      }
    })
  }
  
  function checkMin(val, disableArr, index) {
    if (!Array.isArray(disableArr) || disableArr.length < 3) return
    disableArr.forEach(arr => {
      if (val == arr[1] && index == 0) {
        setSec(arr[2])
      }
      if (val == arr[4] && index == 0) {
        setSec(arr[5])
      }
      if (val == arr[1] && index == 1) {
        setSec2(arr[2])
      }
      if (val == arr[4] && index == 1) {
        setSec2(arr[5])
      }
    })
  }

  useEffect(() => {
    initScollTop()
  }, [hour, min, sec, hour2, min2, sec2, showTimePickerPage])

  function onChangeTime(type, val, index = 0, disableArr) {

    switch (type) {
      case TIME_MAP.hour:
        checkHour(val, disableArr, index)
        if (typeof RANGE_TIME_MAP[index]['hour'] === 'function') {
          RANGE_TIME_MAP[index]['hour'](val)
        }
        break;
      case TIME_MAP.min:
        checkMin(val, disableArr, index)
        if (typeof RANGE_TIME_MAP[index]['min'] === 'function') {
          RANGE_TIME_MAP[index]['min'](val)
        }
        break;
      case TIME_MAP.sec:
        if (typeof RANGE_TIME_MAP[index]['sec'] === 'function') {
          RANGE_TIME_MAP[index]['sec'](val)
        }
        break;
    
      default:
        break;
    }
  }

  // 确定时分秒选中值居中显示
  function initScollTop() {
    let spanHeight = 36

    if (HourRef.current) {
      HourRef.current.scrollTop = (+hour + 1) * spanHeight
    }
    if (MinRef.current) {
      MinRef.current.scrollTop = (+min + 1) * spanHeight
    }
    if (SecRef.current) {
      SecRef.current.scrollTop = (+sec + 1) * spanHeight
    }

    if (!props.showTimeRangePicker) return

    if (HourRef2.current) {
      HourRef2.current.scrollTop = (+hour2 + 1) * spanHeight
    }
    if (MinRef2.current) {
      MinRef2.current.scrollTop = (+min2 + 1) * spanHeight
    }
    if (SecRef2.current) {
      SecRef2.current.scrollTop = (+sec2 + 1) * spanHeight
    }
  }

  function prefixInteger(num, length = 2) {
    return (Array(length).join('0') + +num).slice(-length);
  }

  function disableValidate(rangeTime) {

    if (
      !Array.isArray(rangeTime) || 
      !rangeTime.length ||
      rangeTime.some(str => typeof str !== 'string')
    ) {
      return [false, null]
    }

    let flag = true
    let farmatRangeTime = []
    rangeTime.forEach(arr => {
      let strTime = arr.split('-').join(':').split(':').map(i => Number(i))

      // 时间禁用校验，过：【true, [[1,0,0,2,0,0],[4,10,20,5,30,40...]】，不过：【false, null】
      if (
        flag &&
        strTime.length === 6 &&
        strTime[0] >= 0 && strTime[0] <=23 &&
        strTime[3] >= 0 && strTime[3] <=23 &&
        strTime[1] >= 0 && strTime[1] <=59 &&
        strTime[4] >= 0 && strTime[4] <=59 &&
        strTime[2] >= 0 && strTime[2] <=59 &&
        strTime[5] >= 0 && strTime[5] <=59
      ) {
        farmatRangeTime.push(strTime)
      } else {
        flag = false
        farmatRangeTime = null
      }
    })

    if (!flag) {
      return [flag, farmatRangeTime]
    }

    return [flag, farmatRangeTime]
  }

  function handleClearValue() {
    setHour('')
    setMin('')
    setSec('')
    setOriginTime('')

    props.changeValue('')
  }

  const leftDisableArr = [+hour2, +min2, +sec2, 24, 0, 0]
  const rightDisableArr = [0, 0, 0, +hour, +min, +sec]

  let { disabledTimeRange, label, showClearIcon, placeholder, showTimeRangePicker, value, width, listWidth } = props

  // 时间禁用校验，过：【true, [[1,0,0,2,0,0],[4,10,20,5,30,40]...]】，不过：【false, null】
  let [disabledPassed, disableArr] = disableValidate(disabledTimeRange)

  return (
    <div 
      className="sdw__time-picker__wrap" 
      ref={TimePickerRef}
      style={{ ...(!!width ? {width: width + 12} : {}) }}
    >
      {
        !!label &&
        <span className={showTimePickerPage ? 'sdw__time-picker__show-time-label hover' : 'sdw__time-picker__show-time-label'}>{label}</span>
      }
      <div
        style={{ ...(!!width ? {width: width} : {}) }}
        className={showTimePickerPage ? 'sdw__time-picker__show-time-wrap hover' : 'sdw__time-picker__show-time-wrap'}
        onClick={() => setShowTimePickerPage(v => !v)}
        onMouseEnter={() => setEnterTimePickerInput(true)}
        onMouseLeave={() => setEnterTimePickerInput(false)}
      >
        {
          (!showTimeRangePicker && !!value && hour !== '' && min !== '' && sec !== '') ?
          getSingelCurTime(hour, min, sec) :
          (
            (showTimeRangePicker && !!value && hour !== '' && min !== '' && sec !== '' && hour2 !== '' && min2 !== '' && sec2 !== '') ?
            getRangeCurTime() :
            <span className="sdw__time-picker__placeholder">{placeholder}</span>
          )
        }
        {
          showClearIcon &&
          enterTimePickerInput &&
          hour !== '' && min !== '' && sec !== '' &&
          <i
            className="sdw__time-picker__clear-icon"
            onClick={handleClearValue}
          />
        }
      </div>
      {
        // 选择单个时间点
        showTimePickerPage &&
        !showTimeRangePicker &&
        <div className="sdw__time-picker-page-wrap" style={{ ...(!!listWidth ? {width: listWidth} : {}) }}>
          <TimePage
            hour={hour}
            min={min}
            sec={sec}
            TIME_MAP={TIME_MAP}
            HourRef={HourRef}
            MinRef={MinRef}
            SecRef={SecRef}
            disableArr={disableArr}
            disabledPassed={disabledPassed}
            onChangeTime={onChangeTime}
            prefixInteger={prefixInteger}
          />
          <div className="sdw__time-picker-page__footer">
            {
              !disabledPassed &&
              <span className="now" onClick={handleNowTime}>此刻</span>
            }
            <span className="right-cancel" onClick={onCancelTime}>取消</span>
            <span className="right" onClick={() => setShowTimePickerPage(false)}>确定</span>
          </div>
        </div>
      }
      {
        // 选择时间范围
        showTimePickerPage &&
        showTimeRangePicker &&
        <div className="sdw__time-picker-page-wrap range-time" style={{ ...(!!listWidth ? {width: listWidth} : {}) }}>
          <div>
            <div className="sdw__time-picker-range-wrap">
              <div className="time__title">开始时间</div>
              <div>
                <TimePage
                  index={0}
                  hour={hour}
                  min={min}
                  sec={sec}
                  TIME_MAP={TIME_MAP}
                  HourRef={HourRef}
                  MinRef={MinRef}
                  SecRef={SecRef}
                  disabledPassed={true}
                  disableArr={[leftDisableArr]}
                  onChangeTime={onChangeTime}
                  prefixInteger={prefixInteger}
                />
              </div>
            </div>
            <div className="sdw__time-picker-range-wrap">
              <div className="time__title">结束时间</div>
              <div>
                <TimePage
                  index={1}
                  hour={hour2}
                  min={min2}
                  sec={sec2}
                  TIME_MAP={TIME_MAP}
                  HourRef={HourRef2}
                  MinRef={MinRef2}
                  SecRef={SecRef2}
                  disabledPassed={true}
                  disableArr={[rightDisableArr]}
                  onChangeTime={onChangeTime}
                  prefixInteger={prefixInteger}
                />
              </div>
            </div>
          </div>
          <div className="sdw__time-picker-page__footer">
            <span className="right-cancel" onClick={onCancelTime}>取消</span>
            <span className="right" onClick={() => setShowTimePickerPage(false)}>确定</span>
          </div>
        </div>
      }
    </div>
  )
}

TimePicker.propsTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  changeValue: PropTypes.func,
  disabledTimeRange: PropTypes.array,
  label: PropTypes.string,
  showClearIcon: PropTypes.bool,
  placeholder: PropTypes.string,
  showTimeRangePicker: PropTypes.bool,
  width: PropTypes.number,
  listWidth: PropTypes.number,
}

TimePicker.defaultProps = {
  placeholder: '请选择时间',
  changeValue: _.noop
}

export default TimePicker