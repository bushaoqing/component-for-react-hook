import { useState } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

export default function Popover(props) {

  const [position, setPosition] = useState({})

  return (
    <div
      style={{ display: 'inline-block', lineHeight: 'initial' }}
      onMouseEnter={e => setPosition({
        x: e.clientX,
        y: e.clientY
      })}
      onMouseLeave={() => setPosition({})}
    >
      {props.children}
      {
        !!props.tip &&
        !!position.x &&
        !!position.y &&
        <ShowTip {...props} position={position} />
      }
    </div>
  )
}

function ShowTip({ tip = '', position = {} }) {
  
  let clientX = position.x
  let clientY = position.y

  return ReactDOM.createPortal(
    (<div
      style={{
        left: `${clientX}px`,
        top: `${clientY - 16}px`
      }}
      className="comp-popover__wrap"
    >
      <span>{tip}</span>
    </div>),
    document.body
  )
}
