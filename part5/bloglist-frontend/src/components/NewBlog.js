import { useState } from 'react'

const NewBlog = (props) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    props.handleCreate({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={newTitle}
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          type="text"
          value={newAuthor}
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          value={newUrl}
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button id="create" type="submit">create</button>
    </form>
  )
}

export default NewBlog
