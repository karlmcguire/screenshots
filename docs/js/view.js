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
};

view.nav.link = (text, href, active) => 
    `<a href="` + href + `" class="nav__link` + 
        ((active) ? ` nav__link--active` : ``) + `">` + text + `</a>`;

view.nav.render = (active) =>
    `<nav><div class="nav__links nav__links--left">` + 
        links.left.reduce((html, link) => html +
            view.nav.link(link.text, link.href, link.href == active), "") +
    `</div>` + `<div class="nav__links nav__links--right">` +
        links.right.reduce((html, link) => html +
            view.nav.link(link.text, link.href, link.href == active), "") +
    `<div></nav>`;

export { view };
