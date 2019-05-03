"use strict";

const generate = (even) => ({
    image: "https://i.imgur.com/BziH1iE.png",
    side: (even) ? "left" : "right",
    title: "The quick brown fox jumped over the lazy dog",
    user: Math.random().toString(36).substring(7),
    wm: "2bwm",
    stars: parseInt(Math.random() * 15000)});

const generator = function* (n) {
    for(let i = 0; i < n; i++)
        yield generate((i % 2) == 0)};

const format = (post) =>
    ((post.side == "left") ? `<div class="posts__column">` : ``) +
    `<div class="post">
        <div class="post__thumbnail">
            <img src="` + post.image + `"/>
        </div>
        <div class="post__info">
            <div class="post__info__title">` + post.title + `</div>
            <div class="post__info__peek">
                <div class="peek__group">
                    <div class="peek__item">
                        <i class="fas fa-user"></i> ` + post.user + `
                    </div>
                    <div class="peek__item">
                        <i class="fas fa-laptop-code"></i> ` + post.wm + `
                    </div>
                </div>
                <div class="peek__group">
                    <div class="peek__item peek__item--red">
                        <i class="fas fa-star-of-life"></i> ` + post.stars + `
                    </div>
                </div>
            </div>
        </div>
    </div>` +
    ((post.side == "right") ? `</div>` : ``);

/*
const posts = (n) =>
    Array.from(generator(n)).reduce((posts, post) => posts + format(post), "");
*/

const posts = (model) =>
    model.posts.reduce((posts, post) => posts + format(post), "");

export { posts };
