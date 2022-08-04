import React from 'react'

//* COMPONENTS
import { LinkImageCTA } from './CTA'

//* ASSETS
import getImages from '@/assets/index.server'

//* STYLES
import styles from '../styles/DownloadApp.module.scss'

const DownloadApp = () => {

  const {
    App_Store,
    Play_Store
  } = getImages('apps')

  return (
    <div className={styles["download-apps-container"]}>
      <LinkImageCTA 
        href="https://apps.apple.com/it/app/filo-find-locate-what-you-care-about/id950467121"
        img_details={{
          src: App_Store,
          alt: "app_store",
          w: 148,
          h: 44
        }}
        classes={`${styles["app-icon"]}`}
      />
      <LinkImageCTA 
        href="https://play.google.com/store/apps/details?id=com.filotrack.filo&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
        img_details={{
          src: Play_Store,
          alt: "play_store",
          w: 148,
          h: 44
        }}
        classes={`${styles["app-icon"]}`}
      />
    </div>
  )
}

export default DownloadApp