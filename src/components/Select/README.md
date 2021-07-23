<!-- 使用案列 -->

<!-- 
<div className="app_title">下拉单选框组件展示：</div>
  <Select 
    value={selectVal} 
    isFilter // true：可以模糊搜索
    disabledObj={{ // 备选项的禁用
      arr: ['C', 'D'],
      key: 'id',
      tip: '我是禁用提示'
    }}
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
  
  <hr/>

  <div className="app_title">下拉多选框组件展示：</div>
  <Select 
    value={selectVal1} 
    isFilter // true：可以模糊搜索
    isMultiple // true：可以多选
    // disabled // true：下拉框禁用
    disabledObj={{ // 备选项的禁用
      arr: ['A', 'B'],
      key: 'id',
      tip: '我是禁用提示'
    }}
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
      setSelectVal1(val)
      console.log('value: ', val, '  item: ', item)
    }} 
    // onBlur={() => console.log('onBlur Select curVal: ', selectVal)}
    // error={{isError: true, msg: '我是错误提示信息'}}
  />
 -->