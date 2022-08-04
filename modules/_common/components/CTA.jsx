import React from 'react'

//* NEXTJS COMPONENTS
import Link from 'next/link'
import Image from 'next/future/image'

//* ASSETS
import getImage from '@/assets/index.server'

const LinkCTA = ({classes, href, text_label}) => {

  return (
    <Link 
      href={href}
      passHref
      >
        <a className={classes}>{text_label}</a>
    </Link>
  )
}

const LogoLinkCTA = ({color}) => {

  const logo = color === 'primary' ? getImage('logos')["Logo_Filo_Red"] : getImage('logos')["Logo_Filo_White"]

  return(
    <Link href="/" passHref>
      <a>
        <Image src={logo} alt="logo" width={74} height={39}/>
      </a>
    </Link>
  )
}

const BuyCTA = ({product, translation, classes}) => {

  let url;

  //? change url href based on product -- DEFAULT = FILO TAG PRODUCT
  switch (product) {
    case 'tata' : url = 'https://getmytata.com';
    break;
    default: url = '/products/filo-tag';
    break;
  }

  return(
    <Link href={url} passHref>
      <a className={classes}>
        {translation}
      </a>
    </Link>
  )
}


const LinkImageCTA = ({img_details, href, classes}) => {

  const { src, alt, w, h} = img_details

  return(
    <Link href={href} passHref>
      <a className={classes}>
        <Image src={src} alt={alt} width={w} height={h}/>
      </a>
    </Link>
  )
}

const CartCTA = ({classes}) => {

  return(
    <Link href="/cart" passHref>
      <a className={classes}>
        <ion-icon name="cart"></ion-icon>
      </a>
    </Link>
  )
}


export {
  LinkCTA,
  LogoLinkCTA,
  BuyCTA,
  LinkImageCTA,
  CartCTA
}