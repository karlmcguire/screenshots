-- Karl McGuire (karl@karlmcguire.com) 2019
--
-- Looks for post data in ./data and downloads it if it doesn't exist.

local post = require("post")
local json = require("cjson")

local http = {
  url   = "https://reddit.com/r/unixporn/hot.json?limit=100",
  agent = [[Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ]] ..
          [[(KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36]]
}

local path = {
  unprocessed = "./data/unprocessed.json",
  processed   = "./data/processed.json"
}

local file = {
  unprocessed = io.open(path.unprocessed, "r"),
  processed   = io.open(path.processed, "r")
}

if file.processed == nil then
  if file.unprocessed == nil then
    os.execute([[curl -K "]] .. user .. [[" -L "]] .. href .. [[" -o ]] .. path)
    file.unprocessed = io.open(path.unprocessed, "r")
  end

  -- get lua values from json
  local data = json.decode(file.unprocessed:read("*a"))
  if data == nil then
    print("error decoding " .. path.unprocessed)
    return
  end
  file.unprocessed:close()

  -- create table containing processed posts
  local posts = {}
  for k, v in pairs(data.data.children) do 
    table.insert(posts, post.new(v.data))
  end

  -- open processed file for writing (create if not exist)
  file.processed = io.open(path.processed, "w+")

  -- write processed posts to disk
  file.processed:write(json.encode(posts))

  -- for decoding after this
  file.processed:close()
  file.processed = io.open(path.processed, "r")
end

return json.decode(file.processed:read("*a"))
