import page from '../pages'
import Button from "../components/Button"
import CopyText from "../components/CopyText"

// 侧边菜单栏
const RouteMap = [
    {
        name: 'page',
        path: '/page',
        component: page
    }, {
        name: '按钮组件',
        path: '/Button',
        component: Button
    }, {
        name: '拷贝组件',
        path: '/CopyText',
        component: CopyText
    }
]

export {
    RouteMap
}