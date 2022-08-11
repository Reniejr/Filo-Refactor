//* COMPONENTS
import HIWBlocks from '@/common/components/HIWBlocks';
import HIWGuide from '../modules/finders_page/components/HIWGuide';
import FindersBanner from '../modules/finders_page/components/FindersBanner';
import { ProductOverview2 } from "@/common/components/Products";
import ProductMerchandise from "../modules/finders_page/components/ProductMerchandise";

//* DATA
import { finders_block_1_data } from '../modules/finders_page/data/blocks'

const FindersLayout = ({children}) => {

    return(
        <>
            {children}    
          <HIWBlocks 
            data={finders_block_1_data}
            page="finders"
          />    
          <HIWGuide/>
          <FindersBanner/>
          <ProductOverview2/>
          <ProductMerchandise/>

        </>
    )
}

export default FindersLayout;