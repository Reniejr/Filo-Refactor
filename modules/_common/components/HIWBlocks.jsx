//* TRANSLATION
import { useTranslations } from 'next-intl'

//* ASSETS
import Image from 'next/future/image'

//* STYLES
import styles from '../styles/HIWBlocks.module.scss'

const HIWBlocks = ({data, page, children}) => {

    const t = useTranslations(`${page}.Blocks`)

    const {
        id,
        img,
        direction,
        title_label,
        description_label,
    } = data

  return (
    <section className={`${styles["hiw-block"]} ${direction === "reverse" ? styles["reversed-block"] : styles["normal-block"]}`}>
        <div className={styles["content-txt"]}>
            <h2>{t(title_label)}</h2>
            <p>{t(description_label)}</p>
            { children ? children : null }
        </div>
        <div className={styles["content-img"]}>
            <Image 
                src={img}
                alt={`hiw-block-img-${id}`}
                width={750}
                height={515}
            />
        </div>
    </section>
  )
}

export default HIWBlocks