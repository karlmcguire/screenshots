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

view.main.render = (path, model) =>
    `<div class="wrap"><div class="content">` + 
        view.page[path](model) + `</div></div>`;

///////////////////////////////////////////////////////////////////////////////

view.page["/"] = (model) => {
    const newest = (a, b) => new Date(b.date) - new Date(a.date);
    const oldest = (a, b) => new Date(a.date) - new Date(b.date);

    const sorted = model.posts.sort(
        (model.sorting == "newest") ? newest : oldest);

    const option = (name) => `<option value="` + name + `"` +
        ((model.sorting == name) ? " selected" : "") + `>` + name + `</option>`;

    const select = `
        <div class="select">
            <label for="select__method">Sorting method:</label>
        </div>
        <div class="select">
        <div class="select__menu">
            <select name="select__method" id="select__method">
            ` +
            option("newest") + 
            option("oldest") +
            ` 
            </select>
        </div>
        <button id="select__button">Sort</button>
        </div>`;

    const posts = sorted.reduce((posts, post) => 
        posts + `<div class="post">` + `<img src="` + 
        post.image + `"/><div class="post__info"><span class="post__title">` +
        post.title + `</span><span class="post__user">` +
        post.user + ` (` + $.datepicker.formatDate("MM d, yy", post.date) + 
        `)</span></div></div>`, "");

    return select + posts;
}

view.nap["/"] = (model) => {
    $("#select__method").selectmenu();
    $("#select__button").button();

    $("#select__button").click(() => {
        model.sorting = $("#select__method").val();

        $("main").html(view.main.render("/", model));
        view.nap["/"](model);
    });
};

///////////////////////////////////////////////////////////////////////////////

view.page["/about"] = (model) => "this is the about page!";
view.page["/sign_up"] = (model) => "sign up here!";
view.page["/sign_in"] = (model) => "sign in here!";

view.nap["/about"] = (model) => {};
view.nap["/sign_up"] = (model) => {};
view.nap["/sign_in"] = (model) => {};

///////////////////////////////////////////////////////////////////////////////

export { view };
