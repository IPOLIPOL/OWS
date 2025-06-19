// utils.js

/**
 * Calculate Reynolds number
 * @param {number} velocity - fluid velocity (m/s)
 * @param {number} diameter - pipe diameter (m)
 * @param {number} viscosity - kinematic viscosity (m²/s)
 * @returns {number}
 */
function calculateReynoldsNumber(velocity, diameter, viscosity) {
  return (velocity * diameter) / viscosity;
}

/**
 * Solve Colebrook-White equation for friction factor (using approximation)
 * @param {number} reynolds - Reynolds number
 * @param {number} diameter - pipe diameter (m)
 * @param {number} roughness - pipe absolute roughness (m)
 * @returns {number} friction factor (dimensionless)
 */
function solveColebrookWhite(reynolds, diameter, roughness) {
  if (reynolds < 2000) {
    // Laminar flow friction factor
    return 64 / reynolds;
  }

  // Use approximate explicit formula (e.g., Swamee-Jain equation)
  const relativeRoughness = roughness / diameter;
  const friction = 0.25 / Math.pow(
    Math.log10(relativeRoughness / 3.7 + 5.74 / Math.pow(reynolds, 0.9)), 2
  );
  return friction;
}

module.exports = {
  calculateReynoldsNumber,
  solveColebrookWhite
};
