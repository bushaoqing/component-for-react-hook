// 自定义操作栏
import { useState } from 'react'
import './index.css'

function Tools(props) {

  function handleDragStart(e, backgroundColor, text, style) {
    e.dataTransfer.setData("isCreate", true) // 从工具栏拉出来的图标，需要新建
    e.dataTransfer.setData("text", text)
    e.dataTransfer.setData("offsetX", e.nativeEvent.offsetX)
    e.dataTransfer.setData("offsetY", e.nativeEvent.offsetY)
    e.dataTransfer.setData("style", JSON.stringify({
      backgroundColor,
      ...style ? style : {}
    }))
  }

  return (
    <>
      <div 
        className='comp__flow-chart_tools_div' 
        style={{backgroundColor: '#666'}}
        draggable
        onDragStart={e => handleDragStart(e, '#666', '方形')}
      >
        方形
      </div>
      <div 
        className='comp__flow-chart_tools_div cycle' 
        style={{backgroundColor: 'green'}}
        draggable
        onDragStart={e => handleDragStart(e, 'green', '圆形', {borderRadius: '50%'})}
      >
        圆形
      </div>
      {/* <div 
        className='comp__flow-chart_tools_div' 
        style={{backgroundColor: 'blue'}}
        draggable
        onDragStart={e => handleDragStart(e, 'blue', '三角形')}
      >
        三角形
      </div> */}
    </>
  )
}

export default Tools