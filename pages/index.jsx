import globals from '@/styles/Main.module.scss';
import styles from '../modules/homepage/styles/HomePage.module.scss';

//* COMPONENTS
import Slider from '@/common/components/Slider';

//* DATA
import top_slider_data from '../modules/homepage/data/top-slider';

export default function Home({messages}) {

  const { general, homepage } = messages

  return (
    <div 
      className={`${globals["page"]}`}
      id={styles["homepage"]}
    >
      <Slider 
        slider_details={top_slider_data}
        content={{translation: {...general, ...homepage}}}
      />
    </div>
  )
}
export function getStaticProps({locale}) {

  const messages = {
    header:{
      ...require(`../translations/header/${locale}.json`),

    },
    footer: {
      ...require(`../translations/footer/${locale}.json`),
    },
    general:{
      ...require(`../translations/common/${locale}.json`),
    },
    homepage: {
      ...require(`../translations/homepage/${locale}.json`)
    }
  }

  return {
    props: {
      messages
    }
  };
}
