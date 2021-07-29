### 1、按钮案例图片
```javascript
<SdwButton 
  type="submit"
  iconClass=""
  text="确定"
  disabled={!false}
/>
```
![Image 这是按钮案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/button.png)

### 2、复制案例图片
```javascript
let time = new Date().toLocaleTimeString()

{time}<CopyText copyText={time} />
```
![Image 这是复制案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/copy.png)

### 3、输入框案例图片
```javascript
<Input 
  value={inputVal} 
  placeholder="in" 
  onChange={val => setInputVal(val)} 
  onBlur={() => console.log('curVal: ', inputVal)}
  // error={{isError: true, msg: '我是错误提示信息'}}
/>
```
![Image 这是输入框案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/input.png)

### 4、文本输入框案例图片
```javascript
<Textarea
  value={inputVal} 
  placeholder="in" 
  onChange={val => setInputVal(val)} 
  onBlur={() => console.log('curVal: ', inputVal)}
  // error={{isError: true, msg: '我是错误提示信息'}}
/>
```
![Image 这是文本输入框案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/textarea.png)

### 5、开关案例图片
```javascript
<Switch value={switchVal} onChange={bool => setSwitchVal(bool)}/>
```
![Image 这是开关案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/switch.png)

### 6、单选案例图片
```javascript
<Radiobox
  value={'A'}
  disabled={['A']}
  options={[
    {id: 1, text: '我是A', value: 'A'},
    {id: 2, text: '我是B', value: 'B'},
    {id: 3, text: '我是C', value: 'C'},
  ]}
  onChange={val => setRadioboxVal(val)}
/>
```
![Image 这是单选案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/radio.png)

### 7、多选案例图片
```javascript
<Checkbox
  value={['A']}
  disabled={['A']}
  options={[
    {id: 1, text: '我是A', value: 'A'},
    {id: 2, text: '我是B', value: 'B'},
    {id: 3, text: '我是C', value: 'C'},
    {id: 4, text: '我是D', value: 'D'},
  ]}
  onChange={val => setCheckboxVal(val)}
/>
```
![Image 这是多选案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/checkbox.png)

### 8、下拉单选组件案例图片
```javascript
<Select 
  value={selectVal} 
  isFilter // true：可以模糊搜索
  disabledObj={{ // 备选项的禁用
    arr: ['C', 'D'],
    key: 'id',
    tip: '我是禁用提示'
  }}
  options={[
    {id: 'A', name: 'AAA'},
    {id: 'B', name: 'BBB'},
    {id: 'C', name: 'CCC'},
    {id: 'D', name: 'DDD'},
    {id: 'E', name: 'EEE'}
  ]}
  config={{ // 配置映射关键字，默认是value、text
    value: 'id',
    text: 'name'
  }}
  placeholder="请选择" 
  onChange={(val, item) => {
    setSelectVal(val)
    console.log('value: ', val, '  item: ', item)
  }} 
  // onBlur={() => console.log('onBlur Select curVal: ', selectVal)}
  // error={{isError: true, msg: '我是错误提示信息'}}
/>
```
![Image 这是下拉单选组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/select.png)

### 9、下拉多选组件案例图片
```javascript
<Select 
  value={selectVal1} 
  isFilter // true：可以模糊搜索
  isMultiple // true：可以多选
  // disabled // true：下拉框禁用
  disabledObj={{ // 备选项的禁用
    arr: ['A', 'B'],
    key: 'id',
    tip: '我是禁用提示'
  }}
  options={[
    {id: 'A', name: 'AAA'},
    {id: 'B', name: 'BBB'},
    {id: 'C', name: 'CCC'},
    {id: 'D', name: 'DDD'},
    {id: 'E', name: 'EEE'}
  ]}
  config={{ // 配置映射关键字，默认是value、text
    value: 'id',
    text: 'name'
  }}
  placeholder="请选择" 
  onChange={(val, item) => {
    setSelectVal1(val)
    console.log('value: ', val, '  item: ', item)
  }} 
  // onBlur={() => console.log('onBlur Select curVal: ', selectVal)}
  // error={{isError: true, msg: '我是错误提示信息'}}
/>
```
![Image 这是下拉多选组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/select1.png)

