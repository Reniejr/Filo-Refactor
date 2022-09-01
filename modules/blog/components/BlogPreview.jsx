import React from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import Image from 'next/future/image'
import { LinkCTA } from '@/common/components/CTA'

//* STYLES
import globals from '@/styles/Main.module.scss'
import styles from '../styles/BlogPreview.module.scss'

const BlogPreview = ({content, img}) => {

    const { title, description, href } = content

    const tGlobals = useTranslations("general")

  return (
    <div className={styles["blog-preview"]}>
        <h2>{title}</h2>
        {
            img.src !== "" ? 
            <Image
                src={img.src}
                alt={img.alt}
                width={700}
                height={400}
            /> : null
        }
        <p>{description}</p>
        <LinkCTA
            text_label={tGlobals("read-more")}
            href={href}
            classes={`${globals["btn"]} ${globals["btn-primary"]}`}
        />
    </div>
  )
}

export default BlogPreview