import { useState } from 'react'
import Buttom from '../components/Button'
import Loading from '../components/Loading'

export default function LoadingDemo() {

  const [isLoading, setisLoading] = useState(false)

  return (
    <>
      <Loading 
        isLoading={isLoading} 
        tip="拼命加载中..."
        // hideIcon={true}
      >
        <div style={{
          marginTop: 20,
          width: 1000,
          height: 800,
          border: "1px solid #ddd"
        }}>
          我是展示内容
        </div>
      </Loading>
      <br/>
      <Buttom type="submit" text="撤换loading" onClick={() => setisLoading(v => !v)} />
    </>
  )
}