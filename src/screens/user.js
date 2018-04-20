import m from "mithril";

const user = {
    view: ({ attrs: { model: { user } } }) =>
        console.log(user) ||
        m(
            "section",
            { key: user.email },
            user.jwt !== null
                ? m("div", [
                    m("h2", "Inloggad som"),
                    m("p", `${user.email}`),
                    m("button.button", { onclick: user.logout }, "Logga ut")
                ])
                : m(".button-group", [
                    m("a.button", { href: "/login", oncreate: m.route.link }, "Logga in"),
                    m(
                        "a.button",
                        { href: "/login/register", oncreate: m.route.link },
                        "Registrera"
                    )
                ])
        )
};

export default user;
