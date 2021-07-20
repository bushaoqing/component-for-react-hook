import { useState } from 'react'
import Buttom from '../components/Button'
import CopyText from '../components/CopyText'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Switch from '../components/Switch'
import Radiobox from '../components/Radiobox'

// 测试容器
function InitPage() {
  const [inputVal, setInputVal] = useState('123')
  const [switchVal, setSwitchVal] = useState(0)
  const [switchVal1, setSwitchVal1] = useState(true)
  
  
  let time = new Date().toLocaleTimeString()
  return (
    <div className="App">
      <Buttom text="aaa" type="submit"  />

      <hr/>

      {time}<CopyText copyText={time} />

      <hr/>

      <Input 
        value={inputVal} 
        placeholder="in" 
        onChange={val => setInputVal(val)} 
        onBlur={() => console.log('curVal: ', inputVal)}
        // error={{isError: true, msg: '我是错误提示信息'}}
      />

      <hr/>

      <Textarea
        value={inputVal} 
        placeholder="in" 
        onChange={val => setInputVal(val)} 
        onBlur={() => console.log('curVal: ', inputVal)}
        // error={{isError: true, msg: '我是错误提示信息'}}
      />

      <hr/>

      <Switch value={switchVal} onChange={bool => setSwitchVal(bool)}/>{switchVal}
      <Switch value={switchVal1} onChange={bool => setSwitchVal1(bool)}/>{switchVal1 ? 'true' : 'fasle'}

      <hr/>

      <Radiobox
        value=""
        disabled={['A']}
        options={[
          {id: 1, text: '我是A', value: 'A'},
          {id: 2, text: '我是B', value: 'B'},
          {id: 3, text: '我是C', value: 'C'},
        ]}
      />
    </div>
  );
}

export default InitPage;
