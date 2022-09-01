//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../modules/terms-conditions/styles/TermsConditions.module.scss'

const TermsConditions = () => {

  const t = useTranslations('terms_conditions')

  return(
    <>
      <CustomHead page="terms_conditions"/>
      <div 
        className={globals["page"]}
        id="terms-conditions"
        >
          <div className={styles["container"]}>
            <h1>{t("title")}</h1>
            <section className={styles["term-article"]}>
              <h2>{t("Art_1.title")}</h2>
              <p>{t.rich("Art_1.description",{
                strong: (children) => <strong>{children}</strong>
              })}</p>
            </section>
            <section className={styles["term-article"]}>
              <h2>{t("Art_2.title")}</h2>
              <p>{t("Art_2.description")}</p>
            </section>
            <section className={styles["term-article"]}>
              <h2>{t("Art_3.title")}</h2>
              <p>{t("Art_3.description")}</p>
            </section>
            <section className={styles["term-article"]}>
              <h2>{t("Art_4.title")}</h2>
              <p>{t("Art_4.description")}</p>
              <ul>
                <li>{t("Art_4.list_0._0")}</li>
                <li>{t("Art_4.list_0._1")}</li>
              </ul>
              <p>{t("Art_4.description_2")}</p>
              <ul className={styles["list-number"]}>
                <li>{t("Art_4.list_1._0")}</li>
                <li>{t("Art_4.list_1._1")}</li>
                <li>{t("Art_4.list_1._2")}</li>
                <ul>
                  <li>{t("Art_4.list_1.sub_list_0._0")}</li>
                  <li>{t("Art_4.list_1.sub_list_0._1")}</li>
                  <li>{t("Art_4.list_1.sub_list_0._2")}</li>
                  <ul>
                    <li>{t("Art_4.list_1.sub_list_0.sub_list_1._0")}</li>
                  </ul>
                </ul>
              </ul>
            </section>
            <section className={styles["term-article"]}>
              <h2>{t("Art_5.title")}</h2>
              <p>{t("Art_5.description")}</p>
            </section>
            <section className={styles["term-article"]}>
              <h2>{t("Art_6.title")}</h2>
              <p>{t("Art_6.description")}</p>
              <ul>
                <li>{t("Art_6.list_0._0")}</li>
                <li>{t("Art_6.list_0._1")}</li>
                <li>{t("Art_6.list_0._2")}</li>
              </ul>
              <p>{t("Art_6.description_2")}</p>
              <ul>
                <li>{t("Art_6.list_1._0")}</li>
                <li>{t("Art_6.list_1._1")}</li>
                <li>{t("Art_6.list_1._2")}</li>
                <li>{t("Art_6.list_1._3")}</li>
                <li>{t("Art_6.list_1._4")}</li>
                <li>{t("Art_6.list_1._5")}</li>
              </ul>
              <p>{t("Art_6.description_3")}</p>
            </section>
            <section className={styles["term-article"]}>
              <h2>{t("Art_7.title")}</h2>
              <p>{t("Art_7.description")}</p>
            </section>
            <section className={styles["term-article"]}>
              <h2>{t("Art_8.title")}</h2>
              <p>{t("Art_8.description")}</p>
            </section>
            <section className={styles["term-article"]}>
              <h2>{t("Art_9.title")}</h2>
              <p>{t("Art_9.description")}</p>
            </section>
            <section className={styles["term-article"]}>
              <h2>{t("Art_10.title")}</h2>
              <p>{t("Art_10.description")}</p>
            </section>
            <section className={styles["term-article"]}>
              <h2>{t("Art_11.title")}</h2>
              <p>{t("Art_11.description")}</p>
            </section>
            <section className={styles["term-article"]}>
              <h2>{t("Art_12.title")}</h2>
              <p>{t("Art_12.description")}</p>
            </section>
            <section className={styles["term-article"]}>
              <h2>{t("Art_13.title")}</h2>
              <p>{t("Art_13.description")}</p>
            </section>
            <section className={styles["term-article"]}>
              <h2>{t("Art_14.title")}</h2>
              <p>{t("Art_14.description")}</p>
            </section>
          </div>
        </div>
    </>
  )
}

export async function getStaticProps({locale}) {

    const messages = {
      header: (await import(`../translations/header/${locale}.json`)).default,
      footer:  (await import(`../translations/footer/${locale}.json`)).default,
      general: (await import(`../translations/common/${locale}.json`)).default,
      terms_conditions: (await import(`../translations/terms_conditions/${locale}.json`)).default
    }
  
    return {
      props: {
        messages
      }
    };
}  

export default TermsConditions