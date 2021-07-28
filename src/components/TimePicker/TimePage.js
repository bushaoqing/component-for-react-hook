import './index.css'

export default function TimePage (props) {

  // disableArr: [[1,0,0,2,0,0],[4,10,20,5,30,40]...]---->[[01:00:00-02:00:00],[04:10:20-05:30:40]...]
  function isHourDisabled (hour, disableArr) {
    let disableTimeRange = []
    disableArr.forEach(arr => {
      let hour1 = arr[0]
      let hour2 = arr[3]

      disableTimeRange = disableTimeRange.concat(getHourRange(hour1, hour2))
    })

    return disableTimeRange.some(i => (i[0] < hour && hour < i[1]))
  }

  function getHourRange (startHour, endHour) {
    let disableHourRange = []
    if (startHour > endHour) { // 8:00:00-3:00:00 ---->  8:00:00-23:59:59 && 0:00:00-3:00:00
      disableHourRange.push([startHour, 24], [-1, endHour]) // 为啥是24和-1：因为判断使用的大于和小于
    } else {
      disableHourRange.push([startHour, endHour])
    }
    return disableHourRange
  }

  // 只需要判断小时的首尾
  function isMinDisabled (min, disableArr, hour) {
    let curHour = Number(hour)
    let flag = false
    disableArr.forEach(arr => {
      let startHour = arr[0]
      let endHour = arr[3]
      let min1 = arr[1]
      let min2 = arr[4]
      if (curHour === startHour && curHour === endHour ) {
        flag = min > min1 && min < min2
      } else {
        if (curHour === startHour && min > min1) {
          flag = true
        } else if (curHour === endHour && min < min2) {
          flag = true
        }
      }
    })

    return flag
  }

  // 同上
  function isSecDisabled (sec, disableArr, hour, min) {
    let curHour = Number(hour)
    let curMin = Number(min)
    let flag = false
    disableArr.forEach(arr => {
      let startHour = arr[0]
      let endHour = arr[3]
      let startMin = arr[1]
      let endMin = arr[4]
      let sec1 = arr[2]
      let sec2 = arr[5]
      if (curHour === startHour && curMin === startMin && curHour === endHour && curMin === endMin) {
        flag = sec > sec1 && sec < sec2
      } else {
        if (curHour === startHour && curMin === startMin && sec > sec1) {
          flag = true
        } else if (curHour === endHour && curMin === endMin && sec < sec2) {
          flag = true
        }
      }
    })

    return flag
  }

  return (
    <div className="sdw__time-picker-page__main-body">
      <div ref={props.HourRef} className="sdw__time-picker-page__item-wrap">
        {
          Array.from(Array(24)).map((i, k) => {
            let isDisabled = props.disabledPassed ? isHourDisabled(k, props.disableArr) : false
            let hourClass = 'sdw__time-picker-page__item-label'
            if (isDisabled) hourClass += ' disabled'
            if (k == props.hour) hourClass += ' current'
            return (
              <div
                onClick={() => {
                  if (isDisabled) return
                  props.onChangeTime(props.TIME_MAP.hour, k, props.index, props.disableArr)
                }}
                key={k}
                className={hourClass}
              >{props.prefixInteger(k)}</div>
            )
          })
        }
      </div>
      <div ref={props.MinRef} className="sdw__time-picker-page__item-wrap">
        {
          Array.from(Array(60)).map((i, k) => {
            let isDisabled = props.disabledPassed ? isMinDisabled(k, props.disableArr, props.hour) : false
            let minClass = 'sdw__time-picker-page__item-label'
            if (isDisabled) minClass += ' disabled'
            if (k == props.min) minClass += ' current'
            return (
              <div
                onClick={() => {
                  if (isDisabled) return
                  props.onChangeTime(props.TIME_MAP.min, k, props.index, props.disableArr)
                }}
                key={k}
                className={minClass}
              >{props.prefixInteger(k)}</div>
            )
          })
        }
      </div>
      <div ref={props.SecRef} className="sdw__time-picker-page__item-wrap">
        {
          Array.from(Array(60)).map((i, k) => {
            let isDisabled = props.disabledPassed ? isSecDisabled(k, props.disableArr, props.hour, props.min) : false
            let secClass = 'sdw__time-picker-page__item-label'
            if (isDisabled) secClass += ' disabled'
            if (k == props.sec) secClass += ' current'
            return (
              <div
                onClick={() => {
                  if (isDisabled) return
                  props.onChangeTime(props.TIME_MAP.sec, k, props.index, props.disableArr)
                }}
                key={k}
                className={secClass}
              >{props.prefixInteger(k)}</div>
            )
          })
        }
      </div>
    </div>
  )
}