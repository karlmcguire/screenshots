#!/usr/bin/env lua

-- Karl McGuire (karl@karlmcguire.com) 2019
--
-- TODO

local data = require("data")

-- print 
for _, post in pairs(data) do print(post.stars, post.title) end
