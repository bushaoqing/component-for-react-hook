import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Button from '../Button'
import './index.css'

function Dialog(props) {

  return ReactDOM.createPortal((
    <div className='comp-dialog__wrap'>
      <div className='comp-dialog__center-box__wrap' style={{ width: props.width, height: props.height }}>
        <div className='comp-dialog__center-box__header'>
          <span className='comp-dialog__center-box__header-title'>{props.title}</span>
          <i className='comp-dialog__center-box__header-cancel-icon' onClick={props.onCancel} />
        </div>
        <div className='comp-dialog__center-box__body'>
          { props.children }
        </div>
        {
          !(props.hideCancel && props.hideSubmit) &&
          <div className='comp-dialog__center-box__footer'>
            {
              !props.hideCancel &&
              <span style={{ marginRight: 8 }}>
                <Button
                  type='cancel'
                  onClick={props.onCancel}
                  text={props.cancelText}
                />
              </span>
            }
            {
              !props.hideSubmit &&
              <Button
                type='submit'
                onClick={props.onSubmit}
                text={props.submitText}
              />
            }
          </div>
        }
      </div>
    </div>
  ), document.getElementById('root'))
}

Dialog.propTypes = {
  title: PropTypes.string,
  hideSubmit: PropTypes.bool,
  hideCancel: PropTypes.bool,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Dialog.defaultProps = {
  title: '信息',
  hideSubmit: false,
  hideCancel: false,
  submitText: '确认',
  cancelText: '取消',
  width: null,
  height: null,
  onSubmit: _.noop,
  onCancel: _.noop,
}

export default Dialog