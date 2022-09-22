import { useState, useEffect } from 'react'

//* COMPONENTS
import Link from 'next/link'
import Image from 'next/future/image'
import { useRouter } from 'next/router'

//* ASSETS
import getImage from '@/assets/index.server'

//* STYLES
import styles from '../styles/LanguageSwitcher.module.scss'

const LanguageSwitcher = () => {

    const { locale, route, query } = useRouter()

    const { it, en, es } = getImage('icons')

    const [{languages}, setLangOrder] = useState({
        languages: [ 
            {lang: 'it', img: it},
            {lang: 'en', img: en},
            {lang: 'es', img: es},
        ]
    })

    useEffect(() => {

        const new_order = languages.sort((x, y) => { return x.lang === locale ? -1 : y.lang === locale ? 1 : 0
        })

        setLangOrder({languages: new_order})
        /* eslint-disable-next-line */
    },[locale])

  return (
    <div className={styles["language-switcher"]}>
        {
            languages.map( (langItem) => {

                const href = route.includes('blog') ?
                {
                    pathname: '/blog/[slug]',
                    query: query
                } : route.includes('products') ? {
                    pathname: '/products/[slug]',
                    query: query
                } : route

                return(
                    <Link href={ href } locale={ langItem.lang } key={`lang-menu-${langItem.lang}`}>
                        <a className={styles["img-flag-icon"]}>
                            <Image 
                                src={ langItem.img } 
                                alt={`lang-${langItem.lang}`}
                                width={30}
                                height={22} 
                                />
                        </a>
                    </Link>
                )
            })
        }
    </div>
  )
}

export default LanguageSwitcher