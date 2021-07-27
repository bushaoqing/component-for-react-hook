import _ from 'lodash'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import './index.css'

function Radiobox(props) {
  const [curVal, setCurVal] = useState(props.value)

  useEffect(() => {
    setCurVal(props.value)
  }, [props.value])

  return (
    <div>
      {
        _.isArray(props.options) &&
        props.options.map((item, index) => {
          let isDisabled = props.disabled.includes(item.value)

          return (
            <span 
              key={item.id || (item.value + index)}
              className={`comp-radiobox__single-span ${curVal === item.value ? 'current' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => {
                if (isDisabled) return
                setCurVal(item.value)
                props.onChange(item.value)
              }}
            >{ item.text }</span>
          )
        })
      }
    </div>
  )
}

Radiobox.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  disabled: PropTypes.array,
  onChange: PropTypes.func
}

Radiobox.defaultProps = {
  value: '',
  options: [],
  disabled: [],
  onChange: _.noop
}

export default Radiobox