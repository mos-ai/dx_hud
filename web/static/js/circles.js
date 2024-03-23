export default {
  HealthIndicator: new ProgressBar.Circle("#HealthIndicator", {
    strokeWidth: 13,
    trailWidth: 13,
    duration: 600,
  }),
  ArmourIndicator: new ProgressBar.Circle("#ArmourIndicator", {
    color: "rgb(0, 140, 255)",
    trailColor: "rgb(35, 35, 35)",
    strokeWidth: 13,
    trailWidth: 13,
    duration: 600,
  }),
  StaminaIndicator: new ProgressBar.Circle("#StaminaIndicator", {
    color: "rgb(255, 255, 204)",
    trailColor: "rgb(35, 35, 35)",
    strokeWidth: 13,
    _duration: 600,
    get duration() {
      return this._duration;
    },
    set duration(value) {
      this._duration = value;
    },
  }),
  HungerIndicator: new ProgressBar.Circle("#HungerIndicator", {
    color: "rgb(255, 164, 59)",
    trailColor: "rgb(35, 35, 35)",
    strokeWidth: 13,
    trailWidth: 13,
    duration: 600,
  }),
  ThirstIndicator: new ProgressBar.Circle("#ThirstIndicator", {
    color: "rgb(0, 140, 170)",
    trailColor: "rgb(35, 35, 35)",
    strokeWidth: 13,
    trailWidth: 13,
    duration: 600,
  }),
  StressIndicator: new ProgressBar.Circle("#StressIndicator", {
    color: "rgb(255, 74, 104)",
    trailColor: "rgb(35, 35, 35)",
    strokeWidth: 13,
    trailWidth: 13,
    duration: 600,
  }),
  OxygenIndicator: new ProgressBar.Circle("#OxygenIndicator", {
    trailColor: "rgb(35, 35, 35)",
    strokeWidth: 13,
    trailWidth: 13,
    duration: 600,
  }),
  SpeedIndicator: new ProgressBar.Circle("#SpeedIndicator", {
    color: "rgb(255, 255, 255)",
    trailColor: "rgb(35, 35, 35)",
    strokeWidth: 13,
    trailWidth: 13,
    duration: 600,
  }),
  FuelIndicator: new ProgressBar.Circle("#FuelIndicator", {
    trailColor: "rgb(35, 35, 35)",
    strokeWidth: 13,
    trailWidth: 13,
    duration: 600,
  }),
  VoiceIndicator: new ProgressBar.Circle("#VoiceIndicator", {
    strokeWidth: 13,
    trailWidth: 13,
    duration: 100,
  }),
};
