import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './index.css'

function Select(props) {
  const [inputValue, setInputValue] = useState(() => {
    let { value, options, config } = props
    if (!props.isMultiple) value = [value] // 单选变为多选的处理方式

    let initArr = options.filter(i => value.includes(i[config.value]))
    let initVal = initArr[0] && initArr[0][config.text] || ''
    return [initVal]
  })
  const [showClearIcon, setShowClearIcon] = useState(false)
  const [isFocus, setFocus] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [curOptions, setCurOptions] = useState(props.options)

  useEffect(() => {
    document.addEventListener('click', onDocumentClick)
    return () => {
      document.removeEventListener('click', onDocumentClick)
    }
  }, [])

  // 关闭下拉选项后需要重置当前组件的下拉选项
  useEffect(() => {
    if (!showOptions) setCurOptions(props.options)
  }, [showOptions])

  function onDocumentClick() {
    setShowOptions(false)
  }

  function handleFilter(e) {
    let filterVal = e.target.value
    
    let curOptions = _.cloneDeep(props.options)
    curOptions = curOptions.filter(i => i[props.config.text].indexOf(filterVal) !== -1)
    setCurOptions(curOptions)
  }

  function hanldeClickOption(item) {

    // 多选
    if (props.isMultiple) {

      let { value, text } = props.config
      let clickText = item[text]
      // let clickVal = item[value]
      let index = inputValue.findIndex(i => i === clickText)
      let cloneInputVal = _.cloneDeep(inputValue)

      if (index !== -1) {
        cloneInputVal.splice(index, 1)
      } else {
        cloneInputVal.push(clickText)
      }

      setInputValue(cloneInputVal)

      // 通过多选过滤出对应的obj、value数组
      let curArr = props.options.filter(i => cloneInputVal.includes(i[text]))
      let curVal = curArr.map(i => i[value])
      props.onChange(curVal, curArr)
    } else { 
      
      // 单选
      let { value, text } = props.config
      setInputValue([item[text]])
      props.onChange(item[value], item)
      setShowOptions(false)
    }

  }

  function handleClearInput() {
    setInputValue([])
    props.onChange('')
  }

  return (
    <div
      className={`comp-select__div-wrap ${isFocus ? 'focus' : ''} ${props.error.isError ? 'error' : ''}`}
      style={{ width: props.width, height: props.height }}
      onMouseEnter={() => setShowClearIcon(true)}
      onMouseLeave={() => setShowClearIcon(false)}
      onClick={e => e.stopPropagation()} // 点击本体不冒泡
    >
      <input
        className='comp-select__input-wrap'
        value={inputValue}
        type={props.type}
        readOnly={true}
        disabled={props.disabled}
        placeholder={props.placeholder}
        style={{ width: '100%', height: '100%' }}
        onFocus={() => {
          setFocus(true)
          props.onFocus()
        }}
        onBlur={() => {
          setFocus(false)
          props.onBlur()
        }}
        onClick={e => {
          e.stopPropagation()
          setShowOptions(v => !v)
        }}
      />
      {
        !props.disabled && props.clearable && showClearIcon && !!inputValue && 
        <i className='comp-select-clearable' onClick={handleClearInput}></i>
      }
      {
        props.error.isError && <div className='comp-select-error__tip'>{props.error.msg}</div>
      }
      {
        showOptions &&
        (
          _.isArray(curOptions) &&
          <div className='comp-select-options__wrap'>
            {
              props.isFilter &&
              <input
                className='comp-select-options__filter-input'
                placeholder={props.filterPlaceholder}
                onChange={e => handleFilter(e)}
              />
            }
            {
              curOptions.length > 0 ?
                curOptions.map(item => {
                  let { value, text } = props.config

                  return (
                    <div 
                      key={item[value]}
                      className={`comp-select-options__option ${inputValue.includes(item[text]) ? 'current' : ''}`}
                      onClick={() => hanldeClickOption(item)}
                    >{ item[text] }</div>
                  )
                }) :
                <div className='comp-select-options__option no__options'>暂无匹配项</div>
            }
          </div> 
        )
      }
    </div>
  )
}

Select.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // 单选：string；多选：array
  options: PropTypes.array,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.object,
  config: PropTypes.object,
  isFilter: PropTypes.bool,
  filterPlaceholder: PropTypes.string,
  isMultiple: PropTypes.bool, // 是否多选
}

Select.defaultProps = {
  width: '100%',
  height: '40px',
  value: null,
  filterPlaceholder: '请输入',
  config: { // 配置映射关键字，默认是value、text
    value: 'value',
    text: 'text'
  },
  options: [],
  disabled: false,
  isMultiple: false,
  isFilter: false,
  clearable: true,
  placeholder: '',
  error: {
    isError: false,
    msg: ''
  },
  onChange: _.noop,
  onFocus: _.noop,
  onBlur: _.noop,
}

export default Select