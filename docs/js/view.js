"use strict";

const links = {
    left: [
        { text: "blit", href: "/" },
        { text: "about", href: "/about" }
    ],
    right: [
        { text: "sign in", href: "/sign_in" },
        { text: "sign up", href: "/sign_up" }
    ],
};

const view = {
    nav: {},
    main: {},
    page: {},
    nap: {}
};

///////////////////////////////////////////////////////////////////////////////

view.nav.link = (text, href, path) => 
    `<a href="` + href + `" class="nav__link` + 
        ((path) ? ` nav__link--active` : ``) + `">` + text + `</a>`;

view.nav.render = (path) =>
    `<div class="wrap"><nav><div class="nav__links nav__links--left">` + 
        links.left.reduce((html, link) => html +
            view.nav.link(link.text, link.href, link.href == path), "") +
    `</div>` + `<div class="nav__links nav__links--right">` +
        links.right.reduce((html, link) => html +
            view.nav.link(link.text, link.href, link.href == path), "") +
    `</div></nav></div>`;

view.main.render = (path) =>
    `<div class="wrap"><div class="content">` + 
        view.page[path]() + `</div></div>`;

///////////////////////////////////////////////////////////////////////////////

view.page["/"]        = () => `welcome home!`;
view.page["/about"]   = () => "this is the about page!";
view.page["/sign_up"] = () => "sign up here!";
view.page["/sign_in"] = () => "sign in here!";

///////////////////////////////////////////////////////////////////////////////

view.nap["/"]        = () => {};
view.nap["/about"]   = () => {};
view.nap["/sign_up"] = () => {};
view.nap["/sign_in"] = () => {};

///////////////////////////////////////////////////////////////////////////////

export { view };
