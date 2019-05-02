#!/usr/bin/env lua

local json = require("cjson")

local path = "./data/posts.json"
local file = io.open(path, "r")
local href = "https://reddit.com/r/unixporn/hot.json"
local user = [[Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36]] ..
             [[ (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36]]

-- check if the data is already downloaded
if file == nil then
  os.execute([[curl -K "]] .. user .. [[" -L "]] .. href .. [[" -o ]] .. path)
  file = io.open(path, "r")
end

-- decode json file
local data = json.decode(file:read("*a"))

-- json decode failed
if data == nil then
  print("error decoding " .. path)
  return
end

for id, post in pairs(data.data.children) do
  print(post.data.score, post.data.title)
  print("\t" .. post.data.author)
  print("\t" .. post.data.created)
  print("\t" .. post.data.url)
  print()
end
