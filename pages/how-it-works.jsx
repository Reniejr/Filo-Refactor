//* TRANSLATION
import { useTranslations } from 'next-intl'

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../modules/how-it-works/styles/HIWPage.module.scss';

import { useRouter } from 'next/router'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';
import Slider from '@/common/components/Slider';
import HIWBlocks from '@/common/components/HIWBlocks';
import DownloadApp from '@/common/components/DownloadApp';
import { ProductOverview1 } from '@/common/components/Products';

//* DATA
import hiw_slider_data from '../modules/how-it-works/data/slider'
import hiw_blocks_data from 'modules/how-it-works/data/blocks';

const HIWPage = () => {

  const router = useRouter()
  const { route } = useRouter()

  const t = useTranslations('hiw')

  return (
    <>
      <CustomHead page={"hiw"}/>
      <div 
        className={globals["page"]}
        id={styles["hiw-page"]}
        >
          <Slider slider_details={hiw_slider_data} page="hiw"/>
      </div>
      <div className={`${styles["divider"]}`}>
        <ion-icon 
          name="chevron-down-outline"
          onClick={() => router.push({
            pathname: route,
            hash: "hiw-blocks-section"
          })}
          ></ion-icon>
      </div>
      <section id="hiw-blocks-section">
        {
          hiw_blocks_data.map( (block, i) => {

            const data = {
              ...block,
              title_label: `title_${i}`,
              description_label: `description_${i}`
            }

            return(
              <HIWBlocks 
                key={block.id}
                page="hiw"
                data={data}
              />
            )
          })
        }
      </section>
      <section className={styles["hiw-download-app"]}>
        <h2>{t('Download_App')}</h2>
        <DownloadApp/>
      </section>
      <section className={styles["divider"]}></section>
      <ProductOverview1/>
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