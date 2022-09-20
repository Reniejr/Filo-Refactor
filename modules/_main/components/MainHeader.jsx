import React, { useState } from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import {
    LogoLinkCTA,
    LinkCTA,
    BuyCTA,
    CartCTA
} from '@/common/components/CTA'

//* DATA
import { header_menu } from '../data/menu';

//* HOOKS
import useScrollPosition from '@/hooks/scrollPosition'

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../styles/MainHeader.module.scss';

const MainHeader = ({t}) => {
    
    const scrollPosition = useScrollPosition()

    const handleScroll = () => {
        return scrollPosition === 0 ?
            styles["on-top"] :
            styles["off-top"] 
    }

    const [{navMobile}, setNavMobile] = useState({
        navMobile: false
    })

    const handleNavMobile = () => setNavMobile({navMobile: !navMobile})

    const tGlobals = useTranslations('general')
  
    return (
    <nav 
        className={`${styles["navbar"]} ${handleScroll()}`} 
        id={styles["main-header"]}
        >
        <div className={`${globals["container"]} ${styles["menu-container"]}`}>
            <LogoLinkCTA color="primary"/>
            <div className={styles["menu"]}>
                {
                    header_menu.map( (itemInfo) => {

                        const { id, link, type } = itemInfo

                        switch(type){
                            case "buy-action": return(
                                <BuyCTA
                                    key={`header-menu-nav-item-${id}`}
                                    product="filo-tag"
                                    translation={t["buy-action"]}
                                    classes={`${globals["btn"]} ${globals["btn-primary"]} ${styles["btn-buy-action"]}`}
                                    />
                                    )
                            case "cart": return(
                                <CartCTA 
                                    key={`header-menu-nav-item-${id}`}
                                    classes={`${styles["cart-item"]}`}
                                />
                            )
                            default: return(
                                <LinkCTA
                                    key={`header-menu-nav-item-${id}`}
                                    href={link}
                                    text_label={t[id]}
                                    classes={`${globals["link"]} ${globals["upper"]} ${globals["link-b"]} ${styles["menu-item"]}`}
                                />
                            )

                        }

                    })
                }
            </div>
            <ion-icon 
                name="menu-outline"
                onClick={() => handleNavMobile()}
                ></ion-icon>
        </div>
        <MobileMenu t={t} state={navMobile}/>
        <div className={styles["test-banner"]}>{tGlobals.rich("test_site",{
            a : (children) => <LinkCTA 
                href="https://filotrack.com"
                classes={`${globals['link']} ${globals['link-primary']}`}
                text_label={children}
            />
        })}</div>
    </nav>
  )
}

const MobileMenu = ({t, state}) => {

    return(
        <div className={`${styles["mobile-nav"]} ${state ? styles["show-mob"] : styles["hide-mob"]}`}>
            <ul className={styles["mobile-menu"]}>
                {
                    header_menu.filter( item => item.type !== 'cart').map( itemInfo => {
                        const { id, link, type } = itemInfo

                        switch(type){
                            case "buy-action": return(
                                <li key={`header-menu-nav-item-mob-${id}`}>
                                    <BuyCTA                                        
                                        product="filo-tag"
                                        translation={t["buy-action"]}
                                        classes={`${globals["btn"]} ${globals["btn-primary"]} ${styles["btn-buy-action"]} ${styles["btn-buy-action-mob"]}`}
                                    />
                                </li>
                            )
                            default: return(
                                <li key={`header-menu-nav-item-mob-${id}`}>
                                    <LinkCTA
                                        href={link}
                                        text_label={t[id]}
                                        classes={`${globals["link"]} ${globals["upper"]} ${globals["link-b"]} ${styles["menu-item"]} ${styles["menu-item-mob"]}`}
                                    />
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </div>
    )
}

export default MainHeader