"use strict";

import { model } from "./model.js";
import { view } from "./view.js";
import { action } from "./action.js";

const render = (path) => {
    $("header").html(view.nav.render(path));

    $("main").html(view.main.render(path, model));
    view.nap[path](model);
};

$(() => {
    render(window.location.pathname);

    $("header").on("click", ".nav__link", function(e) {
        e.preventDefault();
   
        // href of the clicked link
        let href = $(this).attr("href");

        // if the page is already active, don't do anything
        if (href == window.location.pathname) {
            return; 
        }

        // change the url
        window.history.pushState({}, href, window.location.origin + href);
        
        render(href); 
    });
});
