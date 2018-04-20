import { request } from "mithril";

const requestProduct = id =>
    request(
        `https://lager.emilfolino.se/product/${id}?api_key=697faad24a9c716bd57aabf7f1efb629`
    ).then(res => res.data);

const requestProducts = ids => Promise.all(ids.map(requestProduct));

const deliveries = {
    list: [],
    load: () =>
        request("https://lager.emilfolino.se/deliveries?api_key=697faad24a9c716bd57aabf7f1efb629")
            .then(({ data: ds }) =>
                requestProducts(ds.map(({ product_id: id }) => id)).then(ps =>
                    ds.map(d => Object.assign(d, { product: ps.find(p => p.id == d.product_id) }))
                )
            )
            .then(ds => (deliveries.list = ds)),
    newId: () =>
        deliveries.list
            .map(d => Number(d.id))
            .sort((id1, id2) => id1 - id2)
            .slice(-1)
            .reduce((_, id) => id + 1, 0),
    saveNewDelivery: delivery =>
        request({
            url: "https://lager.emilfolino.se/delivery",
            method: "POST",
            data: Object.assign({ api_key: "697faad24a9c716bd57aabf7f1efb629" }, delivery)
        }).then(() => deliveries.load())
};

export default deliveries;
