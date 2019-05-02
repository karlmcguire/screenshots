-- Karl McGuire (karl@karlmcguire.com) 2019
--
-- TODO

local post = {}

function post.new(data)
  return {
    title = data.title,
    user  = data.author,
    date  = data.created,
    image = data.url,
    stars = data.score,
    desc  = data.selftext_html,
    link  = data.permalink
  }
end

return post
