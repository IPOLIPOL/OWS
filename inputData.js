// input_data.js

// === Rain and Drip tray  ===
const rainfallIntensityLpsm2 = 0.03;         // Peak rainfall intensity (L/s/m²)
const catchmentAreaM2 = 380;                 // Total Cooler deck, both sides, inlcuding veritcal wall (m²)
const podVolumeM3 = 50;                     // Total Cooler deck, both OSS sides (m³)
const rainDurationMinutes = 60;              // Peak rainfall duration (minutes)
const runoffCoefficient = 1.0;               // Runoff coefficient (1.0 for impervious/painted surfaces)

// === Pipe system ===
const pipeDiameterM = 0.1;                   // Internal pipe diameter (m) — ≥ 0.1
const verticalHeightM = 6.0;                 // Vertical drop height from Cooler desk to main pipe (m)
const pipeBranchCount = 4;                   // Number of vertical branches from Cooler desks

const horizontalLengthM = 10;                // Horizontal pipe length (m)
const pipeSlopeMPerM = 0.01;                 // Slope of the horizontal pipe
const roughnessM = 0.0000053;                // Pipe roughness (glass fiber = 0.0053 mm)
const kinematicViscosityM2s = 1.31e-6;       // Kinematic viscosity of water at ~10°C

// === Flow characteristics ===
const fillingDegreeHor = 0.7;                   // Horizontal pipe filling degree (e.g. 0.7)
const fillingDegreeVer = 0.33;                  // Vertical pipe filling degree (e.g. 0.33)

// === Export all as a single object ===
module.exports = {
  rainfallIntensityLpsm2,
  catchmentAreaM2,
  podVolumeM3,
  rainDurationMinutes,
  runoffCoefficient,

  pipeDiameterM,
  verticalHeightM,
  pipeBranchCount,

  horizontalLengthM,
  pipeSlopeMPerM,
  roughnessM,
  kinematicViscosityM2s,

  fillingDegreeHor,
  fillingDegreeVer
};