### 10、级联组件案例图片
```javascript
<Cascader 
  value={cascaderVal} 
  isFilter // true：可以模糊搜索
  isMultiple // true：可以多选
  // disabled // true：下拉框禁用
  disabledObj={{ // 备选项的禁用
    arr: ['E'],
    key: 'id',
    tip: '我是禁用提示'
  }}
  options={[
    {id: 'A', name: 'AAA', children: [{
      id: 'A1',
      name: 'A1',
      children: [{
        id: 'A1-1',
        name: 'A1-1'
      }]
    }]},
    {id: 'B', name: 'BBB', children: [{
      id: 'B1',
      name: 'B1',
      children: [{
        id: 'B1-1',
        name: 'B1-1'
      }]
    }]},
    {id: 'C', name: 'CCC', children: [{
      id: 'C1',
      name: 'C1',
      children: [{
        id: 'C1-1',
        name: 'C1-1'
      }]
    }]},
    {id: 'D', name: 'DDD', children: [{
      id: 'D1',
      name: 'D1',
      children: [{
        id: 'D1-1',
        name: 'D1-1'
      }]
    }]},
    {id: 'E', name: 'EEE', children: [{
      id: 'E1',
      name: 'E1',
      children: [{
        id: 'E1-1',
        name: 'E1-1'
      }]
    }]}
  ]}
  config={{ // 配置映射关键字，默认是value、text、children
    id: 'id',
    text: 'name',
    children: 'children'
  }}
  placeholder="请选择" 
  onChange={val => setCascaderVal(val)} 
  // onBlur={() => console.log('onBlur Select curVal: ', cascaderVal)}
  // error={{isError: true, msg: '我是错误提示信息'}}
/>
```
![Image 这是级联组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/cascader.png)

### 11、弹窗组件案例图片
```javascript
const [visible, setVisible] = useState(false)

<div className="app_title">弹窗组件展示：</div>
<Buttom type='submit' text='点我查看弹窗组件' onClick={() => setVisible(true)} />
{
  visible &&
  <Dialog
    title='我是标题'
    // width={800}
    // height={600}
    onSubmit={() => setVisible(false)}
    onCancel={() => setVisible(false)}
  >
    <div>我是插入弹窗的div啊</div>
  </Dialog>
}
```
![Image 这是弹窗组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/dialog.png)

### 12、抽屉组件案例图片
```javascript
const [drawerVisible, setDrawerVisible] = useState(false)

<div className="app_title">抽屉组件展示：</div>
<Buttom type='submit' text='点我查看抽屉组件' onClick={() => setDrawerVisible(true)} />
{
  drawerVisible &&
  <Drawer
    title='我是标题'
    // width={800}
    onSubmit={() => setDrawerVisible(false)}
    onCancel={() => setDrawerVisible(false)}
  >
    <div>我是插入抽屉的div啊</div>
  </Drawer>
}
```
![Image 这是抽屉组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/drawer.png)

