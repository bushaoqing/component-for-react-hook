import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './index.css'
import Button from '../Button'

// 通过context进行祖孙传值
const FormContext = React.createContext(null)

function Form(props) {

  const [rulesResult, setRulesResult] = useState({})
  const [isReset, setIsReset] = useState(true) // 标识是否点击重置按钮

  // 校验：将最终结果传给使用者和子组件，没通过需要标红+警告提示
  useEffect(() => {
    let { formData, rules } = props
    let flag = true
    let result = {} // 存储校验结果

    let rulesKeys = _.keys(rules)
    if (_.isArray(rulesKeys) && rulesKeys.length) {
      rulesKeys.forEach(key => {
        let rulesArr = _.isArray(rules[key]) && rules[key] || []

        rulesArr.forEach(rule => {
          let { msg, func } = rule
          let keyVal = formData[key]
          let bool = func(keyVal)

          result[key] = { // 记录对应校验结果，提供标红+tip
            isPass: bool,
            tip: !bool ? msg : ''
          }
  
          // 只要一个没通过，Form组件体检按钮得到的就是false（未通过校验）
          if (flag && !bool) flag = false 
        })
      })

      setRulesResult(result)
    }
  }, [props.formData, props.rules])

  function hanldeSubmit() {
    setIsReset(false)

    let flag = true
    _.keys(rulesResult).forEach(key => {
      if (flag && !rulesResult[key].isPass) flag = false
    })

    // 返回一个标识：bool值：当为true时通过校验，为false时，界面触发标红逻辑
    return props.onSubmit(flag)
  }

  function handleReset() {
    setIsReset(true)
    props.onReset()
  }

  return (
    <FormContext.Provider value={{...props, rulesResult, isReset}}>
      { props.children }
      <div className="comp-form__wrap-butn">
        {
          !props.hideSubmit &&
          <Button type="submit" text={ props.submitText } onClick={hanldeSubmit} />
        }
        {
          !props.hideReset &&
          <Button type="cancel" text={ props.resetText } onClick={handleReset} />
        }
      </div>
    </FormContext.Provider>
  )
}

function FormItem(props) {
  let context = useContext(FormContext)
  let { rules, labelWidth, rulesResult, isReset } = context
  let itemRules = rules[props.name]
  let isPassed = true
  let tip = ''

  if (!isReset && !_.isEmpty(rulesResult) && !_.isEmpty(rulesResult[props.name]) && _.isBoolean(rulesResult[props.name].isPass)) {
    isPassed = rulesResult[props.name].isPass
    tip = rulesResult[props.name].tip
  }

  const name = props.label || _.isArray(itemRules) && itemRules.filter(i => i.name) && itemRules.filter(i => i.name).length && itemRules.filter(i => i.name)[0].name || ''
  const required = _.isArray(itemRules) && itemRules.some(i => i.required) || false
  return (
    <div className="comp-form-item__wrap">
      <div className={`comp-form-item__wrap-label ${required ? 'required' : ''}`} style={{
        width: labelWidth
      }}>{ `${name}：` }</div>
      <div className={`comp-form-item__wrap-child ${!isPassed ? 'is_error' : ''}`}>
        { props.children }
        {
          !isPassed &&
          !!tip &&
          <div className="comp-form-item__wrap-child-tip">{tip}</div>
        }
      </div>
    </div>
  )
}

Form.propTypes = {
  rules: PropTypes.object,
  formData: PropTypes.object,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  submitText: PropTypes.string,
  hideSubmit: PropTypes.bool,
  onSubmit: PropTypes.func,
  resetText: PropTypes.string,
  hideReset: PropTypes.bool,
  onReset: PropTypes.func,
}

Form.defaultProps = {
  rules: {},
  formData: {},
  labelWidth: 98,
  submitText: '提交',
  hideSubmit: false,
  resetText: '重置',
  hideReset: false,
  onSubmit: _.noop,
  onReset: _.noop,
}

FormItem.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
}

FormItem.defaultProps = {
  name: '',
  label: '', // label 的优先级高于name（name需要去rules里面找对应的name）；如果非必填，配置label即可，也可以在rules里面配置name
}

Form.item = FormItem

export default Form