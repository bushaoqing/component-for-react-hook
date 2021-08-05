// 删除连线、div的弹窗
import Dialog from "../../Dialog"

export default function DeleteDialog(props) {
  let { record, curClickPath, curEnterDivID, isDeletePath, handleSubmit, setVisible } = props

  return (
    <Dialog
      title={`删除${isDeletePath ? '连线' : '节点'}`}
      height={250}
      width={400}
      onSubmit={handleSubmit}
      onCancel={() => setVisible(false)}
    >
      <h3 style={{ color: 'red' }}>{`确认删除此${isDeletePath ? '连线' : '节点'}吗？`}</h3>
      {
        isDeletePath ?
        <h4>{ `${record.filter(r => r.id === curClickPath.beginID)[0] && record.filter(r => r.id === curClickPath.beginID)[0].textContent}
        --> 
        ${record.filter(r => r.id === curClickPath.endID)[0] && record.filter(r => r.id === curClickPath.endID)[0].textContent}` }</h4>
        :
        <h4>{ `节点名称：${ record.filter(r => r.id === curEnterDivID)[0] && record.filter(r => r.id === curEnterDivID)[0].textContent || '' }` }</h4>
      }
    </Dialog>
  )
}