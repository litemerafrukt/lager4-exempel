import * as m from "mithril";

const login = {
    view: ({ attrs: { user } }) => [
        m("form", { onsubmit: e => e.preventDefault() }, [
            m("h2", `Logga in`),
            m("label.input-label", "Användarnamn"),
            m("input[type=input]", {
                value: user.username,
                onchange: m.withAttr("value", value => (user.username = value))
            }),
            m("label.input-label", "Lösenord"),
            m("input[type=password]", {
                value: user.password,
                onchange: m.withAttr("value", value => (user.password = value))
            }),
            m(".button-group", [
                m("button[type=submit].button.full-width", { onclick: user.login }, "Logga in"),
                m("button[type=button].button.full-width", { onclick: user.register }, "Registrera")
            ])
        ])
    ]
};

export default login;
