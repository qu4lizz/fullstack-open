import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.users.slice().sort((u1, u2) => u2.blogs.length - u1.blogs.length))

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Users</th>
          <th>Blogs Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td className="link" style={{ paddingRight: '10px' }}>
              <Link to={`/users/${u.id}`}>{u.name}</Link>
            </td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserList