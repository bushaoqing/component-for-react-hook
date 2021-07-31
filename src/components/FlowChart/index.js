import { useLayoutEffect, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Path from './Path'
import Tools from './Tools'
import './index.css'

let isFirst = true

function FlowChart(props) {
  let { width, height, style } = props

  const [startP, setStartP] = useState(null)
  const [endP, setEndP] = useState(null)

  useLayoutEffect(() => {
    let bodyNode = document.getElementsByClassName('comp__flow-chart-wrap_body')[0]

    // 默认情况下,数据/元素不能在其他元素中被拖放。对于drop我们必须防止元素的默认处理
    document.addEventListener("dragover", function(event) {
      event.preventDefault();
    });

    document.addEventListener('drop', function(event) {
      event.preventDefault()
      if (event.target.className === "comp__flow-chart-wrap_body") {
        var isCreate = event.dataTransfer.getData("isCreate") // 从工具栏拖过来的需要新建，画布中的只需要移动
        var color = event.dataTransfer.getData("color")
        var offsetX = event.dataTransfer.getData("offsetX")
        var offsetY = event.dataTransfer.getData("offsetY")
        
        // console.log('--------------drop: ', isCreate, event)
        if (isCreate) {
          let newNode = document.createElement('div')
          newNode.style.position='absolute'
          newNode.style.left=`${event.offsetX - offsetX}px`
          newNode.style.top=`${event.offsetY - offsetY}px`
          newNode.style.backgroundColor=color
          newNode.style.display='inline-block'
          newNode.style.color="#fff"
          newNode.style.margin='4px'
          newNode.style.padding='6px'
          newNode.style.boxSizing='border-box'
          newNode.style.width='60px'
          newNode.style.height='60px'
          newNode.id=Date.now() // 生成唯一标识id，用于之后移动元素
          newNode.draggable=true
          newNode.textContent=color
  
          newNode.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData("Text", e.target.id)
            e.dataTransfer.setData("color", color)
            e.dataTransfer.setData("offsetX", e.offsetX)
            e.dataTransfer.setData("offsetY", e.offsetY)
          })

          // 创建4个span（上下左右各一个），用于连线
          for (let index = 0; index < 4; index++) {
            let newSpan = document.createElement('span')
            newSpan.style.position='absolute'
            newSpan.style.background='#fff'
            newSpan.style.width='8px'
            newSpan.style.height='8px'
            newSpan.style.borderRadius='50%'
            newSpan.style.border='1px solid #ddd'
            switch (index) {
              case 0: // 上
                newSpan.style.left=`calc(50% - 4px)`
                newSpan.style.top=`-4px`
                break;
              
              case 1: // 右
                newSpan.style.top=`calc(50% - 4px)`
                newSpan.style.right=`-4px`
                break;

              case 2: // 下
                newSpan.style.left=`calc(50% - 4px)`
                newSpan.style.bottom=`-4px`
                break;

              case 3: // 左
                newSpan.style.top=`calc(50% - 4px)`
                newSpan.style.left=`-4px`
                break;
            
              default:
                break;
            }

            // 点的绑定事件
            newSpan.addEventListener('click', function (e) {
              e.stopPropagation()
              console.log('click', e);
              if (isFirst) {
                setStartP([e.clientX - 364, e.clientY - 23])
              } else {
                setEndP([e.clientX - 364, e.clientY - 23])
              }
              isFirst = !isFirst
            })
            newNode.appendChild(newSpan)
          }
          bodyNode.appendChild(newNode)
        } else {
          var data = event.dataTransfer.getData("Text")
          let moveNode = document.getElementById(data)
          moveNode.style.left=`${event.offsetX - offsetX}px`
          moveNode.style.top=`${event.offsetY - offsetY}px`
          event.target.appendChild(moveNode)
        }

      }
    })
  }, [])


  return (
    <div className='comp__flow-chart-wrap'>
      <div 
        className='comp__flow-chart-wrap_tools'
        style={{
          height: height,
        }}
      >
        <Tools />
      </div>
      <div 
        className='comp__flow-chart-wrap_body' 
        style={{
          position: 'relative',
          width,
          height,
          boxSizing: 'border-box',
          ...style
        }}
      >
        {
          startP !== null &&
          endP !== null &&
          <Path startP={startP} endP={endP} />
        }
      </div>
    </div>
  )
}

FlowChart.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object
}

FlowChart.defaultProps = {
  width: 800,
  height: 600,
  style: {}
}

export default FlowChart