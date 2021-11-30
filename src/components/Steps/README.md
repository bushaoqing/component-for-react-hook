<!-->

import { useRef } from 'react'
import Steps from '@common/Steps'
import LabelTest from './LabelTest'
import LabelRuleConfig from './LabelRuleConfig'

export default function StepWin(props) {
  const { isEdit, hideStepsFunc } = props

  const formRef = useRef(null)

  const stepMenu = [
    [
      {
        stepNumber: 'one',
        title: '标签',
        component: <>我是标签组件，这里可以自定义组件</>
      },
      {
        stepNumber: 'two',
        title: '标签规则配置',
        component: <LabelRuleConfig formRef={formRef} />,
        nextBtn: '保存&下一步'
      }
    ],
    [
      {
        stepNumber: 'three',
        title: '标签测试',
        component: <LabelTest />,
        prevBtn: '上一步',
        nextBtn: '完成'
      }
    ]
  ]

  // 上一步
  function handlePrevBtn(curIndex, next) {
    console.log('handlePrevBtn: ', curIndex);
    next()
  }

  // 下一步
  function handleNextBtn(curIndex, next) {
    console.log('handleNextBtn: ', curIndex);
    
    switch (curIndex) {

      // 标签规则配置，点击保存&下一步按钮触发逻辑
      case 0:
        formRef.current.validate(valid => {
          if (valid) { // 校验成功进入下一步
            next()
          }
        })
        break;
      
      // 标签测试后，点击完成按钮触发逻辑
      case 1:
        hideStepsFunc(false) // 关闭步骤弹窗
        break;
    
      default:
        break;
    }
  }

  return (
    <Steps
      {...props}
      stepMenu={stepMenu}
      handlePrevBtn={handlePrevBtn}
      handleNextBtn={handleNextBtn}
      breadMenu={[
        {
          title: '智慧运营台',
          path: '/admin/monitor/monitorManagement'
        }, {
          title: '标签管理',
          goBack: true // 返回上一级页面
        }, {
          title: isEdit ? '编辑工单标签' : '新增工单标签'
        }
      ]}
    />
  )
}