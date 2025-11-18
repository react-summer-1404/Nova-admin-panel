// ** React Imports
import { Suspense } from "react";
import { lazy } from "react";
import { Fragment, useState } from "react";

// ** Icons Imports
import { MessageCircle, Box, Users,CreditCard,Globe,UserCheck } from "react-feather";

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
const DTAdvance = lazy(() => import("../../tables/data-tables/advance"));
const DTAdvance2 = lazy(() => import("../../tables/data-tables-user/advance"));
const DTAdvance3 = lazy(() =>
  import("../../tables/data-tables-groups/advance")
);
const DTAdvance4 = lazy(() =>
import("../../../apps/tables/data-tables-payment/advance")
);
const DTAdvance5 = lazy(() =>
import("../../../apps/tables/data-tables-socialGroups/advance")
);
const DTAdvance6 = lazy(() =>
import("../../../apps/tables/data-tables-mentors/advance")
);
const TabsIcons = () => {
  {
    /* payment table */
  }

  // ** State
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <Fragment>
      <Nav tabs >
        <NavItem>
          <NavLink
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            <MessageCircle size={18} />
            <span className="align-middle">نظرات کاربران</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            <Users size={18} />
            <span className="align-middle">دانشجویان این دوره</span>
          </NavLink>
        </NavItem>

        <NavItem>
        <NavLink
            active={active === "3"}
            onClick={() => {
              toggle("3");
            }}
          >
            <Box size={18} />
            <span className="align-middle">گروه ها</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "4"}
            onClick={() => {
              toggle("4");
            }}
          >
            <CreditCard size={18} />
            <span className="align-middle">پرداخت</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "5"}
            onClick={() => {
              toggle("5");
            }}
          >
            <Globe size={18} />
            <span className="align-middle">گروه های اجتماعی</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "6"}
            onClick={() => {
              toggle("6");
            }}
          >
            <UserCheck size={18} />
            <span className="align-middle">منتور ها</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          {/* comment table */}
          <Suspense>
            <DTAdvance />
          </Suspense>
        </TabPane>

        <TabPane tabId="2">
          {/* students table */}
          <Suspense>
            <DTAdvance2 />
          </Suspense>
        </TabPane>

        <TabPane tabId="3">
          {/* group table */}
          <Suspense>
            <DTAdvance3 />
          </Suspense>
        </TabPane>

        <TabPane tabId="4">
          {/* group table */}
          <Suspense>
            <DTAdvance4 />
          </Suspense>
        </TabPane>

        <TabPane tabId="5">
          {/*social group table */}
          <Suspense>
            <DTAdvance5 />
          </Suspense>
        </TabPane>

        <TabPane tabId="6">
          {/*mentors table */}
          <Suspense>
            <DTAdvance6 />
          </Suspense>
        </TabPane>

      </TabContent>
    </Fragment>
  );
};
export default TabsIcons;
