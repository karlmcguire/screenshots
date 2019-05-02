#!/usr/bin/env lua

-- Karl McGuire (karl@karlmcguire.com) 2019
--
--

local html = require("../html")

return html.base({
  title  = "About",
  script = "about.js",
  header = html.header({about = true}),
  main   = html.main({
    title   = "About",
    content = "Hello world!"
  })
})
