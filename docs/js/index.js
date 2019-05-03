"use strict";

import { model } from "./model.js";
import { view } from "./view.js";
import { action } from "./action.js";

$(() => {
    // get posts from reddit
    fetch("/posts.json")
        .then((resp) => resp.json())
        .then((data) => {
            // delete the bad hosts
            model.posts = data.filter(post => !post.image.includes("teknik"));
            // create window manager set
            model.posts.map(post => model.wms.add(post.wm.toLowerCase()));
            // create options from window manager set
            let i = 1;
            Array.from(model.wms).map(wm => model.options.wm.push([i++, wm]));
            // render
            view.render(model, window.location.pathname);
        });
});
