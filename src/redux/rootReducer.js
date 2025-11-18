// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import ecommerce from '@src/views/apps/ecommerce/store'
import comments from "../views/apps/tables/data-tables/store"
import courseUsers from "../views/apps/tables/data-tables-user/store"
import courseGroups from "../views/apps/tables/data-tables-groups/store"


  
  const rootReducer = { navbar, layout ,ecommerce ,comments,courseUsers,courseGroups};

export default rootReducer;
