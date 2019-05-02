#!/usr/bin/env lua

-- Karl McGuire (karl@karlmcguire.com) 2019
--

local data = require("../data")
local html = require("../html")

local wms = {}
local posts = {}
local i = 0

-- created posts table for html template
for _, post in pairs(data) do
  if i == 20 then break end
  if post.image:find(".png") ~= nil then
    local wm = string.lower(post.title:sub(2, post.title:find("]") - 1))
    wms[wm] = wm
    table.insert(posts, {
      id    = i,
      title = post.title:sub(#wm + 3),
      user  = post.user,
      date  = post.date,
      stars = post.stars,
      image = post.image,
      wm    = wm,
      even  = i % 2 == 0,
      odd   = i % 2 ~= 0
    })
    i = i + 1
  end
end

local wm_options = {{id = 0, name = "all", selected = true}}
local i = 1

-- create wm_options table for options menu
for _, wm in pairs(wms) do
  table.insert(wm_options, {
    id   = i,
    name = wm,
  })
  i = i + 1
end

return html.base({
  title  = "blit",
  script = "home.js",
  header = html.header({blit = true}),
  main   = html.main({
    title   = "",
    content = html.posts.options({
      cols = {
        {label = "Window Manager", options = wm_options},
        {label = "Sort by", options = {
          {id = 0, name = "stars", selected = true}
        }},
        {label = "Order", options = {
          {id = 0, name = "descending", selected = true},
          {id = 1, name = "ascending"}
        }}
      }
    }) .. html.posts.thumbs({posts = posts})
  })
})
