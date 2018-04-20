import { request } from "mithril";

const user = {
    email: "",
    password: "",
    jwt: null,
    validateEmail: () =>
        user.email.length < 1
            ? [false, "Ange email-adress"]
            : !user.email.includes("@") ? [false, "Saknas ett @"] : [true, ""],
    validatePassword: () =>
        user.password.length < 1 ? [false, "Lösenordet ska vara minst 1 tecken långt"] : [true, ""],
    register: () =>
        request({
            url: "https://lager.emilfolino.se/register",
            method: "POST",
            data: {
                api_key: "697faad24a9c716bd57aabf7f1efb629",
                email: user.email,
                password: user.password
            }
        }).catch(whatever => console.log(whatever) || Promise.reject(whatever)),
    login: () =>
        request({
            url: "https://lager.emilfolino.se/login",
            method: "POST",
            data: {
                api_key: "697faad24a9c716bd57aabf7f1efb629",
                email: user.email,
                password: user.password
            }
        }).then(({ data }) => {
            if (data.type !== "success") {
                return Promise.reject(new Error("Login failed"));
            }

            user.jwt = data.token;
            console.log("Login success: " + user.jwt);

            return "Login success";
        }),
    logout: () => {
        (user.email = ""), (user.password = ""), (user.jwt = null);
        // return Promise.resolve("Logout success");
    }
};

export default user;
