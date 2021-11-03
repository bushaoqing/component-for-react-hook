import PropTypes from 'prop-types'
import _ from 'lodash'
import Popover from '../Popover'
import './index.css'

// 默认宽度
const defaultWidth = 80
function Table(props) {
  let { tHeader, options, height } = props


  return (
    <div className="comp__table-outer-div-wrap" style={{
      ...!!height ? {
        height
      } : {}
    }}>
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
                      width: item.width || defaultWidth,
                      right: fixedRight,
                      left: fixedLeft,
                      top: 0,
                      zIndex: isFixed ? 99 : 9
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
            _.isArray(tHeader) &&
            options.length > 0 &&
            options.map((option, index) => (
              <tr key={option.id}>
                {
                  tHeader.map((header, j) => {
                    const optionKey = _.get(header, 'key')
                    const width = _.get(header, 'width')
                    const trValue = _.get(option, optionKey)
                    const tHeaderHasKey = header.hasOwnProperty('key')

                    let isCustomRender = !_.isEmpty(header) && _.isFunction(header.render) // 有render函数,才是自定义组件

                    // 是否需要展示悬浮提示
                    let showTip = !_.isEmpty(header) && _.isFunction(header.tip)
                    let tipRender = null
                    if (showTip) {
                      tipRender = header.tip(option)
                    }

                    // 固定列判定
                    let isFixed = !_.isEmpty(header) && header.fixed
                    let fixedRight = !_.isEmpty(header) && header.fixedRight
                    let fixedLeft = !_.isEmpty(header) && header.fixedLeft

                    return (
                      (isCustomRender || tHeaderHasKey) ?
                      <td 
                        key={option.id + optionKey}
                        className={`${isFixed ? 'stickyed' : ''}`}
                        style={{
                          width: width || defaultWidth,
                          right: fixedRight,
                          left: fixedLeft
                        }}
                      >
                        {
                          isCustomRender ?
                          header.render() :
                          (
                            showTip ?
                            <Popover tip={ trValue }>
                              <span>{ trValue }</span>
                            </Popover> :
                            !!trValue ? trValue : null
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
  tHeader: PropTypes.array,
  options: PropTypes.array,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 这里的height是tbody的高度，设置后，表头会固定在最上方
}

Table.defaultProps = {
  tHeader: [],
  options: [],
  height: ''
}

export default Table