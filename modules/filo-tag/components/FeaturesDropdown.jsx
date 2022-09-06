import React, { useState } from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import { LinkCTA } from '@/common/components/CTA'

//* STYLES
import globals from '@/styles/Main.module.scss'
import styles from '../styles/FeaturesDropdown.module.scss'

const FeaturesDropdown = () => {

    const [{dropdown}, setDropdown] = useState({
        dropdown: false
    })

    const tProductSpec = useTranslations("products.Filo_Tag.specifications")

    const simple_spec_items = ["size", "range", "battery"]
    const features_spec = ["features_0","features_1","features_2","features_3"]
    
    return(
        <div className={styles["dropdown-specifications"]}>
            <h3
                onClick={() => setDropdown({dropdown: !dropdown})}
            > <ion-icon name={`chevron-${dropdown ? "down" : "forward"}-outline`}></ion-icon> {tProductSpec("main_label")}</h3>
            <div className={`${styles["spec-list"]} ${dropdown ? styles["dropdown-active"] : styles["dropdown-inactive"]}`}>
                <div className={styles["spec-item"]}>
                    <h4>{tProductSpec("features")}</h4>
                    <ul>
                        {
                            features_spec.map(feature =>{
                                return(
                                    <li key={`feat-item-${feature}`}>{tProductSpec(feature)}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                {
                    simple_spec_items.map( spec => {
                        return(
                            <div 
                                key={`spec-${spec}`}
                                className={styles["spec-item"]}
                                >
                                    <h4>{tProductSpec(spec)}</h4>
                                    <p>{tProductSpec(`${spec}_0`)}</p>
                                </div>
                        )
                    })
                }
                <div className={styles["spec-item"]}>
                    <h4>{tProductSpec("compatibility")}</h4>
                    <p>
                        {tProductSpec("compatibility_0")} 
                    </p>
                    <LinkCTA 
                        href="/devices"
                        classes={`${globals["link"]} ${globals["link-primary"]}`}
                        text_label={tProductSpec("compatibility_1")}
                    />
                </div>
            </div>
        </div>
    )
}

export default FeaturesDropdown