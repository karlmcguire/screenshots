-- Karl McGuire (karl@karlmcguire.com) 2019
--
--

local template = require("lustache")

return {
  base = function(data)
    return template:render([[
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{title}}</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/solid.css" integrity="sha384-QokYePQSOwpBDuhlHOsX0ymF6R/vLk/UQVz3WHa6wygxI5oGTmDTv8wahFOSspdm" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/fontawesome.css" integrity="sha384-vd1e11sR28tEK9YANUtpIOdjGW14pS87bUBuOIoBILVWLFnS+MCX9T6MMf0VdPGq" crossorigin="anonymous">
        <link rel="stylesheet" href="/index.css">
        <script src="/{{script}}"></script>
      </head>
      <body>
        {{{header}}}
        {{{main}}}
        <footer class="wrap">
          &copy; Karl McGuire 2019
        </footer>
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
        <div class="box__content">{{{content}}}</div>
      </div>
    </main>
    ]], data)
  end,

  posts = {
    options = function(data)
      return template:render([[
      <div class="options">
        {{#cols}}
          <div class="options__column">
            <label>{{label}}</label>
            <select class="options__select">
              {{#options}}
                <option value="{{id}}"{{#selected}} selected{{/selected}}>{{name}}</option>
              {{/options}}
            </select>
          </div>
        {{/cols}}
        <div class="options__column">
          <button id="button" class="options__update">Update</button>
        </div>
      </div>
      <hr>
      ]], data)
    end,

    thumbs = function(data)
      return template:render([[
      <div class="posts">
        {{#posts}}
        {{#even}}
        <div class="posts__column">
        {{/even}}

          <div class="post" data-id="{{id}}">
            <div class="post__thumbnail">
              <img src="{{image}}">
            </div>
            <div class="post__info">
              <div class="post__info__title">{{title}}</div>
              <div class="post__info__peek">
                <div class="peek__group">
                  <div class="peek__item">
                    <i class="fas fa-user"></i> {{user}}
                  </div>
                  <div class="peek__item">
                    <i class="fas fa-laptop-code"></i> {{wm}}
                  </div>
                </div>
                <div class="peek__group">
                  <div class="peek__item peek__item--red">
                    <i class="fas fa-star-of-life"></i> {{stars}}
                  </div>
                </div>
              </div>
            </div>
          </div>

        {{#odd}}
        </div>
        {{/odd}}
        {{/posts}}
      </div>
      ]], data)
    end
  }
}
