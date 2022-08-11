//* LAYOUT
import FindersLayout from "../layouts/FindersLayout";

//* COMPONENTS
import CustomHead from "@/main/components/CustomHead";
import HIWBlocks from '@/common/components/HIWBlocks';

//* DATA
import { finders_block_key } from '../modules/finders_page/data/blocks'

//* STYLES
import styles from '../modules/finders_page/styles/FindersPage.module.scss';
import globals from '@/styles/Main.module.scss';

const KeyFinderPage = () => {
  return(
    <>
      <CustomHead page="key_finder"/>
      <div 
        className={globals["page"]}
        id={styles["hiw-page"]}
        >
        <FindersLayout>
        <HIWBlocks 
              data={finders_block_key}
              page="key_finder"
            />  
        </FindersLayout>

      </div>
    </>
  )
}

export async function getStaticProps({locale}) {

    const messages = {
      header: (await import(`../translations/header/${locale}.json`)).default,
      footer:  (await import(`../translations/footer/${locale}.json`)).default,
      general: (await import(`../translations/common/${locale}.json`)).default,
      key_finder: (await import(`../translations/key_finder/${locale}.json`)).default,
      finders: (await import(`../translations/finders/${locale}.json`)).default, 
      products: (await import(`../translations/products/${locale}.json`)).default
    }
  
    return {
      props: {
        messages
      }
    };
}  

export default KeyFinderPage