import PropTypes from 'prop-types'
import _ from 'lodash'
import './index.css'

function Button(props) {
  let { type, iconClass, text, disabled, onClick, style } = props

  return (
    <span 
      className={`comp-button-wrap__${type} ${iconClass} ${disabled ? 'disabled' : ''}`}
      style={style}
      onClick={() => {
        if (disabled) return
        onClick()
      }}
    >
      <span style={{ marginLeft: iconClass ? 4 : 0 }}>{ text }</span>
    </span>
  )
}

Button.propTypes = {
  type: PropTypes.string, // submit、cancel、text、normal --->  默认为text：table中的蓝色字体按钮
  iconClass: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object, // 自定义一些样式：font-size...
}

Button.defaultProps = {
  text: '我是测试按钮',
  type: 'text',
  onClick: _.noop
}

export default Button