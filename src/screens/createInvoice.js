import * as m from "mithril";
import orderDetails from "../components/orderDetails";

const orderSelect = {
    view: ({ attrs }) =>
        m(
            "select",
            {
                onchange: event => {
                    attrs.onchange(event);
                }
            },
            [
                m(
                    "option",
                    { value: null, disabled: true, selected: attrs.value == "0" },
                    "<order>"
                ),
                ...attrs.orders.map(o =>
                    m(
                        "option",
                        { value: o.id, selected: attrs.value == o.id },
                        `${o.id}: ${o.name}`
                    )
                )
            ]
        )
};

const createInvoice = {
    selectedOrder: null,
    create: (invoices, orders, user, order) => {
        const invoice = invoices.createFromOrder(order);

        invoices
            .postInvoice(user.jwt, invoice)
            .then(() => orders.putOrder(order, { status_id: 600 }))
            .then(() => orders.load())
            .then(
                () => (createInvoice.selectedOrder = orders.list.find(({ id }) => id == order.id))
            );
    },
    oninit: ({ attrs: { model: { orders } } }) => {
        orders.load();
    },
    view: ({ attrs: { model: { orders, invoices, user } } }) => {
        return [
            m("a.button", { href: "/invoice", oncreate: m.route.link }, "Tillbaka"),
            m("h2", "Skapa faktura"),
            m(orderSelect, {
                orders: orders.list,
                value: (createInvoice.selectedOrder && createInvoice.selectedOrder.id) || 0,
                onchange: m.withAttr(
                    "value",
                    value => (createInvoice.selectedOrder = orders.getById(value))
                )
            }),
            createInvoice.selectedOrder && [
                m("div", [m(orderDetails, { order: createInvoice.selectedOrder })]),
                m(
                    "button.button",
                    {
                        onclick: () =>
                            createInvoice.create(
                                invoices,
                                orders,
                                user,
                                createInvoice.selectedOrder
                            ),
                        disabled: createInvoice.selectedOrder.status_id != 400 ? true : false,
                        title:
                            createInvoice.selectedOrder.status_id != 400
                                ? "Faktura kan endast skapas för skickade order."
                                : "Fakturera"
                    },
                    "Skapa faktura"
                )
            ]
        ];
    }
};

export default createInvoice;
