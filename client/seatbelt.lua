



if GetConvarInt('hud:seatbelt', false) == 0 then return end

local isBuckled = false
SetFlyThroughWindscreenParams(15.0, 20.0, 17.0, 2000.0)

local function Buckled()
	CreateThread(function()
		while isBuckled do
			lib.disableControls()
			Wait(0)
		end
	end)
end

local function Seatbelt(status)
	if status then
		-- SendMessage('playSound', 'buckle')
		SendMessage('setSeatbelt', true)
		SetFlyThroughWindscreenParams(1000.0, 1000.0, 0.0, 0.0)
		lib.disableControls:Add(75)
		Buckled()
	else
		-- SendMessage('playSound', 'unbuckle')
		SendMessage('setSeatbelt', false)
		SetFlyThroughWindscreenParams(15.0, 20.0, 17.0, 2000.0)
		lib.disableControls:Remove(75)
	end
	isBuckled = status
end

local inVehicle
CreateThread(function()
	while true do
		if HUD then
			local isPedUsingAnyVehicle = cache.vehicle and true or false
			if isPedUsingAnyVehicle ~= inVehicle then
				-- SendMessage('setSeatbelt', isPedUsingAnyVehicle)
				if not isPedUsingAnyVehicle and isBuckled then isBuckled = false end
				inVehicle = isPedUsingAnyVehicle
			end
		end
		Wait(1000)
	end
end)

print "Seatbelt add"
RegisterKeyMapping('seatbelt', 'Seatbelt', 'keyboard',  GetConvar('hud:seatbeltKey', 'B'))
RegisterCommand('seatbelt', function()
  if cache.vehicle then
    local curVehicleClass = GetVehicleClass(cache.vehicle)

    if curVehicleClass ~= 8
      and curVehicleClass ~= 13
      and curVehicleClass ~= 14
    then
      Seatbelt(not isBuckled)
    end
  end
end)

-- lib.addKeybind({
-- 	name = 'seatbelt',
-- 	description = 'Toggle Seatbelt',
--   defaultMapper = 'keyboard',
-- 	defaultKey = GetConvar('hud:seatbeltKey', 'B'),
-- 	onPressed = function()
-- 		print "KeyBind"
-- 		if cache.vehicle then
-- 			local curVehicleClass = GetVehicleClass(cache.vehicle)

-- 			if curVehicleClass ~= 8
-- 				and curVehicleClass ~= 13
-- 				and curVehicleClass ~= 14
-- 			then
-- 				Seatbelt(not isBuckled)
-- 			end
-- 		end
-- 	end,
-- })

function ShowHelpText(text, beep)
	SetTextComponentFormat('STRING')
	AddTextComponentSubstringPlayerName(text)
	EndTextCommandDisplayHelp(0, 0, beep, -1)
end

function DoesPedVehicleHaveSeatbelt(ped)
  if not IsPedInAnyVehicle(ped)
     or IsPedOnAnyBike(ped)
     or IsPedInAnyBoat(ped)
     or IsPedInAnyPlane(ped)
     or IsPedInAnyHeli(ped)
  then return false, false end

  local vehicle = GetVehiclePedIsIn(ped)
  local model = GetEntityModel(vehicle)
  if Constants.Excluded[model] then
    if Constants.Excluded[model] == 2 then
      return true, true
    elseif type(Constants.Excluded[model]) == 'table' then
      for seat, type in pairs(Constants.Excluded[model]) do
        if GetPedInVehicleSeat(vehicle, seat - 2) == ped then
          return false, type == 2
        end
      end
    end
  end
  return true, false
end