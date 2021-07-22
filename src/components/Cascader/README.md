<!-- 使用案列 -->

<!-- 
<Cascader 
  value={cascaderVal} 
  isFilter // true：可以模糊搜索
  isMultiple // true：可以多选
  // disabled // true：下拉框禁用
  disabledObj={{ // 备选项的禁用
    arr: ['E'],
    key: 'id',
    tip: '我是禁用提示'
  }}
  options={[
    {id: 'A', name: 'AAA', children: [{
      id: 'A1',
      name: 'A1',
      children: [{
        id: 'A1-1',
        name: 'A1-1'
      }]
    }]},
    {id: 'B', name: 'BBB', children: [{
      id: 'B1',
      name: 'B1',
      children: [{
        id: 'B1-1',
        name: 'B1-1'
      }]
    }]},
    {id: 'C', name: 'CCC', children: [{
      id: 'C1',
      name: 'C1',
      children: [{
        id: 'C1-1',
        name: 'C1-1'
      }]
    }]},
    {id: 'D', name: 'DDD', children: [{
      id: 'D1',
      name: 'D1',
      children: [{
        id: 'D1-1',
        name: 'D1-1'
      }]
    }]},
    {id: 'E', name: 'EEE', children: [{
      id: 'E1',
      name: 'E1',
      children: [{
        id: 'E1-1',
        name: 'E1-1'
      }]
    }]}
  ]}
  config={{ // 配置映射关键字，默认是value、text、children
    id: 'id',
    text: 'name',
    children: 'children'
  }}
  placeholder="请选择" 
  onChange={val => setCascaderVal(val)} 
  // onBlur={() => console.log('onBlur Select curVal: ', cascaderVal)}
  // error={{isError: true, msg: '我是错误提示信息'}}
/>
 -->