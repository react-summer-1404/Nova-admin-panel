// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import ecommerce from '@src/views/apps/ecommerce/store'
import comments from "../views/apps/tables/data-tables/store"
import courseUsers from "../views/apps/tables/data-tables-user/store"
import courseGroup from "../views/apps/tables/data-tables-groups/store"
import coursePayment from "../views/apps/tables/data-tables-payment/store"
import courseSocialGroup from "../views/apps/tables/data-tables-socialGroups/store"


  
  const rootReducer = { navbar, layout ,ecommerce ,comments,courseUsers,courseGroup,coursePayment,courseSocialGroup};

export default rootReducer;
