import FlowChart from '../components/FlowChart'

export default function SvgDemo() {

  return (
    <>
      <FlowChart
        width={1400}
        height={1200}
        style={{
          border: '1px solid pink'
        }}
      />
    </>
  )
}