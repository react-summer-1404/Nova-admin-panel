// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import ecommerce from '@src/views/apps/ecommerce/store'
import comments from "../views/apps/tables/data-tables/store"


  
  const rootReducer = { navbar, layout ,ecommerce ,comments};

export default rootReducer;
