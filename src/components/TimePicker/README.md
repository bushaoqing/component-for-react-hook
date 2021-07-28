<!-- 

<h4>时间点</h4>
<TimePicker
  // label="我是label"
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
  label="时间"
  showTimeRangePicker={true} // true：表示选择时间范围
  value={rangeTime}
  // disabledTimeRange={['20:10:20-6:30:40', '8:8:8-9:9:9']}  // 禁用时间段
  // disabledTimeRange={['17:10:20-18:10:40']}  // 禁用时间段
  changeValue={val => setRangeTime(val)}
  showClearIcon={true}
  placeholder='请选择时间'
/>

 -->