"use strict";

let model = {
    signed_in: false,

    wms: new Set(),
    posts: [],

    options: {
        wm: [
            [0, "all", 1]
        ],

        sort: [
            [0, "stars", 1]
        ],

        order: [
            [0, "descending", 1],
            [1, "ascending"]
        ]
    }
};

export { model };
