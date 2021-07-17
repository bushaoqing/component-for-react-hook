import Buttom from './components/Button'
import CopyText from './components/CopyText'

// 测试容器
function App() {
  return (
    <div className="App">
      <Buttom text="aaa" type="submit" />

      <hr />

      我就是你要得复制内容<CopyText copyText="我就是你要得复制内容" />
    </div>
  );
}

export default App;