### 13、Form表单组件案例图片
```javascript
import { useState } from 'react'
import _ from 'lodash'
import Form from '../components/Form'
import Input from '../components/Input'
import Radiobox from '../components/Radiobox'
import Checkbox from '../components/Checkbox'
import Switch from '../components/Switch'
import Textarea from '../components/Textarea'
import Select from '../components/Select'
import Cascader from '../components/Cascader'
import { validateTrim, minLength } from '../util/common'

const Rules = {
  name: [
    { required: true, name: '用户名', msg: '必填', func: v => validateTrim(v) },
    { msg: '最小长度为2', func: v => minLength(v, 2) }
  ],
  password: [
    { required: true, name: '密码', msg: '必填', func: v => validateTrim(v) },
    { msg: '最小长度为8', func: v => minLength(v, 8) }
  ],
  email: [
    { required: true, name: '邮箱', msg: '必填', func: v => validateTrim(v) }
  ],
  sex: [
    { required: true, name: '性别', msg: '必填', func: v => validateTrim(v) }
  ],
  hobby: [
    { required: true, name: '爱好', msg: '必填', func: v => validateTrim(v) }
  ],
  textareaVal: [
    { required: true, name: '描述', msg: '必填', func: v => validateTrim(v) }
  ],
  selectVal: [
    { required: true, name: '车位', msg: '必填', func: v => validateTrim(v) }
  ],
  cascaderVal: [
    { required: true, name: '随便', msg: '必填', func: v => validateTrim(v) }
  ]
}

const initialState = {
  name: '',
  password: '',
  email: '',
  des: '',
  sex: '',
  hobby: [],
  isOpen: false,
  textareaVal: '',
  selectVal: ''
}

function FormDemo() {

  const [formData, setFormData] = useState(initialState)

  function updateFormData(key, val) {
    let cloneFormData = _.cloneDeep(formData)
    cloneFormData[key] = val
    setFormData(cloneFormData)
  }

  return (
    <div style={{ padding: 20, border: '1px solid #eee', width: 600, marginTop: 40 }}>
      Form演示案例：
      <br/>
      <br/>

      <Form 
        rules={Rules} 
        formData={formData}
        labelWidth={100}
        // hideReset
        // resetText='取消'
        onReset={() => {
          console.log('点了重置按钮')
          setFormData(initialState)
        }}
        // submitText='确定'
        // hideSubmit
        onSubmit={(bool) => console.log('点了提交按钮', bool)}
      >
        <Form.item name="name">
          <Input value={formData.name} onChange={val => updateFormData('name', val)} />
        </Form.item>
        <Form.item name="password">
          <Input value={formData.password} type="password" onChange={val => updateFormData('password', val)} />
        </Form.item>
        <Form.item name="email">
          <Input value={formData.email} onChange={val => updateFormData('email', val)} />
        </Form.item>
        <Form.item label="描述">
          <Input value={formData.des} onChange={val => updateFormData('des', val)} />
        </Form.item>
        <Form.item name="sex">
          <Radiobox
            value={formData.sex}
            options={[
              {id: 1, text: '男', value: 'woman'},
              {id: 2, text: '女', value: 'man'},
            ]}
            onChange={val => updateFormData('sex', val)}
          />
        </Form.item>
        <Form.item name="hobby">
          <Checkbox
            value={formData.hobby}
            options={[
              {id: 1, text: '打篮球', value: 'A'},
              {id: 2, text: '打羽毛球', value: 'B'},
              {id: 3, text: '踢足球', value: 'C'},
              {id: 4, text: '跑步', value: 'D'},
            ]}
            onChange={val => updateFormData('hobby', val)}
          />
        </Form.item>
        <Form.item label="开关">
          <Switch 
            value={formData.isOpen} 
            onChange={bool => updateFormData('isOpen', bool)}
          />
        </Form.item>
        <Form.item name="textareaVal">
          <Textarea
            value={formData.textareaVal}
            rows={8}
            onChange={val => updateFormData('textareaVal', val)} 
          />
        </Form.item>
        <Form.item name="selectVal">
          <Select 
            value={formData.selectVal} 
            isFilter // true：可以模糊搜索
            options={[
              {id: 'A', name: 'AAA'},
              {id: 'B', name: 'BBB'},
              {id: 'C', name: 'CCC'},
              {id: 'D', name: 'DDD'},
              {id: 'E', name: 'EEE'}
            ]}
            config={{ // 配置映射关键字，默认是value、text
              value: 'id',
              text: 'name'
            }}
            placeholder="请选择" 
            onChange={val => updateFormData('selectVal', val)}
          />
        </Form.item>
        <Form.item name="cascaderVal">
          <Cascader 
            value={formData.cascaderVal} 
            isFilter // true：可以模糊搜索
            options={[
              {id: 'A', name: 'AAA', children: [{
                id: 'A1',
                name: 'A1',
                children: [{
                  id: 'A1-1',
                  name: 'A1-1'
                }]
              }]},
              {id: 'B', name: 'BBB', children: [{
                id: 'B1',
                name: 'B1',
                children: [{
                  id: 'B1-1',
                  name: 'B1-1'
                }]
              }]},
              {id: 'C', name: 'CCC', children: [{
                id: 'C1',
                name: 'C1',
                children: [{
                  id: 'C1-1',
                  name: 'C1-1'
                }]
              }]},
              {id: 'D', name: 'DDD', children: [{
                id: 'D1',
                name: 'D1',
                children: [{
                  id: 'D1-1',
                  name: 'D1-1'
                }]
              }]},
              {id: 'E', name: 'EEE', children: [{
                id: 'E1',
                name: 'E1',
                children: [{
                  id: 'E1-1',
                  name: 'E1-1'
                }]
              }]}
            ]}
            config={{ // 配置映射关键字，默认是value、text、children
              id: 'id',
              text: 'name',
              children: 'children'
            }}
            placeholder="请选择" 
            onChange={val => updateFormData('cascaderVal', val)}
          />
        </Form.item>
      </Form>
    </div>
  )
}

export default FormDemo
```
![Image 这是Form表单组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/form.png)
![Image 这是Form表单组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/form1.png)
![Image 这是Form表单组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/form2.png)

