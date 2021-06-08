import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Tables from "../../pages/tables";
import { useLayoutState } from "../../context/LayoutContext";
import Tables2 from "../../pages/tables/Tables-2";
import Tables3 from "../../pages/tables/Tables-3";
import Tables4 from "../../pages/tables/Tables-4";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Tables} />
              <Route path="/app/tables" component={Tables} />
              <Route path="/app/tables2" component={Tables2} />
              <Route path="/app/tables3" component={Tables3} />
              <Route path="/app/tables4" component={Tables4} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
