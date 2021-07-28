<!-- 

const [dateTimeValue, setDateTimeValue] = useState('2021-03-20 08:09:07')
const [dateTimeRangeValue, setDateTimeRangeValue] = useState(["2021-03-10 08:09:07", "2021-04-13 08:09:07"])

function disabledDateTimeFun(time) {
  return time.getTime() > +new Date('2021-03-23')
}

<h4>日期+时间</h4>
<DateTimePicker
  disabledDateFun={disabledDateTimeFun}  // 禁用日期
  value={dateTimeValue}  // 绑定的value值：单个是字符串：'2020-01-01'
  changeValue={setDateTimeValue}  // 改变value的函数
/>

<hr/>
<h4>日期+时间范围</h4>
<DateTimePicker
  showDateTimeRangePicker={true}
  disabledDateFun={disabledDateTimeFun}  // 禁用日期
  value={dateTimeRangeValue}  // 绑定的value值：范围是数组：['2020-01-01', '2020-02-08']
  changeValue={setDateTimeRangeValue}  // 改变value的函数
/>

 -->