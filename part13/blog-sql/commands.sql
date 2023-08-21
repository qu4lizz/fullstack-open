CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INT DEFAULT 0
);

INSERT INTO blogs (url, title) 
VALUES ('https://example.com/short-blog', 'A Brief Thought');

INSERT INTO blogs (author, url, title, likes) 
VALUES ('Jane Smith', 'https://example.com/janes-blog', '10 Tips for Cooking', 25);

INSERT INTO blogs (author, url, title) 
VALUES ('John Doe', 'https://example.com/johns-blog', 'My First Blog Post');