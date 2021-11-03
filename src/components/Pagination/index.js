import { useState } from 'react'
import PropTypes from 'prop-types'
import './index.css'
import _ from 'lodash'

function Pagination(props) {
  const { total, current_page, limit, limitArr } = props

  const [curPage, setCurPage] = useState(current_page || 1)

  return (
    <div className='comp__pagination__wrap'>
      <div className='comp__pagination__main'>
        <span className='total'>{`总共${total}条`}</span>

        {/* 下拉列表 */}
        <select
          className='select items'
          onChange={e => console.log(e.target.value)}
        >
          {
            _.isArray(limitArr) &&
            limitArr.length > 0 &&
            limitArr.map(i => (
              <option key={i} value={i}>{`${i}条/页`}</option>
            ))
          }
        </select>

        <span className='items'>{'<'}</span>
        <span className='items'>1</span>
        {
          current_page > 4 &&
          <span className='more-btn'>···</span>
        }
        <span className='items'>5</span>
        {
          current_page < Math.ceil(total/limit) - 3 &&
          <span className='more-btn'>···</span>
        }
        <span className='items'>{Math.ceil(total/limit)}</span>
        <span className='items'>{'>'}</span>
        <span className=''>
          前往
          <input
            value={curPage}
            onInput={e => setCurPage(e.target.value)}
            onBlur={() => console.log('触发blur', curPage)}
          />
          页
        </span>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  total: PropTypes.number,
  current_page: PropTypes.number,
  limit: PropTypes.number,
  limitArr: PropTypes.array
}

Pagination.defaultProps = {
  total: 0,
  current_page: 1,
  limit: 10,
  limitArr: [10, 20, 30, 40]
}

export default Pagination