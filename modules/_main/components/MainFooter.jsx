import React from 'react'

//* COMPONENTS
import Socials from './Socials'
import Link from 'next/link'
import { LogoLinkCTA, LinkCTA } from '@/common/components/CTA'
import DownloadApp from '@/common/components/DownloadApp'

//* DATA
import { footer_menu } from '../data/menu'

//* STYLES
import globals from "@/styles/Main.module.scss"
import styles from '../styles/MainFooter.module.scss'

const MainFooter = ({t}) => {
  return (
    <footer
        className={`${globals["section"]} ${styles["footer"]}`}
        id={styles["main-footer"]}
    >
        <div className={globals["container"]}>
            <section className={`${styles["footer-section"]} ${styles["socials-section"]}`}>
                <p>{t["follow-us"]}</p>
                <Socials 
                    container_classes={styles["socials-container"]}
                    item_classes={styles["social-item"]}
                    />
            </section>
            <section className={`${styles["footer-section"]} ${styles["footer-nav-section"]}`}>
                <FooterMenu t={t}/>
            </section>
            <section className={`${styles["footer-section"]} ${styles["footer-copyright-section"]}`}>
                <p className={styles["copyright"]}>
                    <Link href="/privacy-policy">
                        <a className={styles["privacy-policy"]}>Privacy Policy </a>
                    </Link>
                    - © 2014 - 2022 Filo Srl - 
                    {t["copyright"]}
                </p>
            </section>
            <section className={`${styles["footer-section"]} ${styles["footer-apps-section"]}`}>
                <DownloadApp/>
            </section>
        </div>
    </footer>
  )
}

const FooterMenu = ({t}) => {

    return(
        <>
            <div className={styles["footer-menu-col"]}>
                <LogoLinkCTA color="secondary"/>
            </div>
            {
                footer_menu.map((sub_menu) => {
                    return(
                        <div
                            key={`footer-nav-col-${sub_menu.id}`} 
                            className={styles["footer-menu-col"]}
                            >
                            <p>{t[sub_menu.id]}</p>
                            <ul className={styles["footer-nav"]}>
                                {
                                    sub_menu.nav.map(nav_item => {

                                        const { id, link } = nav_item

                                        return(
                                            <li 
                                                key={`footer-nav-item-${id}`}
                                                className={styles["nav-item"]}>
                                                <LinkCTA
                                                    href={link}
                                                    text_label={t[id]}
                                                    classes={`${globals["link"]} ${globals["link-w"]} ${styles["footer-nav-link"]}`}
                                                />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
            <div className={styles["footer-menu-col"]}></div>
        </>
    )
}

export default MainFooter