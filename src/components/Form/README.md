<!-- 使用案列 -->

<!-- 
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
 -->