import { useState, useEffect, Fragment } from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* API
import { getPostsWImg } from '../api/posts'

//* DATA
import articles from '../../modules/blog/data/articles'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';
import SkeletonLoader from '../../modules/blog/components/SkeletonLoader';
import BlogPreview from '../../modules/blog/components/BlogPreview';

//* STYLES
import styles from '../../modules/blog/styles/Blog.module.scss';
import globals from '@/styles/Main.module.scss';

const Blog = ({posts}) => {

    const t = useTranslations("blog");

    const [{posts_ready}, setReady] = useState({
        posts_ready: false
    })

    useEffect(() => {

        setTimeout(() => {
            setReady({posts_ready: true});
        }, 1500);
        /* eslint-disable-next-line */
    },[])

    return(
        <>
            <CustomHead page="blog"/>
            <div 
            className={globals["page"]}
            id="blog"
            >
                <div className={styles["container"]}>
                    <h1>{t("title")}</h1>
                    <p>{t("description")}</p>
                </div>
                <div className={styles["container"]}>
                    {
                        posts.length > 0 ?
                        posts.map( post => {
                            const { slug, title, preview_img, id } = post
                            const description = articles.find( article => article.id === slug).description
                            const content = {
                                title: title.rendered,
                                description,
                                href: '/blog/' + slug
                            }
                            const img = {
                                src: preview_img,
                                alt: `preview-img-post-${id}`
                            }
                            return(
                                <Fragment key={`article-${id}`}>
                                    {
                                        posts_ready ? <BlogPreview content={content} img={img}/> : <SkeletonLoader/>
                                    }
                                </Fragment>
                            )
                        }) : <h2>No Blog Posts available</h2>
                    }
                </div>
            </div>
        </>
    )
}

export async function getStaticProps({locale}) {

    const messages = {
      header: (await import(`../../translations/header/${locale}.json`)).default,
      footer:  (await import(`../../translations/footer/${locale}.json`)).default,
      general: (await import(`../../translations/common/${locale}.json`)).default,
      blog: (await import(`../../translations/blog/${locale}.json`)).default
    }

    const posts = await getPostsWImg()
  
    return {
      props: {
        messages,
        posts
      }
    };
}  

export default Blog;