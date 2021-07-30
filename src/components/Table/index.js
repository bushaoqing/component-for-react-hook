import { useState, Fragment } from 'react'
import PorpTypes from 'prop-types'
import _ from 'lodash'
import Popover from '../Popover'
import './index.css'

function Table(props) {
  let { tHeader, options } = props


  return (
    <div className="comp__table-outer-div-wrap">
      <table className="comp__table-wrap" border="0" cellSpacing="0">
        <thead>
          <tr>
            {
              _.isArray(tHeader) &&
              tHeader.length > 0 &&
              tHeader.map(item => {
                // 固定列判定
                let isFixed = item.fixed
                let fixedRight = item.fixedRight
                let fixedLeft = item.fixedLeft

                return (
                  <th 
                    className={`${!!item.className ? item.className : ''} ${isFixed ? 'stickyed' : ''}`}
                    key={item.key + item.title}
                    style={{
                      width: item.width,
                      right: fixedRight,
                      left: fixedLeft
                    }}
                  >
                    { item.title || '-' }
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
            {
              _.isArray(options) &&
              options.length > 0 &&
              options.map((option, index) => (
                <tr key={option.id + index}>
                  {
                    _.keys(option).map((key, j) => {
                      let optionKey = tHeader[j] && tHeader[j]['key']
                      let isCustomRender = !_.isEmpty(tHeader[j]) && _.isFunction(tHeader[j].render) // 有render函数,才是自定义组件
                      let tHeaderHasKey = tHeader.some(i => i.key === key)

                      // 是否需要展示悬浮提示
                      let showTip = !_.isEmpty(tHeader[j]) && _.isFunction(tHeader[j].tip)
                      let tipRender = null
                      if (showTip) {
                        tipRender = tHeader[j].tip(option)
                      }

                      // 固定列判定
                      let isFixed = !_.isEmpty(tHeader[j]) && tHeader[j].fixed
                      let fixedRight = !_.isEmpty(tHeader[j]) && tHeader[j].fixedRight
                      let fixedLeft = !_.isEmpty(tHeader[j]) && tHeader[j].fixedLeft

                      return (
                        (isCustomRender || tHeaderHasKey) ?
                        <td 
                          key={key}
                          className={`${isFixed ? 'stickyed' : ''}`}
                          style={{
                            right: fixedRight,
                            left: fixedLeft
                          }}
                        >
                          {
                            isCustomRender ?
                            tHeader[j].render() :
                            (
                              showTip ?
                              <Popover tip={ option[optionKey] }>
                                <span>{ option[optionKey] }</span>
                              </Popover> :
                              (!!optionKey && !!option[optionKey]) ? option[optionKey] : null
                            )
                          }
                        </td> : null
                      )
                    })
                  }
                </tr>
              ))
            }
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  tHeader: PorpTypes.array,
  options: PorpTypes.array,
}

Table.defaultProps = {
  tHeader: [],
  options: [],
}

export default Table