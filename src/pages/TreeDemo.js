import { useState } from 'react'
import Tree from '../components/Tree'

const treeData = [{
  text: '一级 1',
  data: [{
    text: '二级 1-1',
    customClass: 'aaaaaaaaabbb',
    data: [{
      text: '三级 1-1-1'
    },{
      text: '三级 1-2-2'
    },{
      text: '三级 1-3-3'
    }]
  },{
    text: '二级 1-2'
  },{
    text: '二级 1-3'
  }]
}, {
  text: '一级 2',
  data: [{
    text: '二级 2-1'
  },{
    text: '二级 2-2'
  },{
    text: '二级 2-3'
  }]
}, {
  text: '一级 3',
  data: [{
    text: '二级 3-1'
  },{
    text: '二级 3-2'
  },{
    text: '二级 3-3'
  }]
}]
const treeOptions = {
  children: 'data',
  label: 'text'
}

export default function TreeDemo(props) {

  const [curClickValue, setcurClickValue] = useState({}) // 存储点击的节点对象

  console.log('curClickValue: ', curClickValue);
  return (
    <Tree
      showFilterInput={true}
      filterInputWidth={298}
      data={treeData}
      options={treeOptions}
      inputPlaceholder="请输入"
      changeValue={val => setcurClickValue(val)}        // changeCurClickTreeValue: 绑定点击的节点对象
    />
  )
}