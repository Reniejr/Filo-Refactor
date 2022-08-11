//* TRANSLATION
import { useTranslations } from 'next-intl'

//* ASSETS
import getImage from '@/assets/index.server'
import Image from 'next/future/image'

//* STYLES
import styles from '../styles/FindersPage.module.scss'
import globals from '@/styles/Main.module.scss' 

const ProductMerchandise = () => {

    const {
        I_Delivery,
        I_Flag,
        I_Warranty
    } = getImage('icons')

    const t = useTranslations("general.Product_Merchandise")

  return (
    <section className={styles["product-merchandise"]}>
        <div className={`${globals["container"]} ${styles["details-container"]}`}>
            <div className={styles["detail"]}>
                <div className={styles["img-box"]}>
                    <Image 
                        src={I_Flag}
                        alt="made-in-italy-flag-img"
                        width={64}
                        height={64}
                    />
                </div>
                <p>{t("made")}</p>
            </div>
            <div className={styles["detail"]}>
                <div className={styles["img-box"]}>
                    <Image 
                        src={I_Delivery}
                        alt="delivery-img"
                        width={64}
                        height={64}
                    />
                </div>
                <p>{t("shipping")}</p>
            </div>
            <div className={styles["detail"]}>
                <div className={styles["img-box"]}>
                    <Image 
                        src={I_Warranty}
                        alt="warranty-img"
                        width={64}
                        height={64}
                    />
                </div>
                <p>{t("warranty")}</p>
            </div>
        </div>
    </section>
  )
}

export default ProductMerchandise