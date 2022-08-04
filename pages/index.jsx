import globals from '@/styles/Main.module.scss';

import Image from 'next/future/image'

import getImage from '@/assets/index.server' 
import { LinkCTA } from '@/common/components/CTA';

export default function Home({messages}) {

  const { Logo_Filo_Red } = getImage('logos')
  const { general, homepage } = messages

  return (
    <div>
      <section className={globals["container"]}>
        <h1>Test container</h1>
        <section className={globals["section"]}>
          <h2>Test section</h2>
          <Image src={Logo_Filo_Red} width={168} height={77}/>
          <LinkCTA classes={`${globals["link"]} ${globals["u-line"]} ${globals["upper"]}`}
          href="/"
          text_label="Test Link"
          />
        </section>
      </section>
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
