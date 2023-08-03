// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((sum, elem) => sum + elem.likes, 0)
}

const favouriteBlog = blogs => {
  const max = Math.max(...blogs.map(b => b.likes))
  const res = blogs.find(blog => blog.likes === max)
  const retVal = {
    title: res.title,
    author: res.author,
    likes: res.likes
  }
  return retVal
}

const mostBlogs = blogs => {
  const authorBlogsCount = blogs.reduce((count, blog) => {
    const author = blog.author
    count[author] = count[author] ? count[author] + 1 : 1
    return count
  }, {})

  const authorWithMostBlogs = Object.entries(authorBlogsCount).reduce((mostBlogsAuthor, [author, count]) => {
    if (count > mostBlogsAuthor.blogs) {
      return { author, blogs: count }
    }
    else {
      return mostBlogsAuthor
    }
  }, { author: '', blogs: 0 })

  return authorWithMostBlogs
}

const mostLikedAuthor = blogs => {
  const authorLikesCount = blogs.reduce((count, blog) => {
    const author = blog.author
    count[author] = count[author] ? count[author] + blog.likes : blog.likes
    return count
  }, {})

  const authorWithMostLikes = Object.entries(authorLikesCount).reduce((mostLikesAuthor, [author, likes]) => {
    if (likes > mostLikesAuthor.likes) {
      return { author, likes: likes }
    }
    else {
      return mostLikesAuthor
    }
  }, { author: '', likes: 0 })

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikedAuthor
}