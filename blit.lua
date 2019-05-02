#!/usr/bin/env lua

local page = {
  home  = require("page/home"),
  about = require("page/about")
}

print(page.about)
