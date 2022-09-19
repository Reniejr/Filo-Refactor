//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';

//* ASSETS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruckFast,
    faEnvelope
} from '@fortawesome/free-solid-svg-icons'

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../modules/thank-you-page/styles/ThankYouPage.module.scss';
import { LinkCTA } from '@/common/components/CTA';

const ThankYouPage = () => {

    const t = useTranslations('thank_you_page')

    const iconStyle = {
        fontSize: "36px",
        color: "#ff3545",
    }

  return (
    <>
        <CustomHead page="thank_you_page"/>
        <div 
        className={globals["page"]}
        id={styles["thank-you-page"]}
        >
            <div className={`${globals["container"]} ${styles["container"]}`}>
                <h1>{t("thanks")}</h1>
                <h4>{t("order_complete")}</h4>

                <div className={styles["step-container"]}>
                    <div className={`${styles["step"]} ${styles["step-1"]}`}>
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            style={iconStyle}
                        />
                        <p>{t("step_1")}</p>
                    </div>
                    <div className={`${styles["step"]} ${styles["step-2"]}`}>
                        <FontAwesomeIcon
                            icon={faTruckFast}
                            style={iconStyle}
                            />
                        <p>{t("step_2")}</p>
                    </div>
                </div>
                <p className={styles['for-info']}>
                    {t.rich("for_info", {
                        a: (children) => <LinkCTA 
                            classes={`${styles["link"]} ${styles["link-primary"]}`}
                            href="/contact-us"
                            text_label={children}
                        />
                    })}
                </p>
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
      thank_you_page: (await import(`../translations/thank-you-page/${locale}.json`)).default
    }
  
    return {
      props: {
        messages
      }
    };
}  

export default ThankYouPage