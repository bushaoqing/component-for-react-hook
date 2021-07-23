
### 按钮案例图片
```javascript
<SdwButton 
  type="submit"
  iconClass=""
  text="确定"
  disabled={!false}
/>
```
![Image 这是按钮案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/button.png)

### 复制案例图片
```javascript
let time = new Date().toLocaleTimeString()

{time}<CopyText copyText={time} />
```
![Image 这是复制案例图片](https://github.com/bushaoqing/react-components-with-hooks/blob/main/readmeImg/copy.png)

### 输入框案例图片
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

### 文本输入框案例图片
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
