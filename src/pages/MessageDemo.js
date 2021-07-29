import Message from '../components/Message'
import Button from '../components/Button'

export default function MessageDemo(props) {

  return (
    <div>
      <Button type="submit" text="一般提示" onClick={() => Message.info('一般提示!')} />
      <hr/>
      <Button type="submit" text="成功提示" onClick={() => Message.success('成功提示!')} />
      <hr/>
      <Button type="submit" text="告警提示" onClick={() => Message.warn('告警提示!')} />
      <hr/>
      <Button type="submit" text="失败提示" onClick={() => Message.error('失败提示!')} />
    </div>
  )
}