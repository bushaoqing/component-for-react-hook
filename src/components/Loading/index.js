import PropTypes from 'prop-types'
import './index.css'

function Loading(props) {


  return (
    <div className="comp-loading__wrap">
      {
        props.isLoading &&
        <div className="comp-loading__isLoading">
          <div className="comp-loading__isLoading-center-box">
            {
              !props.hideIcon &&
              <span className="comp-loading__isLoading-icon" />
            }
            {
              !props.hideIcon && !!props.tip && <br/>
            }
            {
              !!props.tip &&
              <span className="comp-loading__isLoading-tip">{ props.tip }</span>
            }
          </div>
        </div>
      }
      { props.children }
    </div>
  )
}

Loading.propsTypes = {
  isLoading: PropTypes.bool,
  tip: PropTypes.string,
  hideIcon: PropTypes.bool
}

Loading.defaultProps = {
  isLoading:false,
  tip: '',
  hideIcon: false
}

export default Loading