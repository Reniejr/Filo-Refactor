//* TRANSLATION
import { useTranslations } from 'next-intl'

//* ASSETS
import getImage from '@/assets/index.server';

//* STYLES
import globals from '@/styles/Main.module.scss'
import styles from '../styles/FindersPage.module.scss';
import { LinkCTA } from '@/common/components/CTA';
import Image from 'next/future/image';

const FindersBanner = () => {

    const {
        Finders_Phone_Img_2
    } = getImage('finders')

    const t = useTranslations("finders.Finder_Banner")
    const tGlobal = useTranslations("general")

  return (
    <section className={styles['finders-banner']}>
        <div className={`${globals["container"]} ${styles["finders-banner-container"]}`}>
            <div className={styles["finder-banner-content"]}>
                <h2>{t("title")}</h2>
                <p>{t("description")}</p>
                <LinkCTA
                    href="/products/filo-tag"
                    classes={`${globals["btn"]} ${globals["btn-primary"]}`}
                    text_label={tGlobal("buy-now-filo")}
                />
            </div>
            <div className={styles["finder-banner-img"]}>
                <Image 
                    src={Finders_Phone_Img_2}
                    alt="finders-banner-img"
                    width={750}
                    height={515}
                />
            </div>
        </div>
    </section>
  )
}

export default FindersBanner