import { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import Path from './Path'
import Tools from './Tools'
import _ from 'lodash'
import { getPosition, Position } from './util/common'
import Dialog from '../Dialog'
import DeleteDialog from './Tools/DeleteDialog'
import EditDialog from './Tools/EditDialog'
import './index.css'

function FlowChart(props) {
  let { width, height, style } = props
  const [record, setRecord] = useState([]) // 存储数据（界面的div信息）
  const [pathArr, setPathArr] = useState([]) // 存储的连线（一般从接口拿取，然后组合成自己想要的样子）
  const [prevBegin, setPrevBegin] = useState({}) // 临时存储出发点
  const [mouseP, setMouseP] = useState([]) // 时刻记录鼠标的位置
  const [showTimePath, setShowTimePath] = useState(false) // 是否显示动态的连线
  const [isEnterDiv, setIsEnterDiv] = useState(false) // 动态连线的一个优化项
  const [visible, setVisible] = useState(false) // 删除连线是否显示确认弹窗
  const [curClickPath, setCurClickPath] = useState({}) // 存储当前点击的连线的信息
  const [curEnterDivID, setCurEnterDivID] = useState('') // 存储当前鼠标进入的div的id，用于点的显隐
  const [isDeletePath, setIsDeletePath] = useState(false) // 是否是删除连线
  const [editVisible, setEditVisible] = useState(false) // 是否显示编辑div弹窗

  function handleDrop(event) {
    event.preventDefault()
    if (event.target.className === "comp__flow-chart-wrap_body") {
      var isCreate = event.dataTransfer.getData("isCreate") // 从工具栏拖过来的需要新建，画布中的只需要移动
      var offsetX = event.dataTransfer.getData("offsetX")
      var offsetY = event.dataTransfer.getData("offsetY")
      let left = event.nativeEvent.offsetX - offsetX
      let top = event.nativeEvent.offsetY - offsetY
      
      // 创建一个div
      if (isCreate) {
        var text = event.dataTransfer.getData("text")
        var style = event.dataTransfer.getData("style")
        // console.log('style: ', JSON.parse(style));
        let obj = {
          id: Date.now(), // 生成唯一标识id，用于之后移动元素
          style: {
            ...JSON.parse(style),
            left: left,
            top: top,
            padding: 6,
            width: 60,
            height: 60
          },
          textContent: text
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
    // console.log('handleMouseUp: ', id, position, prevBegin);

    // 结束点的id不能和出发点一样（表示不同的div相连）
    let notSameNode = prevBegin.beginID !== id
    // 两个div之间有且仅有一条连线
    let notHave = !pathArr.some(path => (path.beginID === prevBegin.beginID && path.endID === id) || (path.beginID === id && path.endID === prevBegin.beginID))
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

  // 删除连线
  function onDeletePath(list = []) {
    let clonePathArr = _.cloneDeep(pathArr)
    
    list.forEach(l => {
      let index = clonePathArr.findIndex(p => p.beginID === l.beginID && p.endID === l.endID)
      if (index !== -1) {
        clonePathArr.splice(index, 1)
      }
    })

    setPathArr(clonePathArr)
  }

  // 删除DIV
  function onDeleteDiv() {
    // 1、删除div上的连线
    let delArr = pathArr.filter(p => [p.beginID, p.endID].includes(curEnterDivID))
    if (delArr.length) onDeletePath(delArr)

    // 2、删除DIV
    let cloneRecord = _.cloneDeep(record)
    let delIndex = cloneRecord.findIndex(r => r.id === curEnterDivID)
    if (delIndex !== -1) {
      cloneRecord.splice(delIndex, 1)
      setRecord(cloneRecord)
    }
  }
  
  // 删除此条连线
  function handleSubmit() {
    if (isDeletePath) {
      onDeletePath([curClickPath])
    } else {
      onDeleteDiv()
    }
    setVisible(false)
  }
  
  // 编辑div
  function handleEditSubmit(newRecord) {
    setRecord(newRecord)
    setEditVisible(false)
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
          width,
          height,
          ...style
        }}
        onDrop={e => handleDrop(e)}
        onDragOver={e => e.preventDefault()}
        onMouseMove={e => {
          if (showTimePath && !isEnterDiv) setMouseP([e.nativeEvent.offsetX, e.nativeEvent.offsetY])}
        }
        onMouseDown={e => {
          e.stopPropagation()
          setShowTimePath(true)
        }}
        onMouseUp={e => {
          e.stopPropagation()
          setShowTimePath(false)
          setPrevBegin({})
          setMouseP([])
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
                onMouseEnter={() => {
                  setIsEnterDiv(true)
                  setCurEnterDivID(obj.id)
                }}
                onMouseLeave={() => setIsEnterDiv(false)}
                onMouseUp={() => setMouseP([])} // 动态线消失
              >
                <div
                  contentEditable
                  style={{
                    width: obj.style.width
                  }} 
                  suppressContentEditableWarning // 避免因为contentEditable产生的warn
                  onBlur={e => handleUpate(obj.id, e.target.textContent)} // 修改textContent
                  id={obj.id}
                  className="comp__flow-chart__obj-wrap__div"
                  draggable={true}
                  onDragStart={e => handleDragStart(e, obj, index)}
                  onDoubleClick={() => setEditVisible(true)}
                >{obj.textContent}</div>
                {
                  isEnterDiv &&
                  obj.id === curEnterDivID &&
                  ['top', 'right', 'bottom', 'left'].map(key => (
                    <span 
                      key={key}
                      className={`comp__flow-chart_obj-point ${key}`} 
                      onMouseDown={() => handleMouseDown(obj.id, key)}
                      onMouseUp={() => handleMouseUp(obj.id, key)}
                    />
                  ))
                }
                {
                  isEnterDiv &&
                  obj.id === curEnterDivID &&
                  <span 
                    className='comp__flow-chart_obj-delete-icon' 
                    onClick={() => {
                      setVisible(true)
                      setIsDeletePath(false)
                    }}
                  />
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
                  <Path startP={startP} endP={endP} isToBottom={[Position.top, Position.bottom].includes(path.endPosition)} onClick={() => {
                    setVisible(true)
                    setCurClickPath(path)
                    setIsDeletePath(true)
                  }} />
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
      {
        visible &&
        <DeleteDialog
          isDeletePath={isDeletePath}
          handleSubmit={handleSubmit}
          setVisible={setVisible}
          record={record}
          curClickPath={curClickPath}
          curEnterDivID={curEnterDivID}
        />
      }
      {
        editVisible &&
        <EditDialog
          handleSubmit={handleEditSubmit}
          setVisible={setEditVisible}
          record={record}
          curEnterDivID={curEnterDivID}
        />
      }
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