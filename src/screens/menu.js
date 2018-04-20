import * as m from "mithril";

const onRoute = (route, className, exact = "no") =>
    exact !== "exact" && m.route.get().startsWith(route)
        ? className
        : m.route.get() === route ? className : "";

const menuItem = {
    view: vnode =>
        m("a", { href: vnode.attrs.href, oncreate: m.route.link, class: vnode.attrs.active }, [
            m("i.material-icons", `${vnode.attrs.icon}`),
            m("span.icon-text", `${vnode.attrs.text}`)
        ])
};

export default {
    view: () =>
        m("nav.bottom-nav", [
            m(menuItem, {
                href: "/",
                active: onRoute("/", "active", "exact"),
                icon: "home",
                text: "Hem"
            }),
            m(menuItem, {
                href: "/delivery",
                active: onRoute("/delivery", "active"),
                icon: "archive",
                text: "Leveranser"
            }),
            m(menuItem, {
                href: "/invoice",
                active: onRoute("/invoice", "active"),
                icon: "assignment",
                text: "Fakturor"
            }),
            m(menuItem, {
                href: "/user",
                active: onRoute("/user", "active"),
                icon: "face",
                text: "Användare"
            })
        ])
};
