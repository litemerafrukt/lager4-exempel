import * as m from "mithril";

const login = {
    showRegistration: false,
    validation: { email: "", password: "" },
    resetValidation: () => {
        login.validation.email = "";
        login.validation.password = "";
    },
    validate: user => {
        const [validEmail, emailValidationMessage] = user.validateEmail();
        const [validPassword, passwordValidationMessage] = user.validatePassword();

        login.validation.email = emailValidationMessage;
        login.validation.password = passwordValidationMessage;

        return validEmail && validPassword;
    },
    login: user => {
        if (!login.validate(user)) {
            return;
        }

        login.resetValidation();
        user
            .login()
            .then(() => {
                if (m.route.reroute) {
                    const reroute = m.route.reroute;

                    m.route.reroute = null;
                    m.route.set(reroute);
                } else {
                    m.route.set("/user");
                }
            })
            .catch(e => {
                console.log(e);
                login.validation.email = e.errors.title;
                login.showRegistration = true;
            });
    },
    register: user => {
        if (!login.validate(user)) {
            return;
        }

        login.resetValidation();
        user.register().then(() => login.login(user));
    },
    view: ({ attrs: { model: { user } } }) => [
        m("form", { onsubmit: e => e.preventDefault() }, [
            m("h2", `Logga in`),
            m("label.input-label", "E-post"),
            m("input[type=input]", {
                value: user.email,
                oninput: ({ target }) => {
                    user.email = target.value;
                    login.validation.email = "";
                }
            }),
            (() =>
                login.validation.email !== "" &&
                m("p.validation-error", `${login.validation.email}`))(),
            m("label.input-label", "Lösenord"),
            m("input[type=password]", {
                value: user.password,
                oninput: ({ target }) => {
                    user.password = target.value;
                    login.validation.password = "";
                }
            }),
            (() =>
                login.validation.password !== "" &&
                m("p.validation-error", `${login.validation.password}`))(),
            m(".button-group", [
                m(
                    "button[type=submit].button.full-width",
                    { onclick: () => login.login(user) },
                    "Logga in"
                ),
                login.showRegistration &&
                    m(
                        "button[type=button].button.full-width",
                        { onclick: () => login.register(user) },
                        "Registrera"
                    )
            ])
        ])
    ]
};

export default login;
