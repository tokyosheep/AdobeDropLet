import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Layout from "./pages/layout";
import configStore from "./redux/store/store";

const store = configStore();

ReactDOM.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    document.getElementById("root")
);