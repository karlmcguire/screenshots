-- Karl McGuire (karl@karlmcguire.com) 2019
--
-- TODO

local template = require("lustache")

print(template:render(
  "{{{title}}} spends {{calc}} and is {{info.age}}",
  {
    title = "<b>hello</b>",
    calc = function()
      return 2 + 4
    end,
    info = {
      age = 17
    }
  }
))
