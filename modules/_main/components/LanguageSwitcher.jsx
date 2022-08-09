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

    const { locale, route } = useRouter()

    const { it, en } = getImage('icons')

    const [{languages}, setLangOrder] = useState({
        languages: [ 
            {lang: 'it', img: it},
            {lang: 'en', img: en}
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
                return(
                    <Link href={ route } locale={ langItem.lang } key={`lang-menu-${langItem.lang}`}>
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