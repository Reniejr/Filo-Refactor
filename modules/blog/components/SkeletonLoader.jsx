import React from 'react'

//* STYLES
import styles from '../styles/SkeletonLoader.module.scss'

const SkeletonLoader = () => {
  return (
    <div className={styles["skeleton-loader"]}>
        <div className={styles["title-loader"]}>
            <span className={styles["gradient"]}></span>
        </div>
        <div className={styles["img-preview-loader"]}>
            <span className={styles["gradient"]}></span>
        </div>
        <div className={styles["description-loader"]}>
            <span className={styles["gradient"]}></span>
        </div>
    </div>
  )
}

export default SkeletonLoader