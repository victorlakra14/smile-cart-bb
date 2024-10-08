/* eslint-disable import/order */
import "./common/i18n";

/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/extensions

import Cart from "components/Cart";
import { PageNotFound } from "components/commons";
import Product from "components/Product";
import ProductList from "components/ProductList";
import { NavLink, Route, Redirect, Switch } from "react-router-dom";
import routes from "routes";

import "./App.css";

const App = () => (
  <>
    <div className="mx-4 flex space-x-2">
      <NavLink exact activeClassName="underline font-bold" to="/">
        Home
      </NavLink>
      <NavLink exact activeClassName="underline font-bold" to="/product">
        Product
      </NavLink>
    </div>
    <Switch>
      <Route exact component={ProductList} path={routes.products.index} />
      <Route exact component={Product} path={routes.products.show} />
      <Route exact component={Cart} path={routes.cart} />
      <Redirect exact from={routes.root} to={routes.products.index} />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);
export default App;
