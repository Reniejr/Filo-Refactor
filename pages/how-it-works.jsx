import globals from '@/styles/Main.module.scss';
import styles from '../modules/how-it-works/styles/HIWPage.module.scss';

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';

const HIWPage = () => {
  return (
    <>
      <CustomHead page={"hiw"}/>
      <div 
        className={globals["page"]}
        id={styles["hiw-page"]}
        >
          <h1>How it Works</h1>
      </div>
    </>
  )
}

export async function getStaticProps({locale}) {

  const messages = {
    header: (await import(`../translations/header/${locale}.json`)).default,
    footer:  (await import(`../translations/footer/${locale}.json`)).default,
    general: (await import(`../translations/common/${locale}.json`)).default,
    hiw: (await import(`../translations/hiw_page/${locale}.json`)).default 
  }

  return {
    props: {
      messages
    }
  };
}

export default HIWPage