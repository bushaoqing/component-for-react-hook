import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './index.css'

let isClickFilter = false

function Select(props) {
  const [inputValue, setInputValue] = useState(() => {
    let { value, options, config } = props
    let initArr = options.filter(i => i[config.value] === value)
    let initVal = initArr[0] && initArr[0][config.text] || ''
    return initVal
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
    if (!isClickFilter) {
      setShowOptions(false)
    } else {
      isClickFilter = false
    }
  }

  function handleFilter(e) {
    let filterVal = e.target.value
    
    let curOptions = _.cloneDeep(props.options)
    curOptions = curOptions.filter(i => i[props.config.text].indexOf(filterVal) !== -1)
    setCurOptions(curOptions)
  }

  function handleClearInput() {
    setInputValue('')
    props.onChange('')
  }

  return (
    <div
      className={`comp-select__div-wrap ${isFocus ? 'focus' : ''} ${props.error.isError ? 'error' : ''}`}
      style={{ width: props.width, height: props.height }}
      onMouseEnter={() => setShowClearIcon(true)}
      onMouseLeave={() => setShowClearIcon(false)}
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
                onClick={() => {
                  isClickFilter = true
                }}
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
                      className={`comp-select-options__option ${inputValue === item[text] ? 'current' : ''}`}
                      onClick={() => {
                        setInputValue(item[text])
                        props.onChange(item[value], item)
                      }}
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
  value: PropTypes.string,
  options: PropTypes.array,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.object,
  config: PropTypes.object,
  isFilter: PropTypes.bool,
  filterPlaceholder: PropTypes.string
}

Select.defaultProps = {
  width: '100%',
  height: '40px',
  value: '',
  filterPlaceholder: '请输入',
  config: { // 配置映射关键字，默认是value、text
    value: 'value',
    text: 'text'
  },
  options: [],
  disabled: false,
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