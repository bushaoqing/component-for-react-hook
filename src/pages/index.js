import { useState } from 'react'
import Buttom from '../components/Button'
import CopyText from '../components/CopyText'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Switch from '../components/Switch'
import Radiobox from '../components/Radiobox'
import Checkbox from '../components/Checkbox'

// 测试容器
function InitPage() {
  const [inputVal, setInputVal] = useState('123')
  const [switchVal, setSwitchVal] = useState(0)
  const [switchVal1, setSwitchVal1] = useState(true)
  const [radioboxVal, setRadioboxVal] = useState('A')
  const [checkboxVal, setCheckboxVal] = useState(['A'])
  
  
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
        onBlur={() => console.log('curVal: ', inputVal)}
        // error={{isError: true, msg: '我是错误提示信息'}}
      />

      <hr/>

      <div className="app_title">文本输入框组件展示：</div>
      <Textarea
        value={inputVal} 
        placeholder="in" 
        onChange={val => setInputVal(val)} 
        onBlur={() => console.log('curVal: ', inputVal)}
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
    </div>
  );
}

export default InitPage;
