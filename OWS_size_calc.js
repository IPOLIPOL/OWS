// OWS_size_calc.js
// Calculates the required capacity of the oil-water separator (filter)

const {
  rainfallIntensityLpsm2,
  catchmentAreaM2,
  rainDurationMinutes,
  runoffCoefficient,
} = require('./inputData');

/**
 * Calculate the required filter (OWS) flow rate in liters per second.
 * @returns {number} Required flow rate in L/s
 */
function calculateRequiredOWSFlowRate() {
  const rainfallVolumeL =
    rainfallIntensityLpsm2 * catchmentAreaM2 * 60 * rainDurationMinutes * runoffCoefficient;
  const requiredFlowRateLps = rainfallVolumeL / (rainDurationMinutes * 60);
  return requiredFlowRateLps;
}

module.exports = { calculateRequiredOWSFlowRate };

/*
console.log('=== OWS Required Flow Rate Calculation ===');
const requiredOWSFlowRate = calculateRequiredOWSFlowRate();
console.log(`Required OWS flow rate: ${requiredOWSFlowRate.toFixed(2)} L/s`);
*/