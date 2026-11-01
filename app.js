
function calc() {
  const l = parseFloat(document.getElementById('roomLength').value) || 0;
  const w = parseFloat(document.getElementById('roomWidth').value) || 0;
  const h = parseFloat(document.getElementById('wallHeight').value) || 8;
  const doors = parseFloat(document.getElementById('numDoors').value) || 0;
  const windows = parseFloat(document.getElementById('numWindows').value) || 0;
  const coats = parseFloat(document.getElementById('coats').value) || 2;

  // Gross wall area: perimeter * height
  const perimeter = 2 * (l + w);
  const grossWall = perimeter * h;

  // Deduct openings: standard door is 21 sq ft (3x7), window is 15 sq ft (3x5)
  const deductions = (doors * 21) + (windows * 15);
  const netWall = Math.max(0, grossWall - deductions);

  // Total area to cover
  const totalArea = netWall * coats;

  // 1 gallon covers 350-400 sq ft (using 350 sq ft conservative coverage)
  const exactGallons = totalArea / 350;
  const roundedGallons = Math.ceil(exactGallons);

  // Ceiling
  const ceilingArea = l * w;
  const ceilingGallons = Math.ceil(ceilingArea / 350);

  document.getElementById('gallonsNeeded').innerText = roundedGallons + (roundedGallons === 1 ? ' Gallon' : ' Gallons');
  document.getElementById('netSqFt').innerText = Math.round(netWall).toLocaleString() + ' sq ft';
  document.getElementById('totalCoverage').innerText = Math.round(totalArea).toLocaleString() + ' sq ft';
  document.getElementById('ceilingGal').innerText = ceilingGallons + (ceilingGallons === 1 ? ' Gal' : ' Gals');

  document.getElementById('paintVerdict').innerHTML = 
    `Buy <strong>${roundedGallons} gallon${roundedGallons > 1 ? 's' : ''}</strong> of interior wall paint (at 350 sq ft/gal coverage). This gives you enough paint for <strong>${coats} full coat${coats > 1 ? 's' : ''}</strong> on all 4 walls, plus a comfortable leftover touch-up buffer for scuffs and nail holes.`;
}

['roomLength', 'roomWidth', 'wallHeight', 'numDoors', 'numWindows', 'coats'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    if (document.getElementById(id + 'Range')) {
      document.getElementById(id + 'Range').value = document.getElementById(id).value;
    }
    calc();
  });
});

['roomLengthRange', 'roomWidthRange'].forEach(id => {
  const target = id.replace('Range', '');
  document.getElementById(id).addEventListener('input', (e) => {
    document.getElementById(target).value = e.target.value;
    calc();
  });
});

calc();
