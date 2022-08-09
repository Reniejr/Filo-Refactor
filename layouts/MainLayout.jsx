//* COMPONENTS
import LanguageSwitcher from "@/main/components/LanguageSwitcher";
import MainFooter from "@/main/components/MainFooter";
import MainHeader from "@/main/components/MainHeader";

//* STYLES
import globals from "@/styles/Main.module.scss"

const MainLayout = ({children, translation}) => {

    const { header, footer, general } = translation;

    return(
        <div className={globals["layout"]} id={globals["main-layout"]}>
            <MainHeader t={{...header, ...general}}/>
            {children}
            <MainFooter t={{...footer, ...general}}/>
            <LanguageSwitcher/>
        </div>
    )
}

export default MainLayout;