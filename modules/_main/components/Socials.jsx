import React from 'react'

//* COMPONENTS
import Link from 'next/link'

//* DATA
import { social_menu } from '../data/menu'


const Socials = ({container_classes, item_classes}) => {
  return (
    <div className={container_classes}>
        {social_menu.map((item) => {

            const { id, link } = item

            return(
                <Link 
                    key={`social-item-${id}`}
                    href={link} 
                    passHref
                    >
                    <a className={item_classes}><ion-icon name={`logo-${id}`}></ion-icon></a>
                </Link>
            )
        })}
    </div>
  )
}

export default Socials