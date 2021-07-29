import React, { useContext } from 'react'
import PropTypes from 'prop-types'

const LayoutContext = React.createContext()

const ROW = props => {
  let { justigy, marginTop, marginBottom } = props

  return (
    <LayoutContext.Provider value={{...props}}>
      <div className="comp__layout__row-wrap" style={{
        display: 'flex',
        justifyContent: justigy || 'flex-start',
        boxSizing: 'border-box',
        marginTop,
        marginBottom
      }}>
        { props.children }
      </div>
    </LayoutContext.Provider>
  )
}

const COL = props => {
  const RowProps = useContext(LayoutContext)
  const gutter = RowProps.gutter || 0

  return (
    <div className="comp__layout__col-wrap" style={{
      display: 'inline-block',
      boxSizing: 'border-box',
      width: `${props.span / 24 * 100}%`,
      margin: `0 ${gutter / 2}px`
    }}>
      { props.children }
    </div>
  )
}

const Layout = props => (
  props.children
)

COL.propTypes = {
  span: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 占比宽度：span/24
}

ROW.propTypes = {
  gutter: PropTypes.number, // 单位是：px
  justigy: PropTypes.string
}

Layout.Row = ROW
Layout.Col = COL

export default Layout