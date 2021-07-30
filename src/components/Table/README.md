<!-- 
import Table from '../components/Table'
import Button from '../components/Button'

export default function TableDemo() {

  const tHeader = [
    {
      title: '姓名',
      key: 'name',
      width: 200,      
      // fixed: true, // 固定列
      // fixedLeft: 0, // 固定列定位配置
      tip: data => (
        <span>{ data['name'] }</span>
      )
    }, {
      title: '年龄',
      key: 'age',
      width: 200,
    }, {
      title: '爱好',
      key: 'hobby',
      width: 200,
    }, {
      title: '工作',
      key: 'work',
      width: 200,
      // fixed: true, // 固定列
      // fixedRight: 180, // 固定列定位配置
      tip: data => (
        <span>{ data['work'] }</span>
      )
    }, {
      title: '操作',
      width: 180,
      // fixed: true, // 固定列
      // fixedRight: 0, // 固定列定位配置（默认为 right：0）
      className: 'text-align-right', // 自定义表头样式
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
    }, {
      name: '小舞',
      age: 23,
      hobby: '守护唐三',
      work: '跟着唐三玩',
      id: '112'
    }, {
      name: '竹青',
      age: 24,
      hobby: '守护戴老大',
      work: '跟着戴老大玩',
      id: '113'
    }
  ]

  return (
    <div style={{
      border: '1px solid red',
      width: 800,
      height: 600,
    }}>
      <Table
        tHeader={tHeader}
        options={options}
      />
    </div>
  )
}
 -->