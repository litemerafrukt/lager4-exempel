import * as m from "mithril";

import error from "./error";

const productSelect = {
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
                    "<produkt>"
                ),
                ...attrs.products.map(p =>
                    m("option", { value: p.id, selected: attrs.value == p.id }, `${p.name}`)
                )
            ]
        )
};

const initialFormData = () => ({
    id: "",
    productId: "0",
    amount: 1,
    deliveryDate: new Date().toISOString().split("T")[0],
    comment: ""
});

const submit = event => {
    event.preventDefault();
};

const form = {
    data: initialFormData(),
    info: "",
    reset: deliveries => {
        form.info = "";
        form.data = initialFormData();
        form.data.id = deliveries.newId();
    },
    save: (deliveries, products) => {
        const product = products.list.find(p => p.id == form.data.productId);

        if (product === undefined) {
            form.info = "Ingen vald produkt";
            return;
        }

        Promise.all([
            products.putProduct(product, {
                stock: product.stock + Number(form.data.amount)
            }),
            deliveries.saveNewDelivery({
                id: form.data.id,
                product_id: form.data.productId,
                amount: form.data.amount,
                delivery_date: form.data.deliveryDate,
                comment: form.data.comment
            })
        ])
            .then(() => {
                form.info = "Leveransen sparad!";
                form.reset(deliveries);
            })
            .catch(e => console.log(e) || (form.info = "Fel vid sparande av leveransen"));
    },
    oninit: ({ attrs: { model: { deliveries, products } } }) => {
        products.load().catch(e => {
            console.log(e);
            m.mount(document.getElementById("app"), null);
            m.render(document.getElementById("app"), m(error, { error: e }));
        });
        deliveries
            .load()
            .then(() => (form.data.id = deliveries.newId()))
            .catch(e => {
                console.log(e);
                m.mount(document.getElementById("app"), null);
                m.render(document.getElementById("app"), m(error, { error: e }));
            });
    },
    view: ({ attrs: { model: { deliveries, products } } }) => [
        m(
            "a.button",
            { href: "/delivery", oncreate: m.route.link, onclick: () => (form.info = "") },
            "Tillbaka"
        ),
        m("p.info", { onclick: () => (form.info = "") }, form.info),
        m("form", { onsubmit: submit }, [
            m("h2", { key: form.data.id }, `Leverans nr: ${form.data.id}`),
            m("label.input-label", "Leveransdatum"),
            m("input[type=date]", {
                value: form.data.deliveryDate,
                onchange: m.withAttr("value", value => (form.data.deliveryDate = value))
            }),
            m("label.input-label", "Produkt"),
            m(productSelect, {
                products: products.list,
                value: form.data.productId,
                onchange: ({ target }) => (form.data.productId = target.value)
            }),
            m("label.input-label", "Antal"),
            m("input[type=number]", {
                value: form.data.amount,
                min: 1,
                onchange: m.withAttr("value", value => (form.data.amount = value))
            }),
            m("label.input-label", "Kommentar"),
            m("textarea.input", {
                oninput: m.withAttr("value", value => {
                    form.data.comment = value;
                }),
                value: form.data.comment
            }),
            m(".button-group", [
                m(
                    "button[type=submit].button.full-width",
                    { onclick: () => form.save(deliveries, products) },
                    "Spara"
                ),
                m(
                    "button[type=button].button.full-width",
                    { onclick: () => form.reset(deliveries) },
                    "Reset"
                )
            ])
        ])
    ]
};

export default form;
