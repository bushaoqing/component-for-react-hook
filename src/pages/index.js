import Buttom from '../components/Button'
import CopyText from '../components/CopyText'
import Input from '../components/Input'

// 测试容器
function InitPage() {
  let time = new Date().toLocaleTimeString()

  return (
    <div className="App">
      <Buttom text="aaa" type="submit"  />

      <br/><hr/><br/>

      {time}<CopyText copyText={time} />

      <br/><hr/><br/>

      <Input value="123" placeholder="in" onChange={val => console.log('输入框值改变：', val)} />
    </div>
  );
}

export default InitPage;
