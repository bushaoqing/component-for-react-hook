import Pagination from '../components/Pagination'

export default function PaginationDemo() {

  return (
    <div style={{ margin: 80, width: 800, height: 100, border: '1px solid #eee' }}>
      <Pagination
        total={100}
        current_page={5}
        limit={10}
      />
    </div>
  )
}