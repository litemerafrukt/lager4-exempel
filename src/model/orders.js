import { request } from "mithril";

const orders = {
    list: [],
    getById: orderId => orders.list.find(({ id }) => id == orderId),
    load: () =>
        request("https://lager.emilfolino.se/orders?api_key=697faad24a9c716bd57aabf7f1efb629").then(
            ({ data }) => console.log(data) || (orders.list = data)
        ),
    putOrder: (order, updates) =>
        console.log(order, updates) ||
        request({
            url: "https://lager.emilfolino.se/order",
            method: "PUT",
            data: Object.assign({ api_key: "697faad24a9c716bd57aabf7f1efb629" }, order, updates)
        }).then(() => orders.load())
};

export default orders;
