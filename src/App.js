import Buttom from './components/Button'
import CopyText from './components/CopyText'

// 测试容器
function App() {
  let tip = '我就是你要得复制内容'
  return (
    <div className="App">
      <Buttom text="aaa" type="submit" />

      <hr />

      {tip}<CopyText copyText={tip} />
    </div>
  );
}

export default App;
