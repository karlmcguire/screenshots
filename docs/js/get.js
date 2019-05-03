"use strict";

const fetch = require("node-fetch");
const fs = require("fs");

let model = {
    posts: []
};

// get posts from reddit
fetch("https://www.reddit.com/r/unixporn.json")
    .then((resp) => resp.json())
    .then((data) => {
        let left = false;

        data.data.children.map(post => {
            if(post.data.url.substr(-3) != "png") return;
            if(left) left = false; else left = true;

            const info = new RegExp("\\[(.*)\\]").exec(post.data.title);

            model.posts.push({
                image: post.data.url,
                side: (left) ? "left" : "right",
                title: post.data.title.substr(info[0].length),
                user: post.data.author,
                wm: info[1],
                stars: post.data.score 
            });
        });

        const stream = fs.createWriteStream("../posts.json");
        stream.write(JSON.stringify(model.posts, null, 2));
        stream.end();
    });


