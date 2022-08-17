//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';
import HIWBlocks from '@/common/components/HIWBlocks';

//* DATA
import { finders_block_phone } from '../modules/finders_page/data/blocks'

//* ASSETS
import getImage from '@/assets/index.server';

//* UTILITIES
import { mob_size } from '../utilities';

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../modules/finders_page/styles/FindYourPhonePage.module.scss'
import { LinkCTA } from '@/common/components/CTA';


const FindYourPhonePage = () => {

    const {
        Finders_Phone_Banner,
        Finders_Phone_Banner_2,
        Finders_Phone_Mob,
    } = getImage('finders')

    const t = useTranslations('phone_finder')
    const tGlobal = useTranslations('general')
    const tMerch = useTranslations('general.Product_Merchandise')

    //* DYNAMIC STYLES
    const banner1 = {
        backgroundImage: 'url(' + Finders_Phone_Banner + ')',
    }
    // const banner2 = {
    //     backgroundImage: mob_size ? 'url(' + Finders_Phone_Mob + ')' : 'url(' + Finders_Phone_Banner_2 + ')'
    // }

  return (
    <>
        <CustomHead page="phone_finder"/>
        <div 
        className={globals["page"]}
        id="find-your-phone"
        >
            <section 
                className={styles["phone-banner-1"]}
                style={banner1}
                >
                <div className={styles["title-container"]}>
                    <h1>{t("title_page")}</h1>
                </div>
            </section>
            <HIWBlocks 
                data={finders_block_phone}
                page="phone_finder"
            >
                <LinkCTA
                    href="/how-it-works"
                    classes={`${globals["btn"]} ${globals["btn-primary"]} ${styles["hiw-btn"]}`}
                    text_label={tGlobal("learn-more")}
                />
            </HIWBlocks>
            <section 
                className={styles["phone-banner-2"]}
                // style={banner2}
                >
                <div className={styles["content"]}>
                    <h2>{t("title_page")}</h2>
                    <div className={styles["list-details"]}>
                        <p className={styles["detail"]}>
                            <ion-icon name="checkmark-outline"></ion-icon> <span>{tMerch("shipping")}</span> {tMerch("shipping_3days")}
                        </p>
                        <p className={styles["detail"]}>
                            <ion-icon name="checkmark-outline"></ion-icon> {tMerch("warranty")}
                        </p>
                        <p className={styles["detail"]}>
                            <ion-icon name="checkmark-outline"></ion-icon> {tMerch("14_days")}
                        </p>
                    </div>
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
      phone_finder: (await import(`../translations/phone_finder/${locale}.json`)).default,
      finders: (await import(`../translations/finders/${locale}.json`)).default, 
      products: (await import(`../translations/products/${locale}.json`)).default
    }
  
    return {
      props: {
        messages
      }
    };
}  

export default FindYourPhonePage