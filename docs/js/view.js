"use strict";

import { config } from "./config.js";
import { posts } from "./posts.js";

const redirect = (model, path) => {
    window.history.pushState({}, path, window.location.origin + path);
    view.render(model, path);
};

const comp = {
    option: (option) =>
        `<option value="` + option[0] + `"` + 
        ((option[2] != undefined) ? " selected>" : ">") + option[1] + 
        `</option>`,

    box: (header, content) =>
        `<div class="box">
            <h1 class="box__header">` + header + `</h1>
            <div class="box__content">` + content + `</div></div>`,

    form: (label, id, type, hint) =>
        `<div class="form__column">
            <label for="` + id + `">` + label + `</label>
            <input id="` + id + `" name="` + id + `" type="` + type + `"/>
            <div class="form__column__info">` + hint + `</div></div>`,

    error: (content, hide) =>
        `<div id="error" class="error ` + ((hide) ? "hide" : "") + `">
            <div class="error__content">` + content + `</div></div>`
};

const page = {
    "/": {
        options: (model, path) => 
            `<div class="options">
                <div class="options__column">
                    <label>Window Manager</label>
                    <select class="options__select" id="wm">` +
                        model.options.wm.reduce((a, o) => a +
                            comp.option(o), "") +
                    `</select>
                </div><div class="options__column">
                    <label>Sort by</label>
                    <select class="options__select">` +
                        model.options.sort.reduce((a, o) => a +
                            comp.option(o), "") +
                    `</select>
                </div><div class="options__column">
                    <label>Order</label>
                    <select class="options__select" id="order">` +
                        model.options.order.reduce((a, o) => a +
                            comp.option(o), "") +
                    `</select>
                </div><div class="options__column">
                    <button id="button" class="options__update">
                        Update
                    </button>
                </div>
            </div>`,

        render: (model, path) => {
            let i = 0;
            model.posts.map(post => {
                post.side = ((i++ % 2) == 0) ? "left" : "right";
            });

            return comp.box("",
                page["/"].options(model, path) + `<hr><div class="posts">` +
                posts(model) + `</div>`);
        },


        init: (model, path) => {
            // jquery ui plugin 1
            $(document).tooltip({track: true});

            // jquery plugin 1
            $("img.lazyload").lazyload();

            $(".post").click((e) => {
                const url = $(e.currentTarget).find("img").attr("data-original");
                // window.open(url);

                $.magnificPopup.open({
                  items: {
                    src: url,
                    type: 'image'
                  }
                });

            });

            $("#button").click(() => {
                const wm = $("#wm").children("option:selected");

                let posts = [];
                if (wm.text() == "all") {
                    posts = model.all;
                } else {
                    posts = model.all.filter(post =>
                        post.wm.toLowerCase() == wm.text());
                }

                model.options.wm.map(option => {
                    if (option.length == 3) {
                        option.pop();
                    }
                    if (option[0] == wm.val()) {
                        option.push(1);
                    }
                });

                // get sort direction
                const dir = $("#order").children("option:selected");
                model.options.order.map(option => {
                    if (option.length == 3) {
                        option.pop();
                    }
                    if (option[0] == dir.val()) {
                        option.push(1);
                    }
                });

                // ascending
                const asc = (a, b) => {
                    if (a.stars == b.stars) return 0;
                    return (a.stars < b.stars) ? 1 : -1;
                }

                // descending
                const des = (a, b) => {
                    if (a.stars == b.stars) return 0;
                    return (a.stars > b.stars) ? 1 : -1;
                }

                // sort based on order menu
                posts.sort((dir.val() == 0) ? asc : des);

                view.main.render({
                    all: model.all,
                    options: model.options,
                    posts: posts
                }, "/");
            });
        }
    },

    "/about": {
        render: (model, path) => {
            fetch(config.url.about)
                .then((resp) => resp.json())
                .then((data) => {
                    $("main").html(comp.box("About",
                        data.files["blit_about.html"].content));
                });

            return comp.box("About", "");
        },

        init: (model, path) => {}
    },

    "/contact": {
        render: (model, path) => {
            fetch(config.url.contact)
                .then((resp) => resp.json())
                .then((data) => {
                    $("main").html(comp.box("Contact",
                        data.files["blit_contact.html"].content));
                });

            return comp.box("Contact", "");
        },
        init: (model, path) => {}
    },

    "/sign_in": {
        render: (model, path) => comp.box("Sign in", 
            comp.error(model.error, model.error == undefined) + 
            `<div class="form__row">` +
            comp.form("Username", "username", "text",
                "Username requirements:") +
            comp.form("Password", "password", "password",
                "Password requirements:") +
            `</div><div class="form__row">
                <div class="form__column"></div>
                <div class="form__column">
                    <input id="button" type="submit" value="Sign in"/>
                </div>
            </div>`),

        init: (model, path) => {
            // focus first input box
            $("#username").focus();

            $("#button").click(() => {
                const data = {
                    username: $("#username").val(),
                    password: $("#password").val(),
                }

                // send to server
            });
        }
    },

    "/sign_up": {
        render: (model, path) => comp.box("Sign up", 
            comp.error(model.error, model.error == undefined) + 
            `<div class="form__row">` +
            comp.form("Username", "username", "text",
                "Username requirements:") +
            comp.form("Email", "email", "email",
                "Email requirements:") +
            `</div><div class="form__row">` +
            comp.form("Password", "password", "password",
                "Password requirements:") +
            comp.form("Password (again)", "password_confirm", "password",
                "Password requirements:") +
            `</div><div class="form__row">
                <div class="form__column">
                    <label for="terms">
                        <input type="checkbox" id="terms"/>
                        I accept the <a href="#">Terms and Conditions</a>.
                    </label>
                </div><div class="form__column">
                    <input id="button" type="submit" value="Sign up"/>
                </div>
            </div>`),

        init: (model, path) => {
            // focus first input box
            $("#username").focus();

            $("#button").click(() => {
                const data = {
                    username:         $("#username").val(),
                    email:            $("#email").val(),
                    password:         $("#password").val(),
                    password_confirm: $("#password_confirm").val(),
                    terms:            $("#terms").is(":checked"),
                };

                if(data.password != data.password_confirm) {
                    $("#error").text("Passwords must match.");
                    $("#error").removeClass("hide");

                    return;
                }

                $("#error").text("");
                $("#error").addClass("hide");

                // send to server
            });
        }
    },

    "/profile": {
        render: (model, path) => {
            if(!model.signed_in) {
                model.error = "You need to be signed in to view your profile.";
                redirect(model, "/sign_in");
                model.error = undefined;

                return;
            }

            return comp.box("Profile", "");
        },

        init: (model, path) => {}
    },

    "/post": {
        render: (model, path) => {
            if(!model.signed_in) {
                model.error = "You need to be signed in to post.";
                redirect(model, "/sign_in");
                model.error = undefined;

                return;
            }

            return comp.box("Post", "");
        },

        init: (model, path) => {}
    }
};

const view = {
    nav: {
        // nav__link
        link: (model, path, text, href) => `<a class="nav__link ` + 
            ((path == ("/" + href)) ? "nav__link--active" : "" ) + 
                `" href="/` + href + `">` + text + `</a>`,

        // nav__button
        button: (href) => `<a class="nav__button" href="/` + href + `">
            <i class="fas fa-plus"></i></a>`,

        // nav__links
        links: (model, path) => {
            let html = `<div class="nav__links">` + 
                view.nav.link(model, path, "blit", "") +
                view.nav.link(model, path, "about", "about") +
                view.nav.link(model, path, "contact", "contact") + `</div>`;

            if(!model.signed_in) {
                html += `<div class="nav__links">` +
                    view.nav.link(model, path, "sign in", "sign_in") +
                    view.nav.link(model, path, "sign up", "sign_up") +
                    view.nav.button("post") + `</div>`;
            } else {
                html += `<div class="nav__links">` +
                    view.nav.link(model, path, "profile", "profile") +
                    view.nav.button("post") + `</div>`;
            }

            return html;
        },

        // nav
        render: (model, path) => {
            // render html
            $("nav").html(view.nav.links(model, path));
            // init event listeners
            view.nav.init(model, path);
        },

        init: (model, path) => {
            // set up nav link handlers
            $("header").on("click", "nav a", function(e) {
                e.preventDefault();
                let href = $(this).attr("href");
                if (href == window.location.pathname) return;
                redirect(model, href);
            });
        }
    },

    main: {
        render: (model, path) => {
            // render html
            $("main").html(page[path].render(model, path));
            // init event listeners
            page[path].init(model, path);
        }
    },

    render: (model, path) => {
        view.nav.render(model, path);
        view.main.render(model, path);
    }
};

export { view };
