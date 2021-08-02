// 连线组件
import PropTypes from 'prop-types'
import _ from 'lodash'

function Path(props) {
  let { startP, endP } = props
  let position = { // path的4个坐标位置
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    x3: 0,
    y3: 0,
    x4: 0,
    y4: 0
  }

  // 判断 startP, endP 的合法性
  if (
    _.isArray(startP) && _.isArray(endP) &&
    startP.length === 2 && endP.length === 2 &&
    _.isNumber(+startP[0]) && _.isNumber(+startP[1]) &&
    _.isNumber(+endP[0]) && _.isNumber(+endP[1])
  ) {
    position.x1 = +startP[0]
    position.y1 = +startP[1]
    position.x4 = +endP[0]
    position.y4 = +endP[1]

    if (props.isBottomToTop) {
      position.x2 = +startP[0]
      position.y2 = (+endP[1] + +startP[1]) / 2
      position.x3 = +endP[0]
      position.y3 = (+endP[1] + +startP[1]) / 2
    } else {
      position.x2 = (+startP[0] + +endP[0]) / 2
      position.y2 = +startP[1]
      position.x3 = (+startP[0] + +endP[0]) / 2
      position.y3 = +endP[1]
    }
  }

  return (
    <svg style={{ position: 'absolute', overflow: 'visible', width: '1px', height: '1px' }}>
      <defs>
        <marker 
          id="markertriangle" 
          refX="8" 
          refY="4" 
          markerHeight="12" 
          markerWidth="12" 
          orient="auto" 
          style={{ zIndex: 9000 }}
        >
          <path d="M 0 0 8 4 0 8 2 4" fill="#4d4d4d" />
        </marker>
      </defs>
      {/* <!--C命令：三次贝塞尔曲线 (x1,y1,x2,y2,x3,y3,x4,y4)/ x1,y1 开始点 /x2,y2 控制点二 /x3,y3 控制点三 /x4,y4 结束点 --> */}
      <path
        markerEnd='url(#markertriangle)' 
        // d='M0 0 C100 30 150 170 200 200' 
        // d={`M${position.x1},${position.y1},${position.x4},${position.y4}`}
        d={`M${position.x1},${position.y1},C${position.x2},${position.y2},${position.x3},${position.y3},${position.x4},${position.y4}`}
        style={{
          stroke:'#ddd',
          strokeWidth:'1.6',
          fill:'none'
        }}
      />
      {/* 折线 */}
      {/* <polyline 
        markerEnd='url(#markertriangle)' 
        points={`${position.x1},${position.y1} ${position.x2},${position.y2} ${position.x3},${position.y3} ${position.x4},${position.y4}`}
        style={{
          stroke:'#ddd',
          strokeWidth:'1.6',
          fill:'none'
        }} 
      /> */}
    </svg>
  )
}

Path.propTypes = {
  startP: PropTypes.array, // 线段开始坐标（相对于FlowChart组件的div，取相对位置）
  endP: PropTypes.array, // 线段结束坐标
  isBottomToTop: PropTypes.bool
}

Path.defaultProps = {
  startP: [0, 0],
  endP: [0, 0],
  isBottomToTop: true
}

export default Path