import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './index.css'

const defaultValue = {
  ids: [], // 当前的id数组
  texts: [], // 当前的text数组
  clickItem: {} // 当前点击的叶子节点对象
}

function Cascader(props) {
  const [curOptions, setCurOptions] = useState([props.options])
  const [filterVal, setfilterVal] = useState('')
  const [filterOptions, setFilterOptions] = useState([props.options]) // 存储删选后的options
  const [inputValue, setInputValue] = useState(initInputVal) // { ids: [], texts: [], clickItem: {} }

  const [showClearIcon, setShowClearIcon] = useState(false)
  const [isFocus, setFocus] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    document.addEventListener('click', onDocumentClick)
    return () => {
      document.removeEventListener('click', onDocumentClick)
    }
  }, [])

  // 根据父组件传递的ids，初始化对应的texts
  function initInputVal() {
    let val = _.cloneDeep(defaultValue)

    if (_.isArray(props.value.ids) && props.value.ids.length && _.isArray(props.options) && props.options.length) {
      let { options, value } = props
      let cloneCurOptions = _.cloneDeep(curOptions)   
      let { texts, newCurOptions } = getTextsByIds(options, value.ids, [], 0, cloneCurOptions)
      
      if (_.isArray(texts) && texts.length) {
        val = {
          ids: props.value.ids,
          texts,
          clickItem: {}
        }
        setCurOptions(newCurOptions)
      }
    }
    return val
  }

  // 不仅需要返回对应的texts，还需要将对应的children插入curOptions中，以便下拉展示对应的层级
  function getTextsByIds(list, ids, texts = [], indexLevel = 0, newCurOptions = []) {
    let { id, text, children } = props.config
    list.forEach(obj => {
      if (obj[id] === ids[indexLevel]) {
        texts.push(obj[text])

        if (_.isArray(obj[children]) && obj[children].length) {
          
          // 这里插入curOptions中
          newCurOptions.splice((indexLevel + 1), 1, obj[children])

          getTextsByIds(obj[children], ids, texts, ++indexLevel, newCurOptions)
        }
      }
    })
    return { texts, newCurOptions }
  }

  function onDocumentClick() {
    setfilterVal('')
    setShowOptions(false)
  }

  // 优化点：防抖
  function handleFilter(e) {
    let filterVal = _.trim(e.target.value)
    setfilterVal(filterVal)

    let cloneArr = _.cloneDeep(props.options) || []
    if (_.isArray(cloneArr) && cloneArr.length) {
      cloneArr = cloneArr.filter(i => i[props.config.text].indexOf(filterVal) !== -1)
      setFilterOptions([cloneArr])
    }
  }

  function hanldeClickOption(item, level = -1) {
    let children = _.isArray(item.children) ? item.children : []
    let cloneCurOptions = _.cloneDeep(curOptions)
    let cloneInputValue = _.cloneDeep(inputValue)
    let { ids, texts } = cloneInputValue
    let { id, text } = props.config

    // 根据level截取对应的ids、texts：当ids有值 且 点击的非第一层
    if (_.isArray(ids) && ids.length && level > 1) {
      ids = ids.slice(0, level - 1)
      texts = texts.slice(0, level - 1)
    } else {
      ids = []
      texts = []
    }

    // 处理curValObj
    let curValObj = {
      ids: ids.concat(item[id]),
      texts: texts.concat(item[text]),
      clickItem: item
    }

    setInputValue(curValObj)

    // 说明点击的还有children
    if (children.length && level !== -1) {
      cloneCurOptions = cloneCurOptions.slice(0, level).concat([children])
      setCurOptions(cloneCurOptions)
    } else {

      // 点击的叶子节点
      setShowOptions(false)
    }
    setfilterVal('')
    props.onChange(curValObj)
  }

  function handleClearInput() {
    setInputValue(defaultValue)
    props.onChange(defaultValue)
  }

  let curShowOptions = !filterVal ? curOptions : filterOptions
  return (
    <div
      className={`comp-cascader__div-wrap ${isFocus ? 'focus' : ''} ${props.error.isError ? 'error' : ''}`}
      style={{ width: props.width, height: props.height }}
      onMouseEnter={() => setShowClearIcon(true)}
      onMouseLeave={() => setShowClearIcon(false)}
      onClick={e => e.stopPropagation()} // 点击本体不冒泡
    >
      <input
        className='comp-cascader__input-wrap'
        value={_.isArray(inputValue.texts) && inputValue.texts.join(' / ') || ''}
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
        !props.disabled && props.clearable && showClearIcon && !!(_.isArray(inputValue.texts) && inputValue.texts.join(' / ')) && 
        <i className='comp-cascader-clearable' onClick={handleClearInput}></i>
      }
      {
        props.error.isError && <div className='comp-cascader-error__tip'>{props.error.msg}</div>
      }
      {
        showOptions &&
        (
          _.isArray(curOptions) &&
          <div className='comp-cascader-options__wrap'>
            {
              props.isFilter &&
              <input
                className='comp-cascader-options__filter-input'
                placeholder={props.filterPlaceholder}
                onChange={e => handleFilter(e)}
              />
            }
            {
              curOptions.length === 0 &&
              <div className='comp-cascader-options__option no__options'>暂无数据</div>
            }

            <div className="comp-cascader-options__option-wrap-div">
              {
                curShowOptions.length >= 1 &&
                curShowOptions.map((option, level) => {
                  let defaultWidth = `${100 / curShowOptions.length}%`

                  return (
                    <div 
                      key={level} 
                      className="comp-cascader-options__option-wrap-box"
                      style={{
                        width: defaultWidth
                      }}
                    >
                      {
                        option.map(item => {
                          let { id, text, children } = props.config
                          let { arr, key, tip } = props.disabledObj
          
                          let isDisabled = arr.some(i => i === item[key])
                          let isCurrent = _.isArray(inputValue.texts) && inputValue.texts.includes(item[text])           
          
                          return (
                            isDisabled ?
                            <div 
                              className='comp-cascader-options__option__disabled'
                              
                              key={item[id]}
                              title={tip || item[text]}
                            >{ item[text] }</div> :
                            <div 
                              key={item[id]}
                              title={item[text]}
                              className={`comp-cascader-options__option ${isCurrent ? 'current' : ''}`}
                              onClick={() => hanldeClickOption(item, (level + 1))} // 1：标识当前点击的是第一层及，对应curOptions[0]
                            >{ item[text] }</div>
                          )
                        })
                      }
                    </div>
                  )
                })
              }
            </div>
          </div> 
        )
      }
    </div>
  )
}

Cascader.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.object,
  options: PropTypes.array,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.object,
  config: PropTypes.object,
  isFilter: PropTypes.bool,
  filterPlaceholder: PropTypes.string,
  disabledObj: PropTypes.object
}

Cascader.defaultProps = {
  width: '100%',
  height: '40px',
  value: defaultValue,
  filterPlaceholder: '请输入',
  config: { // 配置映射关键字，默认是value、text、children
    id: 'id',
    text: 'text',
    children: 'children'
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
  disabledObj: {
    arr: [], // 禁用数组
    key: '', // 与data备选项中的哪个字段比较
    tip: '', // 禁用提示语
  },
  onChange: _.noop,
  onFocus: _.noop,
  onBlur: _.noop,
}

export default Cascader