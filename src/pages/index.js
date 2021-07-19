import Buttom from '../components/Button'
import CopyText from '../components/CopyText'

// 测试容器
function InitPage() {
  let time = new Date().toLocaleTimeString()

  return (
    <div className="App">
      <Buttom text="aaa" type="submit"  />

      <br/><hr/><br/>

      {time}<CopyText copyText={time} />

      <br/><hr/><br/>

      
    </div>
  );
}

export default InitPage;
