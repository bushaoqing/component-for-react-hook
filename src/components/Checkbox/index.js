import _ from 'lodash'
import PropTypes from 'prop-types'
import { useState } from 'react'
import './index.css'

function Checkbox(props) {
  const [curVal, setCurVal] = useState(props.value)

  function handleClick(val) {
    if (_.isArray(props.disabled) && props.disabled.length && props.disabled.includes(val)) return

    let index = curVal.findIndex(i => i === val)
    let cloneCurVal = _.cloneDeep(curVal)

    // 存在，移除
    if (index !== -1) {
      cloneCurVal.splice(index, 1)
    } else {
      cloneCurVal.push(val)
    }

    setCurVal(cloneCurVal)
    props.onChange(cloneCurVal)
  }

  return (
    <div>
      {
        _.isArray(props.options) &&
        props.options.map((item, index) => {
          let isDisabled = props.disabled.includes(item.value)
          let isCheckedVal = curVal.some(i => i === item.value)

          return (
            <span 
              key={item.id || (item.value + index)}
              className={`comp-checkbox__single-span ${isCheckedVal ? 'current' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => handleClick(item.value)}
            >
              <span className="comp-checkbox__single-span__text" />
              { item.text }
            </span>
          )
        })
      }
    </div>
  )
}

Checkbox.propTypes = {
  value: PropTypes.array,
  options: PropTypes.array,
  disabled: PropTypes.array,
  onChange: PropTypes.func
}

Checkbox.defaultProps = {
  value: [],
  options: [],
  disabled: [],
  onChange: _.noop
}

export default Checkbox