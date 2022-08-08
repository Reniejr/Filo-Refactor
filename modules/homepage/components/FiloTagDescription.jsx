import React from 'react'
import { useTranslations } from 'next-intl'

//* COMPONENTS
import Image from 'next/future/image'
import FiloTagFeatures from '@/common/components/FiloTagFeatures';
import { LinkCTA } from '@/common/components/CTA';
import DownloadApp from '@/common/components/DownloadApp';

//* ASSETS
import getImage from '@/assets/index.server'

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../styles/FiloTagDescription.module.scss';

const FiloTagDescription = () => {

    const { Home_Features } = getImage("homepages")
    const t = useTranslations("homepage.Filo_Description")
    const tGlobal = useTranslations("general")

  return (
    <section
        className={styles["filo-tag-description-section"]}
    >
        <div className={`${globals["container"]} ${styles["description-container"]}`}>
            <Image 
                src={Home_Features}
                alt="home-demo-app-filo-tag"
                width={300}
                height={400}
            />
            <div className={styles["description"]}>
                <h2>
                    {t("description")}
                </h2>
                <Image 
                    src={Home_Features}
                    alt="home-demo-app-filo-tag-sm"
                    width={300}
                    height={400}
                />
                <div className={styles["hiw-and-apps"]}>
                    <LinkCTA 
                        href="/how-it-works"
                        classes={`${globals["link"]} ${globals["u-line"]} ${globals["link-b"]} ${styles["hiw-link"]}`}
                        text_label={tGlobal("learn-more")}
                    />
                    <DownloadApp/>
                </div>
            </div>
            <FiloTagFeatures/>
        </div>
    </section>
  )
}

export default FiloTagDescription