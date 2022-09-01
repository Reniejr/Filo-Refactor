//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';
import Form from '../modules/returns_exchange/components/Form.client'


//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../modules/returns_exchange/styles/ReturnsExchange.module.scss'

const ReturnsExchange = () => {

    const t = useTranslations('returns_exchange')

    return(
        <>
            <CustomHead page="returns_exchange"/>
            <div 
            className={globals["page"]}
            id="returns_exchange"
            >
                <div className={`${globals["container"]} ${styles["container"]}`}>
                    <div className={styles["col-1"]}>
                        <div className={styles["title"]}>
                            <h1>{t("Title._1")}</h1>
                            <span>{t("Title._2")}</span>
                        </div>
                        <div className={`${styles["block"]} ${styles["return"]}`}>
                            <h4>{t("Return.title")}</h4>
                            <p>{t("Return.description")}</p>
                        </div>
                        <div className={`${styles["block"]} ${styles["exchange"]}`}>
                            <h4>{t("Exchange.title")}</h4>
                            <p>{t("Exchange.description")}</p>
                        </div>
                        <h2>{t("Faq.title")}</h2>
                        <div className={`${styles["block"]} ${styles["faq"]}`}>
                            <h4>{t("Faq._1.title")}</h4>
                            <p>{t("Faq._1.description")}</p>
                        </div>
                        <div className={`${styles["block"]} ${styles["faq"]}`}>
                            <h4>{t("Faq._1.title")}</h4>
                            <p>{t("Faq._1.description")}</p>
                        </div>
                    </div>
                    <div className={styles["col-2"]}>
                        <Form/>
                    </div>
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
      returns_exchange: (await import(`../translations/returns_exchange/${locale}.json`)).default
    }
  
    return {
      props: {
        messages
      }
    };
}  

export default ReturnsExchange;