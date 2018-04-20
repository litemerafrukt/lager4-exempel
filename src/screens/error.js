import * as m from "mithril";

const style = {
    "border-radius": "0.2rem",
    border: "2px solid red",
    "background-color": "lightcoral",
    color: "#fff",
    margin: "2rem",
    padding: "1rem"
};

export default {
    view: ({ attrs: { error } }) =>
        m(".error-wrapper", { style }, [m("h2", "Något gick fel..."), m("p", `${error.message}`)])
};
