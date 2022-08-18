//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';
import { LinkCTA } from '@/common/components/CTA';
import CareerCard from '../modules/career/components/CareerCard';

//* DATA
import career_includes from '../modules/career/data/career_includes';

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../modules/career/styles/Career.module.scss'

const Career = () => {

    const t = useTranslations('career')

    return(
        <>
            <CustomHead page="career"/>
            <div 
            className={globals["page"]}
            id="career"
            >
                <section className={styles["banner"]}>
                    <div className={`${styles["container"]}`}>
                        <h1>{t("Banner.title")}</h1>
                        <p>{t("Banner.description_0")}</p>
                        <p>{t("Banner.description_1")}</p>
                    </div>
                </section>
                <section className={`${styles["career-description"]} ${styles["container"]}`}>
                    <p>{t("Content._1")}</p>
                    <p>{t("Content._2")}</p>
                    <h3>{t("Content._3")}</h3>
                    <p>{t("Content._4")}</p>
                </section>
                <section className={`${styles["job-positions"]} ${styles["container"]}`}>
                    <h2>{t("Job_Position.title")}</h2>
                    <p>{t("Job_Position._1")}</p>
                    <p>{t("Job_Position._2")}</p>
                    <p>
                        <span>{t("Job_Position._3")}</span> 
                        <LinkCTA 
                            text_label="jobs@filotrack.com"
                            href="mailto:jobs@filotrack.com"
                            classes={`${globals["link"]} ${globals["link-primary"]}`}
                        />
                    </p>
                </section>
                <section className={styles["work-with-us-section"]}>
                    <h2>{t("work_with_us")}</h2>
                    <div className={styles["career-includes-section"]}>
                        {
                            career_includes.map( (feat, i) => {
                                return(
                                    <CareerCard
                                        key={feat.id}
                                        img={feat.img}
                                        content={{
                                            title: t(`include_${i}.title`),
                                            description: t(`include_${i}.description`),
                                        }}
                                    />
                                )
                            })
                        }
                    </div>
                </section>
            </div>
        </>
    )

}

export async function getStaticProps({locale}) {

    const messages = {
      header: (await import(`../translations/header/${locale}.json`)).default,
      footer:  (await import(`../translations/footer/${locale}.json`)).default,
      general: (await import(`../translations/common/${locale}.json`)).default,
      career: (await import(`../translations/career/${locale}.json`)).default
    }
  
    return {
      props: {
        messages
      }
    };
}  

export default Career;