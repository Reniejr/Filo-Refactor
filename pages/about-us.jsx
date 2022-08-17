//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';
import PersonCard from '../modules/about-us/components/PersonCard';

//* ASSETS
import getImage from '@/assets/index.server';
import Image from 'next/future/image';

//* DATA
import { team, advisors } from '../modules/about-us/data/persons'

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../modules/about-us/styles/AboutUs.module.scss';


const AboutUs = () => {

    const t = useTranslations('about_us')

    const {
        AboutUs_Mob,
    } = getImage('about_us')

    

  return (
    <>
        <CustomHead page="about_us"/>
        <div 
        className={globals["page"]}
        id="about-us"
        >
            <section className={styles["banner"]}>
                <div className={`${globals["container"]} ${styles["container"]}`}>
                    <div className={styles["content"]}>
                        <h1>{t("title-page")}</h1>
                        <p>{t("description-page")}</p>
                    </div>
                    <div className={styles["img-box-mob"]}>
                        <Image 
                            src={AboutUs_Mob}
                            alt="about-us-banner-mob"
                            width={576}
                            height={576}
                        />
                    </div>
                </div>
            </section>
            <section className={styles["our-team"]}>
                <h2>{t("our-team")}</h2>
              <div className={`${globals["container"]} ${styles["person-container"]}`}>
                {
                  team.map( person => {
                    return(
                      <PersonCard 
                        key={person.img.alt}
                        img={person.img}
                        person={person.person}
                        section="team"
                      />
                    )
                  })
                }
              </div>
            </section>
            <section className={styles["our-advisors"]}>
                <h2>{t("our-advisor")}</h2>
              <div className={`${globals["container"]} ${styles["person-container"]}`}>
                {
                  advisors.map( person => {
                    return(
                      <PersonCard 
                        key={person.img.alt}
                        img={person.img}
                        person={person.person}
                        section="advisors"
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
      about_us: (await import(`../translations/about-us/${locale}.json`)).default
    }
  
    return {
      props: {
        messages
      }
    };
}  

export default AboutUs