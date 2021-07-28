<!-- 

const [dateValue, setDateValue] = useState('2021-7-20')
const [dateRangeValue, setDateRangeValue] = useState(['2021-7-20', '2021-7-23'])

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
  value={dateValue}  // 绑定的value值：单个是字符串：'2020-01-01'; 范围是数组：['2020-01-01', '2020-02-08']
  changeValue={setDateValue}  // 改变value的函数
/>

 -->