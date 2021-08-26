import styles from './App.module.scss'
import {useEffect, useState} from "react";
import Post from "../../components/Post";
import {getPosts, getUsers} from "../../api";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const setData = async () => {
      const u = await getUsers()
      const p = await getPosts()
      setPosts(p)
      setUsers(u)
    }
    setData()
  }, []);

  useEffect(() => {
    if (author.length > 0) {
      let regex = new RegExp(author)
      const filteredUsers = users.filter(user => !!regex.test(user.name))
      const authorsIds = filteredUsers.map(user => user.id)
      const postsArray = posts.filter(post => authorsIds.includes(post.userId))
      setFilteredPosts(postsArray)
    } else {
      setFilteredPosts(posts)
    }
  }, [author, posts, users]);

  const getAuthorNameById = (id) => {
    return users.find(user => user.id === id)
  }

  return <div className={`container-lg ${styles.wrapper}`}>
    <input value={author} onChange={(e => setAuthor(e.target.value))} className={`form-control ${styles.inputAuthor}`}
           type="text"
           placeholder="Author"/>
    {posts.length === 0
      ? <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      : <div className={styles.posts}>
        {filteredPosts.length > 0 && users.length > 0
          ? filteredPosts.map(post => (
            <Post cl={styles.post} author={getAuthorNameById(post.userId).name} key={post.id} {...post} />
          ))
          : <h4 className={styles.message}>Posts haven't been defined</h4>}
      </div>}
  </div>
};

export default App;
