import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/authReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.authUser)

  const padding = {
    paddingRight: 20
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '5%', paddingTop: '1%' }}>
      <Link className="link link-info" style={padding} to="/">blogs</Link>
      <Link className="link link-info" style={padding} to="/users">users</Link>
      <p style={padding}>{authUser.name} logged in</p>
      <button className="btn btn-md btn-outline rounded-full" type="submit" onClick={() => dispatch(logout())}>
      logout
      </button>
    </div>
  )
}

export default Menu