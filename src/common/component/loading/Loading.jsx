import styles from './Loading.module.css'

const Loading = () => {

  return (
    <div className={styles['loadingArea']}>
      <div className={styles['loading']}>
        <div className={styles['loadingOff']}></div>
        <div className={styles['loadingOn']}></div>
      </div>
    </div>
  );
};

export default Loading;