### 14、Loading遮罩组件案例图片
````javascript
import { useState } from 'react'
import Buttom from '../components/Button'
import Loading from '../components/Loading'

export default function LoadingDemo() {

  const [isLoading, setisLoading] = useState(false)

  return (
    <>
      <Loading 
        isLoading={isLoading} 
        tip="拼命加载中..."
        // hideIcon={true}
      >
        <div style={{
          marginTop: 20,
          width: 1000,
          height: 800,
          border: "1px solid #ddd"
        }}>
          我是展示内容
        </div>
      </Loading>
      <br/>
      <Buttom type="submit" text="撤换loading" onClick={() => setisLoading(v => !v)} />
    </>
  )
}
````
![Image 这是遮罩组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/loading.png)

### 15、TimePicker时间选择组件
````javascript
<h4>时间点</h4>
<TimePicker
  value={time}
  // disabledTimeRange={['20:10:20-6:30:40', '8:8:8-9:9:9']}  // 禁用时间段
  disabledTimeRange={['17:10:20-23:10:40']}  // 禁用时间段
  changeValue={val => setTime(val)}
  showClearIcon={true}
  placeholder='请选择时间'
/>

<hr/>

<h4>时间范围</h4>
<TimePicker
  showTimeRangePicker={true} // true：表示选择时间范围
  value={rangeTime}
  // disabledTimeRange={['20:10:20-6:30:40', '8:8:8-9:9:9']}  // 禁用时间段
  // disabledTimeRange={['17:10:20-18:10:40']}  // 禁用时间段
  changeValue={val => setRangeTime(val)}
  showClearIcon={true}
  placeholder='请选择时间'
/>
````
![Image 这是时间选择组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/timePicker0.png)

### 16、DatePicker日期选择组件
````javascript
<h4>日期</h4>
<DatePicker
  disabledDateFun={disabledDateFun}  // 禁用日期
  value={dateValue}  // 绑定的value值：单个是字符串：'2020-01-01'; 范围是数组：['2020-01-01', '2020-02-08']
  changeValue={setDateValue}  // 改变value的函数
/>

<hr/>
<h4>日期范围</h4>
<DatePicker
  showDateRangePickePage={true} // true: 表示选择日期范围   fasle或不配置: 表示选择日期点
  disabledDateFun={disabledDateFun}  // 禁用日期
  value={dateValue}  // 绑定的value值：单个是字符串：'2020-01-01'; 范围是数组：['2020-01-01', '2020-02-08']
  changeValue={setDateValue}  // 改变value的函数
