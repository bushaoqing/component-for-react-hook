import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './index.css'

function Input(props) {
  const [inputValue, setInputValue] = useState(props.value)
  const [showClearIcon, setShowClearIcon] = useState(false)
  const [isFocus, setFocus] = useState(false)

  useEffect(() => {
    setInputValue(props.value)
  }, [props.value])

  function handleChange (e) {
    let val = e.target.value

    setInputValue(val)
    props.onChange(val)
  }

  function handleClearInput() {
    setInputValue('')
    props.onChange('')
  }

  return (
    <div
      className={`comp-input__div-wrap ${isFocus ? 'focus' : ''} ${props.error.isError ? 'error' : ''}`}
      style={{ width: props.width, height: props.height }}
      onMouseEnter={() => setShowClearIcon(true)}
      onMouseLeave={() => setShowClearIcon(false)}
    >
      <input
        className='comp-input__input-wrap'
        value={inputValue}
        type={props.type}
        disabled={props.disabled}
        placeholder={props.placeholder}
        style={{ width: '100%', height: '100%' }}
        onChange={e => handleChange(e)}
        onFocus={() => {
          setFocus(true)
          props.onFocus()
        }}
        onBlur={() => {
          setFocus(false)
          props.onBlur()
        }}
      />
      {
        !props.disabled && props.clearable && showClearIcon && !!inputValue && 
        <i className='comp-input-clearable' onClick={handleClearInput}></i>
      }
      {
        props.error.isError && <div className='comp-input-error__tip'>{props.error.msg}</div>
      }
    </div>
  )
}

Input.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.object
}

Input.defaultProps = {
  width: '100%',
  height: '40px',
  value: '',
  disabled: false,
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

export default Input