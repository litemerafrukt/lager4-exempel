import * as m from "mithril";

const invoiceItem = {
    view: ({ attrs: { invoice } }) =>
        m(
            "tr",
            {
                style: { cursor: "pointer" },
                onclick: () => m.route.set(`/invoice/id/${invoice.id}`)
            },
            [
                m("td", { "data-title": "id" }, `${invoice.id}`),
                m("td", { "data-title": "Namn" }, `${invoice.name}`),
                m("td", { "data-title": "Total" }, `${invoice.total_price}`)
            ]
        )
};

const invoiceTable = {
    view: ({ attrs: { invoices } }) =>
        m(
            "table.table.table-stacked.table-striped",
            m("thead", m("tr", [m("th", "id"), m("th", "Namn"), m("th", "Total")])),
            invoices.list.map(i => m(invoiceItem, { invoice: i }))
        )
};

export default {
    oninit: ({ attrs: { model: { invoices, user } } }) => {
        invoices.load(user.jwt);
    },
    view: ({ attrs: { model: { invoices } } }) => [
        m("h2", "Fakturor"),
        m("a.button", { href: "/invoice/create", oncreate: m.route.link }, "Skapa faktura"),
        invoices.list ? m(invoiceTable, { invoices }) : m("h4", "Hämtar fakturor...")
    ]
};
