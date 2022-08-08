import globals from '@/styles/Main.module.scss';
import styles from '../modules/homepage/styles/HomePage.module.scss';

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';
import Slider from '@/common/components/Slider';
import Mentions from '../modules/homepage/components/Mentions';
import FiloTagDescription from '../modules/homepage/components/FiloTagDescription';
import { ProductOverview1 } from '@/common/components/Products';

//* DATA
import top_slider_data from '../modules/homepage/data/top-slider';
import bottom_slider_data from '../modules/homepage/data/bottom-slider';

export default function Home() {

  return (
    <>
      <CustomHead page="homepage"/>
      <div 
        className={`${globals["page"]}`}
        id={styles["homepage"]}
      >
        <Slider 
          slider_details={top_slider_data}
        />
        <Mentions/>
        <FiloTagDescription/>
        <Slider 
          slider_details={bottom_slider_data}
        />
        <ProductOverview1/>
      </div>
    </>
  )
}
export async function getStaticProps({locale}) {

  const messages = {
    header: (await import(`../translations/header/${locale}.json`)).default,
    footer:  (await import(`../translations/footer/${locale}.json`)).default,
    general: (await import(`../translations/common/${locale}.json`)).default,
    homepage: (await import(`../translations/homepage/${locale}.json`)).default 
  }

  return {
    props: {
      messages
    }
  };
}
