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
import TabsDemo from "../pages/TabsDemo"
import PopoverDemo from "../pages/PopoverDemo"
import TableDemo from "../pages/TableDemo"
import SvgDemo from "../pages/SvgDemo"
import TreeDemo from "../pages/TreeDemo"
import Pagination from "../pages/Pagination"

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
    }, {
        name: 'TabsDemo案例',
        path: '/TabsDemo',
        component: TabsDemo
    }, {
        name: 'PopoverDemo案例',
        path: '/PopoverDemo',
        component: PopoverDemo
    }, {
        name: 'TableDemo案例',
        path: '/TableDemo',
        component: TableDemo
    }, {
        name: 'SvgDemo案例',
        path: '/SvgDemo',
        component: SvgDemo
    }, {
        name: 'TreeDemo案例',
        path: '/TreeDemo',
        component: TreeDemo
    }, {
        name: 'Pagination案例',
        path: '/Pagination',
        component: Pagination
    }
]

export {
    RouteMap
}