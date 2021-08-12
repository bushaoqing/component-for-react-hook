import PropTypes from 'prop-types'
import noDataImg from './img/no_data@2x.png'
import planImg from './img/plan@2x.png'
import noAuthImg from './img/no_auth@2x.png'
import netAbnormalImg from './img/net_abnormal@2x.png'
import dataAbnormalImg from './img/data_abnormal@2x.png'
import emptyLeftImg from './img/empty_left@2x.png'
import noSearchImg from './img/no_search@2x.png'

import './index.css'

const IMG_MAP = {
  noData: noDataImg,
  plan: planImg,
  noAuth: noAuthImg,
  netAbnormal: netAbnormalImg,
  dataAbnormal: dataAbnormalImg,
  emptyLeft: emptyLeftImg,
  noSearch: noSearchImg,
}

function Empty(props) {
  let { height, hideImage, innerWidth, icon, hideText, text } = props

  return (
    <div style={{ height }} className="comp-empty__wrap">
      <div className="comp-empty__center-img-wrap" style={{
        height: hideImage ? '20px' : '168px',
        width: innerWidth
      }}>
        {
          !hideImage && <img src={ IMG_MAP[icon] } />
        }
        {
          !hideText && <div>{ text }</div>
        }
        {
          props.children
        }
      </div>
    </div>
  )
}

Empty.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hideImage: PropTypes.bool,
  innerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.string,
  hideText: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

Empty.defaultProps = {
  height: '',
  hideImage: false,
  innerWidth: 200,
  icon: 'noData',
  hideText: false,
  text: '暂无数据'
}

export default Empty