/>
````
![Image 这是日期选择组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/datePicker.png)

### 17、DateTimePicker日期时间组件
````javascript
const [dateTimeValue, setDateTimeValue] = useState('2021-03-20 08:09:07')
const [dateTimeRangeValue, setDateTimeRangeValue] = useState(["2021-03-10 08:09:07", "2021-04-13 08:09:07"])

function disabledDateTimeFun(time) {
  return time.getTime() > +new Date('2021-03-23')
}

<h4>日期+时间</h4>
<DateTimePicker
  disabledDateFun={disabledDateTimeFun}  // 禁用日期
  value={dateTimeValue}  // 绑定的value值：单个是字符串：'2020-01-01'
  changeValue={setDateTimeValue}  // 改变value的函数
/>

<hr/>
<h4>日期+时间范围</h4>
<DateTimePicker
  showDateTimeRangePicker={true}
  disabledDateFun={disabledDateTimeFun}  // 禁用日期
  value={dateTimeRangeValue}  // 绑定的value值：范围是数组：['2020-01-01', '2020-02-08']
  changeValue={setDateTimeRangeValue}  // 改变value的函数
/>
````
![Image 这是日期时间选择组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/dateTimePicker.png)

### 18、Message全局提示组件
````javascript
<Button type="submit" text="一般提示" onClick={() => Message.info('一般提示!')} />
<hr/>
<Button type="submit" text="成功提示" onClick={() => Message.success('成功提示!')} />
<hr/>
<Button type="submit" text="告警提示" onClick={() => Message.warn('告警提示!')} />
<hr/>
<Button type="submit" text="失败提示" onClick={() => Message.error('失败提示!')} />
````
![Image 这是全局提示组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/message.png)

### 19、UpLoad上传文件组件
````javascript
const [file, setfile] = useState(null)

<UpLoad 
  value={file} 
  changeValue={setfile}
  // accees=".xlsx,.xls" // 选择文件类型
/>
````
![Image 这是上传文件组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/upload.png)

### 20、Layout布局组件
````javascript
import React from 'react'
import Layout from '../components/Layout'

import './index.css'

