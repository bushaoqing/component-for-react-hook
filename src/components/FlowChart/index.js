import { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import Path from './Path'
import Tools from './Tools'
import _ from 'lodash'
import { getPosition, Position } from './util/common'
import './index.css'

function FlowChart(props) {
  let { width, height, style } = props
  const [record, setRecord] = useState([]) // 存储数据
  const [pathArr, setPathArr] = useState([])
  const [prevBegin, setPrevBegin] = useState({}) // 临时存储出发点
  const [mouseP, setMouseP] = useState([]) // 时刻记录鼠标的位置
  const [showTimePath, setShowTimePath] = useState(false) // 时刻记录鼠标的位置

  function handleDrop(event) {
    // console.log('handleDrop: ', event)
    event.preventDefault()
    if (event.target.className === "comp__flow-chart-wrap_body") {
      var isCreate = event.dataTransfer.getData("isCreate") // 从工具栏拖过来的需要新建，画布中的只需要移动
      var offsetX = event.dataTransfer.getData("offsetX")
      var offsetY = event.dataTransfer.getData("offsetY")
      let left = event.nativeEvent.offsetX - offsetX
      let top = event.nativeEvent.offsetY - offsetY
      
      // 创建一个div
      if (isCreate) {
        var color = event.dataTransfer.getData("color")
        let obj = {
          id: Date.now(), // 生成唯一标识id，用于之后移动元素
          style: {
            left: left,
            top: top,
            backgroundColor: color,
            padding: 6,
            width: 60,
            height: 60
          },
          textContent: color
        }

        setRecord(v => [...v, obj])
      } else {
        // 移动一个div的位置
        // 更新id对应的position
        var index = event.dataTransfer.getData("index")
        var ID = event.dataTransfer.getData("ID")
        // 更新id对应的position
        if (!_.isEmpty(record[index]) && _.isEqual(+record[index].id, +ID)) {
          let cloneRecord = _.cloneDeep(record)
          cloneRecord[index].style.left = left
          cloneRecord[index].style.top = top
          setRecord(cloneRecord)
        }
      }
    }
  }

  function handleDragStart(e, obj, index) {
    e.dataTransfer.setData("index", index)
    e.dataTransfer.setData("ID", obj.id)
    e.dataTransfer.setData("offsetX", e.nativeEvent.offsetX)
    e.dataTransfer.setData("offsetY", e.nativeEvent.offsetY)
  }

  function handleMouseDown(id, position) {
    setPrevBegin({
      beginID: id,
      beginPosition: position
    })
  }

  function handleMouseUp(id, position) {
    // console.log(id, position, prevBegin);

    // 结束点的id不能和出发点一样（表示不同的div相连）
    let notSameNode = prevBegin.beginID !== id
    // 当前的连线不存在（不重复）
    let notHave = !pathArr.some(path => path.beginID === prevBegin.beginID && path.endID === id)
    if (prevBegin.beginID && id && notSameNode && notHave) {
      let clonePathArr = _.cloneDeep(pathArr)
      clonePathArr.push({
        ...prevBegin,
        endID: id,
        endPosition: position
      })
      setPathArr(clonePathArr)
      setPrevBegin({})
    }
  }

  function handleUpate(id, value) {
    let cloneRecord = _.cloneDeep(record)
    let index = cloneRecord.findIndex(i => i.id === id)
    if (index !== -1) {
      cloneRecord[index].textContent = value
      setRecord(cloneRecord)
    }
  }

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
        onDrop={e => handleDrop(e)}
        onDragOver={e => e.preventDefault()}
        onMouseMove={e => {
          if (showTimePath) setMouseP([e.nativeEvent.offsetX, e.nativeEvent.offsetY])}
        }
        onMouseDown={e => {
          e.stopPropagation()
          setShowTimePath(true)
        }}
        onMouseUp={e => {
          e.stopPropagation()
          setShowTimePath(false)
          setPrevBegin({})
        }}
      >
        {
          _.isArray(record) &&
          record.length > 0 &&
          record.map((obj, index) => {
            
            return (
              <div 
                key={obj.id} 
                style={obj.style} 
                className="comp__flow-chart__obj-wrap" 
                onMouseEnter={() => setShowTimePath(false)}
                onMouseLeave={() => setShowTimePath(true)}
              >
                <div
                  contentEditable
                  suppressContentEditableWarning // 避免因为contentEditable产生的warn
                  onBlur={e => handleUpate(obj.id, e.target.textContent)} // 修改textContent
                  id={obj.id}
                  className="comp__flow-chart__obj-wrap__div"
                  draggable={true}
                  onDragStart={e => handleDragStart(e, obj, index)}
                >{obj.textContent}</div>
                {
                  ['top', 'right', 'bottom', 'left'].map(key => (
                    <span 
                      key={key}
                      className={`comp__flow-chart_obj-point ${key}`} 
                      onMouseDown={() => handleMouseDown(obj.id, key)}
                      onMouseUp={() => handleMouseUp(obj.id, key)}
                      onMouseMove={e => {
                        e.stopPropagation()
                        setMouseP([])
                      }}
                    />
                  ))
                }
              </div>
            )
          })
        }
        {
          _.isArray(pathArr) &&
          pathArr.length > 0 &&
          pathArr.map(path => {
            let startP = []
            let endP = []
            if (!_.isEmpty(path)) {
              let { beginID, beginPosition, endID, endPosition } = path
              startP = getPosition(record, beginID, beginPosition)
              endP = getPosition(record, endID, endPosition)
            } 
            // console.log('********** ', startP, endP, path);

            return (
              <Fragment key={path.beginID + path.endID}>
                {
                  _.isArray(startP) &&
                  startP.length > 0 &&
                  _.isArray(endP) &&
                  endP.length > 0 &&
                  <Path startP={startP} endP={endP} isToBottom={[Position.top, Position.bottom].includes(path.endPosition)} />
                }
              </Fragment>
            )
          })
        }
        {
          // 一条描绘鼠标即将连接的path线条
          showTimePath &&
          !_.isEmpty(prevBegin) &&
          _.isArray(mouseP) &&
          mouseP.length > 0 &&
          <Path startP={getPosition(record, prevBegin.beginID, prevBegin.beginPosition)} endP={mouseP} />
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