// main.js
// Entry point: calculates required flow and verifies if pipe system can support it

const Table = require('cli-table3');
const { calculateRequiredOWSFlowRate } = require('./OWS_size_calc');
const { testHorizontalPipe } = require('./horizontal_pipe_check');
const { testVerticalPipe } = require('./vertical_pipe_check');
const input = require('./inputData');

function printSummaryTable() {
  const requiredFlow = calculateRequiredOWSFlowRate();

  const table = new Table({
    head: ['Parameter', 'Value', 'Units'],
    colWidths: [30, 20, 15]
  });

  table.push(
    ['Catchment area', input.catchmentAreaM2, 'm²'],
    ['Rain intensity', input.rainfallIntensityLpsm2 * 3600, 'mm/h'],
    ['Rain duration', input.rainDurationMinutes, 'h'],
    ['Tray volume', input.podVolumeM3 * 1000, 'l'],
    ['Runoff coefficient', input.runoffCoefficient, '—'],
    ['Total rain volume', (requiredFlow * 3600).toFixed(2), 'l'],
    ['Required OWS capacity', requiredFlow.toFixed(3), 'l/s']
  );

  console.log('=== OWS CAPACITY CALCULATION ===');
  console.log(table.toString());
  console.log(`\n✅ OWS shall be sized to maintain as minimum such flow rate: ${requiredFlow.toFixed(3)} L/s\n`);
}

function printPipeCheckResults() {
  const vertical = testVerticalPipe();
  const horizontal = testHorizontalPipe();

  const table = new Table({
    head: ['Section', 'Per Branch', 'Total Capacity', 'Sufficient?'],
    colWidths: [15, 15, 20, 15]
  });

  table.push(
    ['Vertical', vertical.branchCapacity, vertical.totalCapacity, vertical.isSufficient ? '✅ Yes' : '❌ No'],
    ['Horizontal', horizontal.branchCapacity, horizontal.totalCapacity, horizontal.isSufficient ? '✅ Yes' : '❌ No']
  );

  console.log('=== PIPE SYSTEM VERIFICATION ===');
  console.log(table.toString());

  if (vertical.isSufficient && horizontal.isSufficient) {
    console.log('\n✅ The drainage system is hydraulically sufficient to handle peak flow.\n');
  } else {
    console.log('\n❌ The pipe system cannot maintain required flow — check vertical or horizontal sizing.\n');
  }
}

function main() {
  printSummaryTable();
  printPipeCheckResults();
}

main();
