import { useState } from 'react'
import TimePicker from '../components/TimePicker'
import DatePicker from '../components/DatePicker'

export default function DateTimeDemo() {

  const [time, setTime] = useState('08:08:08')
  const [rangeTime, setRangeTime] = useState(['08:08:08', '09:09:09'])
  const [dateValue, setDateValue] = useState('2021-7-20')
  const [dateRangeValue, setDateRangeValue] = useState(['2021-7-20', '2021-7-23'])

  function disabledDateFun(time) {
    return time.getTime() > Date.now()
  }
  
  return (
    <div className='maintain'>
      <h4>时间点</h4>
      <TimePicker
        value={time}
        // disabledTimeRange={['20:10:20-6:30:40', '8:8:8-9:9:9']}  // 禁用时间段
        disabledTimeRange={['17:10:20-23:10:40']}  // 禁用时间段
        changeValue={val => setTime(val)}
        showClearIcon={true}
        placeholder='请选择时间'
      />

      <hr/>
      <h4>时间范围</h4>
      <TimePicker
        showTimeRangePicker={true} // true：表示选择时间范围
        value={rangeTime}
        // disabledTimeRange={['20:10:20-6:30:40', '8:8:8-9:9:9']}  // 禁用时间段
        // disabledTimeRange={['17:10:20-18:10:40']}  // 禁用时间段
        changeValue={val => setRangeTime(val)}
        showClearIcon={true}
        placeholder='请选择时间'
      />

      <hr/>
      <h4>日期</h4>
      <DatePicker
        disabledDateFun={disabledDateFun}  // 禁用日期
        value={dateValue}  // 绑定的value值：单个是字符串：'2020-01-01'; 范围是数组：['2020-01-01', '2020-02-08']
        changeValue={setDateValue}  // 改变value的函数
      />

      <hr/>
      <h4>日期范围</h4>
      <DatePicker
        showDateRangePickePage={true} // true: 表示选择日期范围   fasle或不配置: 表示选择日期点
        disabledDateFun={disabledDateFun}  // 禁用日期
        value={dateRangeValue}  // 绑定的value值：单个是字符串：'2020-01-01'; 范围是数组：['2020-01-01', '2020-02-08']
        changeValue={setDateRangeValue}  // 改变value的函数
      />
    </div>
  )
}
