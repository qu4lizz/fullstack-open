import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector(state => state.notifications)

  if (!message) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification
