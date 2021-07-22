import page from '../pages'
import Button from "../components/Button"
import CopyText from "../components/CopyText"
import Input from "../components/Input"
import Textarea from "../components/Textarea"
import Switch from "../components/Switch"
import Radiobox from "../components/Radiobox"
import Checkbox from "../components/Checkbox"
import Select from "../components/Select"
import Cascader from "../components/Cascader"

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
        name: '单选按钮组件',
        path: '/Radiobox',
        component: Radiobox
    }, {
        name: '多选按钮组件',
        path: '/Checkbox',
        component: Checkbox
    }, {
        name: '下拉框选择组件',
        path: '/Select',
        component: Select
    }, {
        name: '级联选择组件',
        path: '/Cascader',
        component: Cascader
    }
]

export {
    RouteMap
}