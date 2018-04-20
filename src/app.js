import * as m from "mithril";

import layout from "./screens/layout";
import main from "./screens/main";
import invoices from "./screens/invoices";
import invoice from "./screens/invoice";
import createInvoice from "./screens/createInvoice";
import login from "./screens/login";
import user from "./screens/user";
import deliveries from "./screens/deliveries";
import newDelivery from "./screens/newDelivery";

import model from "./model";

const rerouteOnNoJwt = fromRoute => {
    if (!model.user.jwt) {
        m.route.reroute = fromRoute;
        m.route.set("/login");
    }
};

m.route(document.getElementById("app"), "/", {
    "/": { render: () => m(layout, m(main)) },
    "/delivery": { render: () => m(layout, m(deliveries, { model })) },
    "/delivery/new": { render: () => m(layout, m(newDelivery, { model })) },
    "/invoice": {
        onmatch: () => {
            rerouteOnNoJwt("/invoice");
        },
        render: () => m(layout, m(invoices, { model }))
    },
    "/invoice/id/:id": {
        onmatch: () => {
            rerouteOnNoJwt("/invoice/id/:id");
        },
        render: ({ attrs: { id } }) =>
            m(layout, m(invoice, { invoice: model.invoices.getById(id) }))
    },
    "/invoice/create": {
        onmatch: () => {
            rerouteOnNoJwt("/invoice/create");
        },
        render: () => m(layout, m(createInvoice, { model }))
    },
    "/login": {
        onmatch: () => {
            if (model.user.jwt) {
                m.route.set("/user");
            }
        },
        render: () => m(layout, m(login, { model }))
    },
    "/user": {
        render: () => m(layout, m(user, { model }))
    }
});
