import m from "mithril";

const orderItem = {
    view: ({ attrs: { product } }) =>
        m("tr", [
            m("td", { "data-title": "Produkt" }, `${product.name}`),
            m("td", { "data-title": "Antal" }, `${product.amount}`),
            m("td", { "data-title": "Pris" }, `${product.price}`),
            m("td", { "data-title": "Total" }, `${product.amount * product.price}`)
        ])
};

const orderItems = {
    view: ({ attrs: { items } }) => [
        m(
            "table.table.table-stacked.table-striped",
            m(
                "thead",
                m("tr", [m("th", "Produkt"), m("th", "Antal"), m("th", "Pris"), m("th", "Total")])
            ),
            items.map(product => m(orderItem, { product }))
        )
    ]
};

const orderDetails = {
    view: ({ attrs: { order } }) => [
        m("h3", "Order"),
        m("p", `${order.name}`),
        m("p", `${order.address}`),
        m("p", `${order.city}`),
        m("p", `${order.country}`),
        m("p", m("strong", `${order.status}`)),
        m(orderItems, { items: order["order_items"] }),
        m(
            "h4",
            `Ordertotal: ${order["order_items"].reduce(
                (tot, item) => tot + item.price * item.amount,
                0
            )}`
        )
    ]
};

export default orderDetails;
