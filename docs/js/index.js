"use strict";

import { model } from "./model.js";
import { view } from "./view.js";
import { action } from "./action.js";

$(() => {
    $("header").html(view.nav.render(window.location.pathname));   

    $("header").on("click", ".nav__link", function(e) {
        e.preventDefault();
    
        let href = $(this).attr("href");

        // change the url
        window.history.pushState({}, href, window.location.origin + href);
        
        // render the nav with the new active link 
        $("header").html(view.nav.render(href));
    });
});
