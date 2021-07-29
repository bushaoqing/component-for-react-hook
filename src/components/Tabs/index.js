import { useState } from 'react'
import PropTypes from 'prop-types'
import './index.css'

function Tabs(props) {
  let { menu } = props

  const [curIndex, setCurIndex] = useState(0)
  const Comp = menu[curIndex].component

  return (
    <div>
      {
        Array.isArray(menu) &&
        !!menu.length &&
        <>
          <div className="comp-tabs-header-wrap">
            {
              menu.map((item, index) => (
                <span 
                  key={item.title + index} 
                  className={menu[curIndex].title === item.title ? 'comp__tabs-page-title current' : 'comp__tabs-page-title'}
                  onClick={() => setCurIndex(index)}
                >
                  {item.title}
                </span>
              ))
            }
          </div>
          <span className="comp__tabs-page-title__liner">
            <span className="comp__tabs-page-title__liner-current" style={{
              left: curIndex * 98
            }}></span>
          </span>
          {
            Comp !== null &&
            <Comp />
          }
        </>
      }
    </div>
  )
}

Tabs.propTypes = {
  menu: PropTypes.array
}

Tabs.defaultProps = {
  menu: []
}

export default Tabs