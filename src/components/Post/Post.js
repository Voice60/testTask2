import styles from './Post.module.scss'

const Post = ({title, body}) => (
  <div className={styles.post}>
    <h4>title</h4>
    <p>body</p>
  </div>
);

export default Post;