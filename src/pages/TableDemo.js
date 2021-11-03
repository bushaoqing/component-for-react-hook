import Table from '../components/Table'
import Button from '../components/Button'

export default function TableDemo() {

  const tHeader = [
    {
      title: '姓名',
      key: 'name',
      width: 140,
      fixed: true, // 固定列
      fixedLeft: 0, // 固定列定位配置
      tip: data => (
        <span>{ data['name'] }</span>
      )
    }, {
      title: '年龄',
      key: 'age',
      width: 140,
      fixed: true, // 固定列
      fixedLeft: 140, // 固定列定位配置
    }, {
      title: '爱好',
      key: 'hobby',
      width: 140,
    }, {
      title: '工作',
      key: 'work',
      width: 200,
      tip: data => (
        <span>{ data['work'] }</span>
      )
    }, {
      title: 'a',
      key: 'a'
    }, {
      title: 'b',
      key: 'b'
    }, {
      title: 'c',
      key: 'c'
    }, {
      title: 'd',
      key: 'd'
    }, {
      title: 'e',
      key: 'e'
    }, {
      title: 'f',
      key: 'f'
    }, {
      title: 'g',
      key: 'g'
    }, {
      title: '操作',
      width: 180,
      fixed: true, // 固定列
      // fixedRight: 0, // 固定列定位配置（默认为 right：0）
      // className: 'text-align-right', // 自定义表头样式
      render: () => (
        <div>
          <Button text="编辑" />
          <Button text="查看详情" />
        </div>
      )
    }
  ]

  const options = [
    {
      name: '唐三',
      age: 23,
      hobby: '打怪升级',
      work: '就是玩',
      id: '111',
      xxx: 'text', // 不展示的项
      xxx1: 'text',
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
      g: 'g'
    }, {
      name: '小舞',
      age: 23,
      hobby: '守护唐三',
      work: '跟着唐三玩',
      id: '156612',
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
      g: 'g'
    }, {
      name: '竹青',
      age: 24,
      hobby: '守护戴老大',
      work: '跟着戴老大玩',
      id: '13413',
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
      g: 'g'
    }, {
      name: '竹青',
      age: 24,
      hobby: '守护戴老大',
      work: '跟着戴老大玩',
      id: '134513',
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
      g: 'g'
    }, {
      name: '竹青',
      age: 24,
      hobby: '守护戴老大',
      work: '跟着戴老大玩',
      id: '678',
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
      g: 'g'
    }, {
      name: '竹青',
      age: 24,
      hobby: '守护戴老大',
      work: '跟着戴老大玩',
      id: '456',
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
      g: 'g'
    }, {
      name: '竹青',
      age: 24,
      hobby: '守护戴老大',
      work: '跟着戴老大玩',
      id: '666',
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
      g: 'g'
    }, {
      name: '竹青',
      age: 24,
      hobby: '守护戴老大',
      work: '跟着戴老大玩',
      id: '222',
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
      g: 'g'
    }, {
      name: '竹青',
      age: 24,
      hobby: '守护戴老大',
      work: '跟着戴老大玩',
      id: '333',
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
      g: 'g'
    }, {
      name: '竹青',
      age: 24,
      hobby: '守护戴老大',
      work: '跟着戴老大玩',
      id: '233',
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
      g: 'g'
    }, {
      name: '竹青',
      age: 24,
      hobby: '守护戴老大',
      work: '跟着戴老大玩',
      id: '235',
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
      g: 'g'
    }, {
      name: '竹青',
      age: 24,
      hobby: '守护戴老大',
      work: '跟着戴老大玩',
      id: '234',
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
      g: 'g'
    }
  ]

  return (
    <div style={{
      border: '1px solid red',
      width: 1000 // table的宽度 = 父容器的宽度
    }}>
      <Table
        height={400} // table的高度
        tHeader={tHeader}
        options={options}
      />
    </div>
  )
}