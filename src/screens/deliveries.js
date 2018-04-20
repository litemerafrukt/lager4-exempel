import * as m from "mithril";

import error from "./error";

const deliveryItem = {
    view: ({ attrs: { delivery } }) =>
        m("tr", [
            m("td", { "data-title": "id" }, `${delivery.id}`),
            m(
                "td",
                { "data-title": "Produkt" },
                `${(delivery.product && delivery.product.name) || ""}`
            ),
            m("td", { "data-title": "Datum" }, `${delivery.delivery_date}`),
            m("td", { "data-title": "Antal" }, `${delivery.amount}`),
            delivery.comment && m("td", { "data-title": "Kommentar" }, `${delivery.comment}`)
        ])
};

const deliverieTable = {
    view: ({ attrs: { deliveries } }) =>
        m(
            "table.table.table-stacked.table-striped",
            m(
                "thead",
                m("tr", [
                    m("th", "id"),
                    m("th", "Produkt"),
                    m("th", "Datum"),
                    m("th", "Antal"),
                    m("th", "Kommentar")
                ])
            ),
            deliveries.list.map(d => m(deliveryItem, { delivery: d }))
        )
};

export default {
    oninit: ({ attrs: { model: { deliveries } } }) => {
        deliveries.load().catch(e => {
            console.log(e);
            m.mount(document.getElementById("app"), null);
            m.render(document.getElementById("app"), m(error, { error: e }));
        });
    },
    view: ({ attrs: { model: { deliveries } } }) => [
        m("a.button", { href: "/delivery/new", oncreate: m.route.link }, "Ny leverans"),
        deliveries.list
            ? // ? m("div", deliveries.list.map(d => m(deliveryItem, { delivery: d })))
            m(deliverieTable, { deliveries })
            : m("h4", "Hämtar leveranser...")
    ]
};
