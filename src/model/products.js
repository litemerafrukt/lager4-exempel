import { request } from "mithril";

const products = {
    list: [],
    load: () =>
        request(
            "https://lager.emilfolino.se/products?api_key=697faad24a9c716bd57aabf7f1efb629"
        ).then(({ data }) => (products.list = data)),
    putProduct: (product, updates) =>
        console.log(product, updates) ||
        request({
            url: "https://lager.emilfolino.se/product",
            method: "PUT",
            data: Object.assign({ api_key: "697faad24a9c716bd57aabf7f1efb629" }, product, updates)
        }).then(() => products.load())
};

export default products;
