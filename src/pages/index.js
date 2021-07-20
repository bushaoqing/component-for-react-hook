import { useState } from 'react'
import Buttom from '../components/Button'
import CopyText from '../components/CopyText'
import Input from '../components/Input'

// 测试容器
function InitPage() {
  let time = new Date().toLocaleTimeString()
  const [inputVal, setInputVal] = useState('123')


  return (
    <div className="App">
      <Buttom text="aaa" type="submit"  />

      <br/><hr/><br/>

      {time}<CopyText copyText={time} />

      <br/><hr/><br/>

      <Input 
        value={inputVal} 
        placeholder="in" 
        onChange={val => setInputVal(val)} 
        onBlur={() => console.log('curVal: ', inputVal)}
        // error={{isError: true, msg: '我是错误提示信息'}}
      />
    </div>
  );
}

export default InitPage;
