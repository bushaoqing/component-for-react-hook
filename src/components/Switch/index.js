import _ from 'lodash'
import { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import './index.css'

function Swith(props) {
  const [isOpen, setIsOpen] = useState(props.value)
  const valIsBool = useMemo(() => typeof props.value === 'boolean', [props.value])

  return (
    <div
      className={`comp-switch__wrap ${isOpen ? 'open' : 'close'} ${props.disabled ? 'disabled' : ''}`}
      onClick={() => {
        if (props.disabled) return
        props.onChange(valIsBool ? Boolean(!isOpen) : Number(!isOpen))
        setIsOpen(val => valIsBool ? Boolean(!val) : Number(!val))
      }}
    />
  )
}

Swith.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]), // 0 or 1\ true or false
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

Swith.defaultProps = {
  value: false,
  disabled: false,
  onChange: _.noop
}

export default Swith