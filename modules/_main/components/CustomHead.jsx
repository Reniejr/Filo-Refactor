import React from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

const CustomHead = ({page}) => {

  const t = useTranslations(`${page}.Meta_Tags`)

  return (
    <Head>
        <title>{t("title")}</title>
        <meta name="keywords" content={t("keywords")}/>
        <meta name="description" content={t("description")}/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </Head>
  )
}

export default CustomHead