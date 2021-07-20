import React, { useState } from 'react'
import PropTypes from 'prop-types'
import USERIMG from '../img/copy@2x.png'
import './index.css'

function CopyText(props) {

  let [isCopy, setIsCopy] = useState(false)
  let [isShowTip, setIsShowTip] = useState(false)

  function handleCopy () {

    !!props.copyText && copyToClipboard(props.copyText)
    setIsCopy(true)
  }

  return (
    <div style={{ position: 'absolute', display: 'inline-block' }}>
      <img 
        className="comp-copy-text__user-img" 
        src={USERIMG}
        onClick={handleCopy}
        onMouseLeave={() => {
          setIsCopy(false)
          setIsShowTip(false)
        }}
        onMouseEnter={() => setIsShowTip(true)}
      ></img>
      {
        isShowTip && <div className="suspend">
          <span>{isCopy ? '复制成功' : !!props.copyTip ? props.copyTip : '点击复制'}</span>
        </div>
      }
    </div>
  )
}

function copyToClipboard(value) {
  const input = document.createElement('input')
  input.style.position = 'fixed'
  input.style.top = '-99999px'
  input.style.left = '-99999px'
  input.value = value
  document.body.append(input)
  input.select()
  document.execCommand('copy')
  input.parentNode.removeChild(input)
}

CopyText.propTypes = {
  copyTip: PropTypes.string,
  isShowTip: PropTypes.bool
}

CopyText.defaultProps = {
  copyText: '我是测试文本'
}

export default CopyText