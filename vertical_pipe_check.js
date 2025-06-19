// vertical_pipe_check.js
// Check if vertical pipe can sustain the required flow (Wyly–Eaton equation approximation)

const input = require('./inputData');
const { calculateRequiredOWSFlowRate } = require('./OWS_size_calc');

/**
 * Calculates maximum flow rate through a vertical pipe using Wyly–Eaton approximation
 * @param {number} diameter - pipe internal diameter (m)
 * @param {number} height - vertical height (m)
 * @param {number} fillingDegreeVer - assumed pipe filling (0 < x <= 1)
 * @returns {number} maxFlowLps - max flow rate in liters per second (L/s)
 */
function calculateVerticalPipeCapacity(diameter, height, fillingDegreeVer) {
  const g = 9.81;

  // Cross-sectional area (m²)
  const area = Math.PI * Math.pow(diameter, 2) / 4 * fillingDegreeVer;

  // Simplified vertical discharge velocity: v = sqrt(2gh)
  const velocity = Math.sqrt(2 * g * height);

  const flowRate = area * velocity; // m³/s
  return flowRate * 1000; // L/s
}

module.exports = {
  calculateVerticalPipeCapacity,
  testVerticalPipe: () => {
    const totalRequiredFlow = calculateRequiredOWSFlowRate();
    const flowPerBranch = totalRequiredFlow / input.pipeBranchCount;

    const branchCapacity = calculateVerticalPipeCapacity(
      input.pipeDiameterM,
      input.verticalHeightM,
      input.fillingDegreeVer
    );

    const totalCapacity = branchCapacity * input.pipeBranchCount;

    return {
      flowPerBranch: flowPerBranch.toFixed(3),
      branchCapacity: branchCapacity.toFixed(3),
      totalCapacity: totalCapacity.toFixed(3),
      isSufficient: totalCapacity >= totalRequiredFlow,
    };
  }
};
