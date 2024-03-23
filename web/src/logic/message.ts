
import { create } from "zustand";

import {EventEmitter} from "events";

export const emitter = new EventEmitter();


export interface GeneralState {
  display: boolean;
  setDisplay: (value: boolean) => void;
}
export const useGeneralStore = create<GeneralState>((set) =>{
  const setDisplay = (value) => {
    // console.log("setDisplay", value);
    return set((state) => ({ display: value }))
  };
  emitter.on("toggleHud", setDisplay);
  return ({
    display: false,
    setDisplay,
  });
});

type Coords = {
  x: number;
  y: number;
  z: number;
};

export interface CoordsState {
  coords: Coords;
  setCoords: (coords: Coords) => void;
}

export const useCoordsStore = create<CoordsState>((set) => {
  function setCoords(coords: Coords) {
    return set((state) => ({ coords }));
  }
  emitter.on("coords", setCoords);
  return ({
    coords: { x: 0, y: 0, z: 0 },
    setCoords,
  });
});



export function onMessage(event: MessageEvent) {
  const { action, message } = event.data;
  emitter.emit(action, message);
}

export interface Health {
  current: number;
  max: number;
}

export interface HealthState {
  health: Health;
  setHealth: (value: Health) => void;
}

export const useHealthStore = create<HealthState>((set) => {
  function setHealth(health: Health) {
    return set((state) => ({ health }));
  }
  emitter.on("setHealth", setHealth);
  return ({
    health: { current: 100, max: 100 },
    setHealth,
  });
});

export interface ArmorState {
  armor: number;
  setArmor: (value: number) => void;
}

export const useArmorStore = create<ArmorState>((set) => {
  function setArmor(armor: number) {
    return set((state) => ({ armor }));
  }
  emitter.on("setArmor", setArmor);
  return ({
    armor: 0,
    setArmor,
  });
});

export interface Oxygen {
  current: number;
  max: number;
}

export interface OxygenState {
  oxygen: Oxygen | undefined;
  setOxygen: (value: Oxygen) => void;
}

export const useOxygenStore = create<OxygenState>((set) => {
  function setOxygen(oxygen: Oxygen) {
    return set((state) => ({ oxygen }));
  }
  emitter.on("setOxygen", setOxygen);
  return ({
    oxygen: undefined,
    setOxygen,
  });
});

export interface Stamina {
  current: number;
  max: number;
}

export interface StaminaState {
  stamina: Stamina;
  setStamina: (value: Stamina) => void;
}

export const useStaminaStore = create<StaminaState>((set) => {
  function setStamina(stamina: Stamina) {
    return set((state) => ({ stamina }));
  }
  emitter.on("setStamina", setStamina);
  return ({
    stamina: { current: 100, max: 100 },
    setStamina,
  });
});


export interface Vehicle {
  speed: {
    current: number;
    max: number;
  },
  unitsMultiplier: number;
  fuel: number;
}

export interface VehicleState {
  vehicle: Vehicle | undefined;
  setVehicle: (value: Vehicle) => void;
}

export const useVehicleStore = create<VehicleState>((set) => {
  function setVehicle(vehicle: Vehicle) {
    return set((state) => ({ vehicle }));
  }
  emitter.on("setVehicle", setVehicle);
  return ({
    vehicle: {
      speed: {
        current: 0,
        max: 0,
      },
      unitsMultiplier: 1,
      fuel: 100,
    },
    setVehicle,
  });
});

interface SeatbeltState {
  seatbelt: boolean;
  setSeatbelt: (value: boolean) => void;
}

export const useSeatbeltStore = create<SeatbeltState>((set) => {
  function setSeatbelt(value: boolean) {
    return set((state) => ({ seatbelt: value }));
  }
  emitter.on("setSeatbelt", setSeatbelt);
  return ({
    seatbelt: false,
    setSeatbelt,
  });
});

// const Buckle = document.getElementById("buckle") as HTMLAudioElement;
// const Unbuckle = document.getElementById("unbuckle");
// emitter.on("playSound", (data) => {
//   switch (data) {
//     case "unbuckle":
//       Unbuckle.volume = 0.2;
//       Unbuckle.play();
//       break;
//     case "buckle":
//       Buckle.volume = 0.2;
//       Buckle.play();
//       break;
//     default:
//       break;
//   }
// });