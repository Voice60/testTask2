import '../../src/App.css';
import styles from './App.module.scss'
import {useEffect, useState} from "react";
import Post from "../../components/Post";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getPosts = () => {
      return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => json)
    }
    const getUsers = () => {
      return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => json)
    }
    setPosts(getPosts())
    setUsers(getUsers())
  }, []);

  useEffect(() => {
    if (author.length > 0) {
      let regex = new RegExp(author)
      const filteredUsers = users.filter(user => {
        if (regex.test(user.name)) {
          return true
        }
        return false
      })

      const authorsIds = filteredUsers.map(user => user.id)

      const postsArray = posts.filter(post => {
        if (authorsIds.includes(post.userId)) {
          return true
        }
        return false
      })

      setFilteredPosts(postsArray)
    } else {
      setFilteredPosts(posts)
    }
  }, [author]);


  return <div className='container-lg'>
    <input value={author} onChange={(e => setAuthor(e.target.value))} className="form-control" type="text"
           placeholder="filter by author"/>
    {filteredPosts.length === 0
      ? <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      : <div className={styles.posts}>
        {filteredPosts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </div>}
  </div>
};

export default App;
