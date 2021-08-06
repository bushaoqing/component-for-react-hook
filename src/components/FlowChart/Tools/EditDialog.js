// 编辑div的弹窗
import { useState, useEffect } from 'react'
import _ from "lodash"
import Dialog from "../../Dialog"
import Form from "../../Form"
import Input from "../../Input"
import { validateTrim, minLength, minValue } from '../util/common'

const Rules = {
  text: [
    { required: true, name: '文本', msg: '必填', func: v => validateTrim(v) },
    { msg: '最小长度为2', func: v => minLength(v, 2) }
  ],
  bgColor: [
    { required: true, name: '背景颜色', msg: '必填', func: v => validateTrim(v) }
  ],
  color: [
    { required: true, name: '字体颜色', msg: '必填', func: v => validateTrim(v) }
  ],
  width: [
    { required: true, name: '宽度', msg: '必填', func: v => validateTrim(v) },
    { msg: '最小宽度为40', func: v => minValue(v, 40) }
  ],
  height: [
    { required: true, name: '高度', msg: '必填', func: v => validateTrim(v) },
    { msg: '最小高度为20', func: v => minValue(v, 20) }
  ]
}

export default function EditDialog(props) {
  let { record, curEnterDivID, handleSubmit, setVisible } = props
  let index = -1
  let curDiv = {}
  let initialFormData = {
    text: '',
    bgColor: '',
    color: '',
    width: '',
    height: ''
  }
  const [formData, setFormData] = useState(initialFormData)

  if (_.isArray(record) && record.length) index = record.findIndex(i => i.id === curEnterDivID)
  if (index !== -1) curDiv = record[index]

  useEffect(() => {
    initFormData(curDiv)
  }, [props.record])

  function initFormData(curDiv) {
    if(_.isEmpty(curDiv)) return
    initialFormData = {
      text: curDiv.textContent,
      bgColor: curDiv.style && curDiv.style.backgroundColor || 'pink',
      color: curDiv.style && curDiv.style.color || '#fff',
      width: curDiv.style && curDiv.style.width || 40,
      height: curDiv.style && curDiv.style.height || 20,
    }
    setFormData(initialFormData)
  }

  function updateFormData(key, val) {
    let cloneFormData = _.cloneDeep(formData)
    cloneFormData[key] = val
    setFormData(cloneFormData)
  }

  function onSubmit(bool) {
    if (!bool) return // 检验不通过

    let newRecord = _.cloneDeep(record)
    if (index !== -1) {
      newRecord[index] = {
        id: newRecord[index].id,
        style: {
          ...record[index].style,
          width: _.toNumber(formData.width),
          height: _.toNumber(formData.height),
          backgroundColor: formData.bgColor,
          color: formData.color
        },
        textContent: formData.text
      }
    }

    handleSubmit(newRecord)
  }

  return (
    !_.isEmpty(curDiv) &&
    <Dialog
      title={`编辑 ${curDiv.textContent}`}
      onCancel={() => setVisible(false)}
      hideSubmit
      hideCancel
    >
      <Form 
        rules={Rules} 
        formData={formData}
        labelWidth={100}
        onReset={() => initFormData(curDiv)}
        onSubmit={bool => onSubmit(bool)}
      >
        <Form.item name="text">
          <Input value={formData.text} onChange={val => updateFormData('text', val)} />
        </Form.item>
        <Form.item name="bgColor">
          <Input value={formData.bgColor} onChange={val => updateFormData('bgColor', val)} />
        </Form.item>
        <Form.item name="color">
          <Input value={formData.color} onChange={val => updateFormData('color', val)} />
        </Form.item>
        <Form.item name="width">
          <Input value={formData.width} type='number' onChange={val => updateFormData('width', val)} />
        </Form.item>
        <Form.item name="height">
          <Input value={formData.height} type='number' onChange={val => updateFormData('height', val)} />
        </Form.item>
      </Form>
    </Dialog>
  )
}