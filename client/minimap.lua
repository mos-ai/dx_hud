local mapState = 1
local mapLimit = 3

if GetConvar('hud:circleMap', 'true') == 'true' then
    mapLimit = 1

    CreateThread(function()
        DisplayRadar(false)

        RequestStreamedTextureDict('circlemap', false)
        repeat Wait(100) until HasStreamedTextureDictLoaded('circlemap')
        AddReplaceTexture('platform:/textures/graphics', 'radarmasksm', 'circlemap', 'radarmasksm')

        SetMinimapClipType(1)
        SetMinimapComponentPosition('minimap', 'L', 'B', -0.017, -0.02, 0.207, 0.32)
        SetMinimapComponentPosition('minimap_mask', 'L', 'B', 0.06, 0.00, 0.132, 0.260)
        SetMinimapComponentPosition('minimap_blur', 'L', 'B', 0.005, -0.05, 0.166, 0.257)

        repeat Wait(100) until PlayerLoaded

        Wait(500)
        SetRadarBigmapEnabled(true, false)
        Wait(500)
        SetRadarBigmapEnabled(false, false)

        local minimap = RequestScaleformMovie('minimap')
        repeat Wait(100) until HasScaleformMovieLoaded(minimap)

        DisplayRadar(GetConvar('hud:persistentRadar', 'false') == 'true')
        while true do
            BeginScaleformMovieMethod(minimap, 'SETUP_HEALTH_ARMOUR')
            ScaleformMovieMethodAddParamInt(3)
            EndScaleformMovieMethod()
            Wait(200)
        end
    end)
end

if GetConvar('hud:persistentRadar', 'false') == 'true' then
    local function setRadarState()
        if mapState == 0 then
            DisplayRadar(false)
        elseif mapState == 1 then
            DisplayRadar(true)
            SetBigmapActive(false, false)
        elseif mapState == 2 then
            DisplayRadar(true)
            SetBigmapActive(true, false)
        elseif mapState == 3 then
            DisplayRadar(true)
            SetBigmapActive(true, true)
        end
    end

    setRadarState()

    RegisterCommand('cyclemap', function()
        if mapState == mapLimit then
            mapState = 0
        else
            mapState += 1
        end

        setRadarState()
    end, false)

    RegisterKeyMapping('cyclemap', 'Cycle Map', 'keyboard', 'z')
    CreateThread(function()
        Wait(1000)
        TriggerEvent('chat:removeSuggestion', '/cyclemap')
    end)
end