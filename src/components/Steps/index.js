import { useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import BreadCrumbs from '@common/BreadCrumbs'
import Button from '@common/Button'
import _ from 'lodash'
import './index.css'

function Steps(props) {
  const {
    showSteps,
    hideStepsFunc,
    breadMenu,
    stepMenu,
    titleWidth,
    handlePrevBtn,
    handleNextBtn
  } = props

  const [curIndex, setCurIndex] = useState(0) // 当前页面标记

  const onPrevBtn = function () {
    handlePrevBtn(curIndex, function () {
      if (curIndex === 0) return
      setCurIndex(i => i - 1)
    })
  }

  const onNextBtn = function () {
    handleNextBtn(curIndex, function () {
      if (curIndex === stepMenu.length - 1) return
      setCurIndex(i => i + 1)
    })
  }

  const curComp = useMemo(() => {
    if (_.isArray(stepMenu) && !_.isEmpty(stepMenu[curIndex])) return stepMenu[curIndex]
  }, [stepMenu, curIndex])

  // console.log('==============curComp: ', curComp);
  const prevBtn = _.get(curComp.find(i => !!i.prevBtn), 'prevBtn') || ''
  const nextBtn = _.get(curComp.find(i => !!i.nextBtn), 'nextBtn') || ''
  
  return createPortal((
    showSteps &&
    <div className='sdw-steps-win__wrap'>
      <BreadCrumbs 
        data={breadMenu}
        hideStepsFunc={hideStepsFunc}
      />

      <div className='sdw-steps-win__main-body'>
        {
          _.isArray(curComp) &&
          curComp.map((item, index) => (
            <div 
              key={ curIndex + item.stepNumber}
              className={`number-title__wrap ${index > 0 ? 'top-border' : ''}`}
            >
              <div 
                className={`number-title__${item.stepNumber}`}
                style={{
                  width: titleWidth
                }}
              >{ item.title }</div>
              <div>
                { item.component || null }
              </div>
            </div>
          ))
        }
      </div>

      <div 
        style={{
          padding: `16px 0 20px ${titleWidth + 28}px`,
        }}
        className='sdw-steps-win__footer-wrap'
      >
        {
          !!prevBtn &&
          <Button
            type='cancel'
            onClick={onPrevBtn}
            text={prevBtn}
          />
        }
        {
          !!nextBtn &&
          <Button
            type='submit'
            onClick={onNextBtn}
            text={nextBtn}
          />
        }
      </div>
    </div>
  ), document.body)
}

Steps.propTypes = {
  showSteps: PropTypes.bool,
  hideStepsFunc: PropTypes.func, // 专门针对面包屑设定的，意为关闭当前步骤弹窗，回到初始页面
  handlePrevBtn: PropTypes.func,
  handleNextBtn: PropTypes.func,
  isEdit: PropTypes.bool,
  record: PropTypes.object,
  breadMenu: PropTypes.array,
  stepMenu: PropTypes.array,
  titleWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Steps.defaultProps = {
  showSteps: false,
  hideStepsFunc: _.noop,
  handlePrevBtn: _.noop,
  handleNextBtn: _.noop,
  isEdit: false,
  record: {},
  breadMenu: [],
  stepMenu: [],
  titleWidth: 168,
}

export default Steps