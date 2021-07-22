import { useState } from 'react'
import Buttom from '../components/Button'
import CopyText from '../components/CopyText'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Switch from '../components/Switch'
import Radiobox from '../components/Radiobox'
import Checkbox from '../components/Checkbox'
import Select from '../components/Select'

// 测试容器
function InitPage() {
  const [inputVal, setInputVal] = useState('123')
  const [switchVal, setSwitchVal] = useState(0)
  const [switchVal1, setSwitchVal1] = useState(true)
  const [radioboxVal, setRadioboxVal] = useState('A')
  const [checkboxVal, setCheckboxVal] = useState(['A'])
  const [selectVal, setSelectVal] = useState('C')
  const [selectVal1, setSelectVal1] = useState(['C'])
  
  
  let time = new Date().toLocaleTimeString()
  return (
    <div className="App">
      <div className="app_title">按钮组件展示：</div>
      <Buttom text="aaa" type="submit"  />

      <hr/>

      <div className="app_title">拷贝组件展示：</div>
      {time}<CopyText copyText={time} />

      <hr/>

      <div className="app_title">输入框组件展示：</div>
      <Input 
        value={inputVal} 
        placeholder="in" 
        onChange={val => setInputVal(val)} 
        // onBlur={() => console.log('Input curVal: ', inputVal)}
        // error={{isError: true, msg: '我是错误提示信息'}}
      />

      <hr/>

      <div className="app_title">文本输入框组件展示：</div>
      <Textarea
        value={inputVal} 
        placeholder="in" 
        onChange={val => setInputVal(val)} 
        // onBlur={() => console.log('Textarea curVal: ', inputVal)}
        // error={{isError: true, msg: '我是错误提示信息'}}
      />

      <hr/>

      <div className="app_title">开关组件展示：</div>
      <Switch value={switchVal} onChange={bool => setSwitchVal(bool)}/>{switchVal}
      <Switch value={switchVal1} onChange={bool => setSwitchVal1(bool)}/>{switchVal1 ? 'true' : 'fasle'}

      <hr/>

      <div className="app_title">单选按钮组件展示：</div>
      <Radiobox
        value={radioboxVal}
        disabled={['A']}
        options={[
          {id: 1, text: '我是A', value: 'A'},
          {id: 2, text: '我是B', value: 'B'},
          {id: 3, text: '我是C', value: 'C'},
        ]}
        onChange={val => setRadioboxVal(val)}
      />

      <hr/>

      <div className="app_title">多选按钮组件展示：</div>
      <Checkbox
        value={checkboxVal}
        disabled={['A']}
        options={[
          {id: 1, text: '我是A', value: 'A'},
          {id: 2, text: '我是B', value: 'B'},
          {id: 3, text: '我是C', value: 'C'},
          {id: 4, text: '我是D', value: 'D'},
        ]}
        onChange={val => setCheckboxVal(val)}
      />

      <hr/>

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
    </div>
  );
}

export default InitPage;
