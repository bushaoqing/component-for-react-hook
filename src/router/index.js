import page from '../pages'
import FormDemo from '../pages/FormDemo'
import LoadingDemo from '../pages/LoadingDemo'
import Button from "../components/Button"
import CopyText from "../components/CopyText"
import Input from "../components/Input"
import Textarea from "../components/Textarea"
import Switch from "../components/Switch"
import DateTimeDemo from "../pages/DateTimeDemo"
import MessageDemo from "../pages/MessageDemo"
import LayoutDemo from "../pages/LayoutDemo"

// 侧边菜单栏
const RouteMap = [
    {
        name: '组件展示案例',
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
    }, {
        name: '输入框组件',
        path: '/Input',
        component: Input
    }, {
        name: '文本输入框组件',
        path: '/Textarea',
        component: Textarea
    }, {
        name: 'Switch组件',
        path: '/Switch',
        component: Switch
    }, {
        name: 'Form案例',
        path: '/FormDemo',
        component: FormDemo
    }, {
        name: 'Loading案例',
        path: '/LoadingDemo',
        component: LoadingDemo
    }, {
        name: 'DateTimeDemo案例',
        path: '/DateTimeDemo',
        component: DateTimeDemo
    }, {
        name: 'MessageDemo案例',
        path: '/MessageDemo',
        component: MessageDemo
    }, {
        name: 'LayoutDemo案例',
        path: '/LayoutDemo',
        component: LayoutDemo
    }
]

export {
    RouteMap
}