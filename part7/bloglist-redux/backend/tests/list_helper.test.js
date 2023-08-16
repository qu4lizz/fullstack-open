const mongoose = require('mongoose')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('likes', () => {
  test('multiple blogs', () => {
    const result = listHelper.totalLikes(helper.initialBlogs)
    expect(result).toBe(36)
  })

  const expectedBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  }

  expect(listHelper.favouriteBlog(helper.initialBlogs)).toEqual(expectedBlog)

  const expectedMostBlogs = {
    author: 'Robert C. Martin',
    blogs: 3
  }

  expect(listHelper.mostBlogs(helper.initialBlogs)).toEqual(expectedMostBlogs)

  const expectedMostLiked = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  }

  expect(listHelper.mostLikedAuthor(helper.initialBlogs)).toEqual(expectedMostLiked)
})

test('GET: blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
})

test('GET: blogs return correct number', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is by default _id', async () => {
  const blogs = await Blog.find({})
  expect(blogs[0]._id).toBeDefined()
})

describe('Adding a new blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({}) // Clear the database before each test
  })

  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Data structures',
      author: 'Marko',
      url: 'http://www.etfbl.com/blogs/data_structures',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain('Data structures')
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlogData = {
      title: 'Updated Blog Title',
      author: 'Updated Blog Author',
      url: 'http://www.example.com/updated',
      likes: 100,
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlogData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toMatchObject(updatedBlogData)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

    // Remove the _id field from the updated data before comparing
    delete updatedBlogData._id
    expect(updatedBlog).toMatchObject(updatedBlogData)
  })
})




afterAll(async () => {
  await mongoose.connection.close()
})