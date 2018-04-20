import * as m from "mithril";

import menu from "./menu";

export default {
    view: vnode => [
        m("header", m("h1", "Infinity Warehouses")),
        m("main.container", vnode.children),
        m(menu)
    ]
};
