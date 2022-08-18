import { useRouter } from 'next/router'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';
import ContactCard from '../modules/contact-us/components/ContactCard';

//* DATA
import contacts from '../modules/contact-us/data/contacts'

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from  '../modules/contact-us/styles/ContactUs.module.scss'

const ContactUs = () => {

    const t = useTranslations('contact_us')
    const tHelp = useTranslations('contact_us.Help_Support')
    const tPromo = useTranslations('contact_us.Promotional')
    const tPress = useTranslations('contact_us.Press')
    const tDpo = useTranslations('contact_us.Privacy_DPO')

    const { locale } = useRouter()

    const contacts_features = contacts.map(contact =>{
        let link;
        let translations;
        switch (contact.id) {
            case "help_support":
                link = `https://filo.freshdesk.com/${locale}/support/home`
                translations = tHelp
                break;
            case "promotional":
                link = `/${locale}/business`
                translations = tPromo
                break;
            case "press":
                link = `/press`
                translations = tPress
                break;
            case "dpo":
                link = `mailto:dpo@filotrack.com`
                translations = tDpo
                break;
            default:
                break;
        }
        return {
            ...contact,
            link,
            translations
        }
    })

    //? console.log("contact-us.jsx 56", contacts_features)

  return (
    <>
        <CustomHead page="contact_us"/>
        <div 
        className={globals["page"]}
        id="contact-us"
        >
            <section className={styles["banner"]}>
                <div className={`${globals["container"]} ${styles["container"]}`}>
                    <h1>{t("Banner.title")}</h1>
                    <p>{t("Banner.description")}</p>
                </div>
            </section>
            <section className={styles["contacts"]}>
                <div className={`${globals["container"]} ${styles["contacts-container"]}`}>
                    {
                        contacts_features.map( contact => {
                            return(
                                <ContactCard
                                    key={contact.id}
                                    icon={contact.icon}
                                    t={contact.translations}
                                    link={contact.link}
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
      contact_us: (await import(`../translations/contact-us/${locale}.json`)).default
    }
  
    return {
      props: {
        messages
      }
    };
}  

export default ContactUs