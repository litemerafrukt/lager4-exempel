import m from "mithril";

export default {
    view: ({ attrs: { invoice } }) => [
        m("a.button", { href: "/invoice", oncreate: m.route.link }, "Tillbaka"),
        m("h4", `Faktura ${invoice.id}`),
        m("p", `Order: ${invoice["order_id"]}`),
        m("p", `Totalpris: ${invoice["total_price"]}`),
        m("h4", "Kund"),
        m("p", `${invoice.name}`),
        m("p", `${invoice.address}`),
        m("p", `${invoice.zip} ${invoice.city}`),
        m("p", `${invoice.country}`)
    ]
};
