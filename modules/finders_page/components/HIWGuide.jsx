//* TRANSLATION
import { useTranslations } from 'next-intl'

//* STYLES
import globals from '@/styles/Main.module.scss'
import styles from '../../finders_page/styles/FindersPage.module.scss';

const HIWGuide = () => {

    const t = useTranslations("finders.How_it_works")

    const instructions = ["attach", "ring", "find"]

  return (
    <section className={styles["finders-hiw"]}>
        <h2>{t("hiw")}</h2>
        <div className={`${globals["container"]} ${styles["instructions-container"]}`}>
            <ion-icon name="caret-forward-outline"></ion-icon>
            {
                /* eslint-disable-next-line */
                instructions.map((guide, i) => {
                    return(
                        <div
                            key={`guid-item-${guide}`} 
                            className={styles["instruction"]}>
                            <span className={styles["guide-point"]}></span>
                            <h4>{t(`title_${i}`)}</h4>
                            <p>{t(`description_${i}`)}</p>
                        </div>
                    )
                })
            }
        </div>
    </section>
  )
}

export default HIWGuide