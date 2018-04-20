import { request } from "mithril";

const invoices = {
    list: [],
    getById: invoiceId => invoices.list.find(({ id }) => id == invoiceId),
    createFromOrder: order => ({
        order_id: order.id,
        total_price: order["order_items"].reduce((tot, i) => tot + i.amount * i.price, 0)
    }),
    newId: () =>
        invoices.list
            .map(i => Number(i.id))
            .sort((id1, id2) => id1 - id2)
            .slice(-1)
            .reduce((_, id) => id + 1, 1),
    postInvoice: (jwt, invoice) =>
        console.log(invoice, jwt) ||
        invoices
            .load(jwt)
            .then(
                () =>
                    invoices.list.find(i => i.order_id == invoice.order_id) &&
                    Promise.reject(new Error("Order redan fakturerad"))
            )
            .then(() => invoices.newId())
            .then(id =>
                request({
                    url: "https://lager.emilfolino.se/invoice",
                    method: "POST",
                    headers: {
                        "x-access-token": jwt
                    },
                    data: Object.assign(
                        { api_key: "697faad24a9c716bd57aabf7f1efb629" },
                        { id },
                        invoice
                    )
                })
                    .then(({ data }) => console.log(data) || data)
                    .then(() => invoices.load(jwt))
            ),
    load: jwt =>
        request({
            url: "https://lager.emilfolino.se/invoices?api_key=697faad24a9c716bd57aabf7f1efb629",
            method: "GET",
            headers: {
                "x-access-token": jwt
            }
        }).then(({ data }) => console.log(data) || (invoices.list = data))
};

export default invoices;
