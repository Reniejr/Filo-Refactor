//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';
import PressBlock from '../modules/press/components/PressBlock';
import PressSlideShow from '../modules/press/components/PressSlideShow';
import { LinkCTA } from '@/common/components/CTA';

//* ASSETS
import getImage from '@/assets/index.server';

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../modules/press/styles/Press.module.scss'

const Press = () => {

    const t = useTranslations('press')
    const {
        Press_Img_1,
        Press_Img_2
    } = getImage('press')

    return(
        <>
            <CustomHead page="press"/>
            <div 
            className={globals["page"]}
            id="press"
            >
                <PressBlock 
                    img={{
                        src: Press_Img_1,
                        alt: "press-image-1"
                    }}
                    direction="reverse"
                >
                    <h1>{t("Block_1.title")}</h1>
                    <p>{t("Block_1.description")}</p>
                    <LinkCTA 
                        text_label={t("Block_1.button")}
                        href="/"
                        classes={`${globals["btn"]} ${globals["btn-primary"]}`}
                    />
                </PressBlock>
                <PressBlock 
                    img={{
                        src: Press_Img_2,
                        alt: "press-image-2"
                    }}
                    direction="normal"
                >
                    <h1>{t("Block_2.title")}</h1>
                    <p>
                        <span>
                        {t("Block_2.description_0")}
                        </span>{" "}
                        <LinkCTA 
                            text_label={t("Block_2.here")}
                            href="/"
                            classes={`${globals["link"]} ${globals["link-primary"]}`}
                        />{" "}
                        <span>{t("Block_2.description_1")}</span>
                    </p>
                </PressBlock>
                <section className={styles["slideshow-section"]}>
                    <h2>{t("featured_on")}</h2>
                    <PressSlideShow/>
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
      press: (await import(`../translations/press/${locale}.json`)).default
    }
  
    return {
      props: {
        messages
      }
    };
}  

export default Press