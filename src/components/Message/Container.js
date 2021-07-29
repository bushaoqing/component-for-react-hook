import { useState, useEffect } from 'react'
import { isArray, isEqual, assign, cloneDeep } from 'lodash'

import './index.css'

function Container(props) {

  const [messageArr, setMessageArr] = useState([])

  useEffect(() => {
    let { info } = props
    // console.log('info: ', info);
    let ID = +new Date()
    let newMessage = [...cloneDeep(messageArr), assign({}, info, {id: ID})]
    setMessageArr(newMessage)
  }, [props.info])

  // 给个定时器：每隔3s掉一下方法，清除非error提示
  useEffect(() => {
    if (!messageArr.length) return
    let delIndex = messageArr.findIndex(i => i.type !== 'error')
    let TimeOut = null
    let cloneMessageArr = cloneDeep(messageArr)
    
    if (delIndex !== -1) {
      cloneMessageArr.splice(delIndex, 1)
      TimeOut = setTimeout(() => {
        setMessageArr(cloneMessageArr)
        console.log('setTimeout还在哦！请关闭它！！')
      }, 3000)
    }
    return () => {
      if (TimeOut) clearTimeout(TimeOut) // 重要：清除定时器
    }
  }, [messageArr])

  function clearMsg(ID) {
    let delIndex = messageArr.findIndex(i => isEqual(i.id, ID))

    if (!isEqual(delIndex, -1)) {
      let arr = cloneDeep(messageArr)
      arr.splice(delIndex, 1)
      setMessageArr(arr)
    }
  }

  return (
    isArray(messageArr) &&
    !!messageArr.length &&
    messageArr.map((info, index) => (
      <div
        key={info.id}
        style={{
          marginTop: 60 * index
        }}
        className={`comp_message-box-wrap ${info.type}-message`}
      >
        { info.msg }
        {
          isEqual(info.type, 'error') &&
          <i className="comp_message-error-closer" onClick={() => clearMsg(info.id)} />
        }
      </div>
    ))
  )
}

export default Container
