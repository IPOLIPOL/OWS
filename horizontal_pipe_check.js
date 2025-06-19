// horizontal_pipe_check.js
// Check if horizontal pipe can sustain the required flow (Darcy–Weisbach + Colebrook–White)

const input = require('./inputData');
const { calculateReynoldsNumber, solveColebrookWhite } = require('./utils');

/**
 * Calculates maximum flow rate through a horizontal pipe using Darcy–Weisbach and Colebrook–White equations
 * @param {number} diameter - internal pipe diameter (m)
 * @param {number} length - pipe length (m)
 * @param {number} slope - pipe slope (m/m)
 * @param {number} roughness - absolute roughness of the pipe (m)
 * @param {number} viscosity - kinematic viscosity of fluid (m²/s)
 * @param {number}  fillingDegreeHor - degree of filling (0 < x <= 1)
 * @returns {number} maxFlowLps - max flow in liters per second (L/s)
 */
function calculateHorizontalPipeCapacity(
  diameter,
  length,
  slope,
  roughness,
  viscosity,
  fillingDegreeHor

) {
  const g = 9.81;

  // Hydraulic radius (assuming circular pipe partially filled)
  const rHydraulic = (diameter *  fillingDegreeHor) / 2;

  // Use slope as head loss per unit length
  const hf = slope * length;

  // Estimate velocity iteratively
  const area = (Math.PI * Math.pow(diameter, 2)) / 4 *  fillingDegreeHor
;
  let velocity = Math.sqrt(2 * g * hf);

  const reynolds = calculateReynoldsNumber(velocity, diameter, viscosity);
  const frictionFactor = solveColebrookWhite(reynolds, diameter, roughness);

  velocity = Math.sqrt((2 * g * hf) / (1 + frictionFactor * length / diameter));

  const flowRate = velocity * area; // m³/s
  return flowRate * 1000; // convert to L/s
}

module.exports = {
  calculateHorizontalPipeCapacity,
  testHorizontalPipe: () => {
    const totalRequiredFlow = require('./OWS_size_calc').calculateRequiredOWSFlowRate();
    const flowPerBranch = totalRequiredFlow / input.pipeBranchCount;

    const branchCapacity = calculateHorizontalPipeCapacity(
      input.pipeDiameterM,
      input.horizontalLengthM,
      input.pipeSlopeMPerM,
      input.roughnessM,
      input.kinematicViscosityM2s,
      input. fillingDegreeHor
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
