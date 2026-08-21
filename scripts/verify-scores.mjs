function toAxisScore(total, count) {
  if (count === 0) return 50;
  return Math.round((total / count / 5) * 100);
}

function calc(answerScores) {
  const axes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
  ];
  const keys = ['energy', 'presence', 'movement', 'direction'];
  const result = {};
  axes.forEach((idxs, i) => {
    const sum = idxs.reduce((acc, idx) => acc + answerScores[idx], 0);
    result[keys[i]] = toAxisScore(sum, idxs.length);
  });
  return result;
}

const allFives = calc(Array(12).fill(5));
const allOnes = calc(Array(12).fill(1));
const oldAllFives = {
  energy: Math.round(15 / 3),
  presence: Math.round(15 / 3),
  movement: Math.round(15 / 3),
  direction: Math.round(15 / 3),
};

console.log('fixed all 5s:', allFives);
console.log('fixed all 1s:', allOnes);
console.log('OLD buggy all 5s:', oldAllFives);
