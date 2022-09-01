import React from 'react'

import { useRouter } from 'next/router'

//* API
import { getPostBySlug, getPosts } from '../api/posts'

//* ASSETS
import Image from 'next/future/image'

//* STYLES
import globals from '@/styles/Main.module.scss'
import styles from '../../modules/blog/styles/Article.module.scss'

const Article = ({post}) => {

  return (
    <div className={`${globals["page"]} ${styles["article-page"]}`}>
        <div className={styles["banner"]}>
            <Image
                src={post.preview_img}
                alt={`article-img-${post.preview_img}`}
                width={1160}
                height={500}  
            />
            <h1>{post.title.rendered}</h1>
        </div>
        <div className={styles["container"]}>
            <div className={styles["article"]} dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
        </div>
    </div>
  )
}

export async function getStaticPaths({locales}){

    const posts = await getPosts()
    const paths = posts.flatMap(post => {
        return locales.map(locale => {
            return{
                params: { slug: post.slug.toString()},
                locale
            }
        })
    })
    return{
        paths,
        fallback: true
    }
}

export async function getStaticProps({locale, params}) {

    const messages = {
      header: (await import(`../../translations/header/${locale}.json`)).default,
      footer:  (await import(`../../translations/footer/${locale}.json`)).default,
      general: (await import(`../../translations/common/${locale}.json`)).default,
      blog: (await import(`../../translations/blog/${params.slug}/${locale}.json`)).default
    }

    const post = await getPostBySlug(params.slug)
  
    return {
      props: {
        messages,
        post
      }
    };
} 

export default Article