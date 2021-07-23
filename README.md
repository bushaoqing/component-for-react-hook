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
