import { Switch, Route, Link, BrowserRouter, Redirect } from 'react-router-dom'
import { RouteMap } from './router'

// 测试容器
function App() {

  return (
    <BrowserRouter>
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
          <Redirect to={RouteMap[0].path} from='*' />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