export default function LayoutDemo() {

  return (
    <>
      <h3>没有上下左右的间隔：(红色边框是最外边的容器边框)</h3>
      <div style={{ border: '1px solid red' }}>
        <Layout.Row>
          <Layout.Col span={24}>col1</Layout.Col>
        </Layout.Row>

        <Layout.Row>
          <Layout.Col span={12}>col1</Layout.Col>
          <Layout.Col span={12}>col2</Layout.Col>
        </Layout.Row>

        <Layout.Row>
          <Layout.Col span={8}>col1</Layout.Col>
          <Layout.Col span={8}>col2</Layout.Col>
          <Layout.Col span={8}>col3</Layout.Col>
        </Layout.Row>
        
        <Layout.Row>
          <Layout.Col span={6}>col1</Layout.Col>
          <Layout.Col span={6}>col2</Layout.Col>
          <Layout.Col span={6}>col2</Layout.Col>
          <Layout.Col span={6}>col3</Layout.Col>
        </Layout.Row>
      </div>
      
      <br/>
      <br/>
      <h3>设置上下左右的间隔：上下：8px；左右：10px (红色边框是最外边的容器边框)</h3>
      <div style={{ border: '1px solid red' }}>
        <Layout.Row gutter={20} marginTop={8} marginBottom={16}>
          <Layout.Col span={24}>col1</Layout.Col>
        </Layout.Row>

        <Layout.Row gutter={20}>
          <Layout.Col span={12}>col1</Layout.Col>
          <Layout.Col span={12}>
            <div>col2</div>
            <div>col2</div>
          </Layout.Col>
        </Layout.Row>

        <Layout.Row gutter={20} marginTop={16}>
          <Layout.Col span={8}>
            <div>col1</div>
            <div>col1</div>
            <div>col1</div>
          </Layout.Col>
          <Layout.Col span={8}>col2</Layout.Col>
          <Layout.Col span={8}>col3</Layout.Col>
        </Layout.Row>
        
        <Layout.Row gutter={20} marginTop={16} marginBottom={8}>
          <Layout.Col span={6}>col1</Layout.Col>
          <Layout.Col span={6}>col2</Layout.Col>
          <Layout.Col span={6}>col3</Layout.Col>
          <Layout.Col span={6}>
            <div>col4</div>
            <div>col4</div>
            <div>col4</div>
            <div>col4</div>
          </Layout.Col>
        </Layout.Row>

        <Layout.Row gutter={20} marginTop={16} marginBottom={8}>
          <Layout.Col span={12}>col1</Layout.Col>
          <Layout.Col span={6}>col2</Layout.Col>
          <Layout.Col span={6}>col3</Layout.Col>
        </Layout.Row>
      </div>

      <br/>
      <br/>
      <h3>设置上下左右的间隔：上下：8px；左右：10px (红色边框是最外边的容器边框)</h3>
      <div style={{ border: '1px solid red' }}>
        <Layout.Row gutter={20} marginTop={16} marginBottom={8}>
          <Layout.Col span={6}>col1</Layout.Col>
          <Layout.Col span={6}>col3</Layout.Col>
          <Layout.Col span={6}>
            <div>col4</div>
            <div>col4</div>
          </Layout.Col>
        </Layout.Row>

        <Layout.Row gutter={20} marginTop={16} marginBottom={8} justigy="center">
          <Layout.Col span={6}>justigy="center"</Layout.Col>
          <Layout.Col span={6}>col2</Layout.Col>
          <Layout.Col span={6}>
            <div>col4</div>
            <div>col4</div>
          </Layout.Col>
        </Layout.Row>

        <Layout.Row gutter={20} marginTop={16} marginBottom={8} justigy="flex-end">
          <Layout.Col span={6}>justigy="flex-end"</Layout.Col>
          <Layout.Col span={6}>col2</Layout.Col>
          <Layout.Col span={6}>
            <div>col4</div>
            <div>col4</div>
          </Layout.Col>
        </Layout.Row>

        <Layout.Row gutter={20} marginTop={16} marginBottom={8} justigy="space-between">
          <Layout.Col span={6}>justigy="space-between"</Layout.Col>
          <Layout.Col span={6}>col2</Layout.Col>
          <Layout.Col span={6}>
            <div>col4</div>
            <div>col4</div>
          </Layout.Col>
        </Layout.Row>

        <Layout.Row gutter={20} marginTop={16} marginBottom={8} justigy="space-around">
          <Layout.Col span={6}>justigy="space-around"</Layout.Col>
          <Layout.Col span={6}>col2</Layout.Col>
          <Layout.Col span={6}>
            <div>col4</div>
            <div>col4</div>
          </Layout.Col>
        </Layout.Row>
      </div>
    </>
  )
}
````
![Image 这是布局组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/layout.png)

### 21、Tabs组件
````javascript
import React from 'react'
import Tabs from '../components/Tabs'

import AAA from './AAA'
import BBB from './BBB'
import CCC from './CCC'
import DDD from './DDD'

const menu = [
  {
    title: 'AAA',
    path: '/AAA',
    component: AAA
  }, {
    title: 'BBB',
    path: '/BBB',
    component: BBB
  }, {
    title: 'CCC',
    path: '/CCC',
    component: CCC
  }, {
    title: 'DDD',
    path: '/DDD',
    component: DDD
  }
]

const TabsDemo = () => (
  <Tabs 
    menu={menu}
  />
)

export default TabsDemo
````
![Image 这是Tabs组件案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/tabs.png)