import { useState } from 'react'
import './index.css'

function Tools(props) {

  function handleDragStart(e, color) {
    e.dataTransfer.setData("isCreate", true) // 从工具栏拉出来的图标，需要新建
    e.dataTransfer.setData("color", color)
    e.dataTransfer.setData("offsetX", e.nativeEvent.offsetX)
    e.dataTransfer.setData("offsetY", e.nativeEvent.offsetY)
  }

  return (
    <>
      <div 
        className='comp__flow-chart_tools_div' 
        style={{backgroundColor: 'red'}}
        draggable
        onDragStart={e => handleDragStart(e, 'red')}
      >
        red
      </div>
      <div 
        className='comp__flow-chart_tools_div' 
        style={{backgroundColor: 'green'}}
        draggable
        onDragStart={e => handleDragStart(e, 'green')}
      >
        green
      </div>
      <div 
        className='comp__flow-chart_tools_div' 
        style={{backgroundColor: 'blue'}}
        draggable
        onDragStart={e => handleDragStart(e, 'blue')}
      >
        blue
      </div>
    </>
  )
}

export default Tools