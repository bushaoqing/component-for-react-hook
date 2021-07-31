import FlowChart from '../components/FlowChart'

export default function SvgDemo() {

  return (
    <>
      <FlowChart
        width={1000}
        height={600}
        style={{
          border: '1px solid pink'
        }}
      />
    </>
  )
}