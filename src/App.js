import { Switch, Route, Link } from 'react-router-dom'
import { RouteMap } from './router'

// 测试容器
function App() {

  return (
    <>
      <ol className='side_menu_wrap'>
        {
          RouteMap.map(item => (
            <li key={item.path}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))
        }
      </ol>

      <div className="main_body_wrap">
        <Switch>
          {
            RouteMap.map(item => (
              <Route key={item.path} path={item.path} component={item.component}></Route>
            ))
          }
        </Switch>
      </div>
    </>
  );
}

export default App;
