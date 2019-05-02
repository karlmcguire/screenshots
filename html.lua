-- Karl McGuire (karl@karlmcguire.com) 2019
--
--

local template = require("lustache")

return {
  page = function(data)
    return template:render([[
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{title}}</title>
        <link rel="stylesheet" href="/index.css">
        <script src="/index.js"></script>
      </head>
      <body>
        {{header}}
        {{main}}
        <footer></footer>
      </body>
    </html>
    ]], data)
  end,

  header = function(data)
    return template:render([[
    <header>
      <nav class="wrap">
        <div class="nav__links">
          <a class="nav__link{{#blit}} nav__link--active{{/blit}}" href="/">blit</a>
          <a class="nav__link{{#about}} nav__link--active{{/about}}" href="/about/">about</a>
          <a class="nav__link{{#contact}} nav__link--active{{/contact}}" href="/contact/">contact</a>
        </div>
        <div class="nav__links">
          <a class="nav__link{{#sign_in}} nav__link--active{{/sign_in}}" href="/sign_in/">sign in</a>
          <a class="nav__link{{#sign_up}} nav__link--active{{/sign_up}}" href="/sign_up/">sign up</a>
          <a class="nav__button" href="/post/"><i class="fas fa-plus"></i></a>
        </div>
      </nav>
    </header>
    ]], data)
  end,

  main = function(data)
    return template:render([[
    <main class="wrap">
      <div class="box">
        <h1 class="box__header">{{title}}</h1>
        <div class="box__content">{{content}}</div>
      </div>
    </main>
    ]], data)
  end
}
