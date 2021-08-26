import styles from './Post.module.scss'

const Post = ({author, title, body, cl}) => {
  return <div className={`${styles.post} ${cl}`}>
    <div>
      <h3 className={styles.title}>{title.charAt(0).toUpperCase() + title.slice(1)}</h3>
      <p>{body}</p>
    </div>
    <p className={styles.author}>{author}</p>
  </div>
};

export default Post;