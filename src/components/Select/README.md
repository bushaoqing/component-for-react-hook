<!-- 使用案列 -->

<!-- 
<Select 
  value={selectVal} 
  isFilter // true：可以模糊搜索
  options={[
    {id: 'A', name: 'AAA'},
    {id: 'B', name: 'BBB'},
    {id: 'C', name: 'CCC'},
    {id: 'D', name: 'DDD'},
    {id: 'E', name: 'EEE'}
  ]}
  config={{ // 配置映射关键字，默认是value、text
    value: 'id',
    text: 'name'
  }}
  placeholder="请选择" 
  onChange={(val, item) => {
    setSelectVal(val)
    console.log('value: ', val, '  item: ', item)
  }} 
  // onBlur={() => console.log('onBlur Select curVal: ', selectVal)}
  // error={{isError: true, msg: '我是错误提示信息'}}
/>
 -->