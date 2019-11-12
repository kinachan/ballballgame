const pitchings = [{
  name: 'strike',
  index: 1,
  text: 'ストライク',
}, {
  name: 'ball',
  index: 2,
  text: 'ボール',
}];

const pitchingFinal = {
  out: 'アウト',
  fourBall: 'ファーボール',
};

function random(n) {
  return Math.floor(Math.random() * n) + 1;
};

/**
 * ストライク・ボールのどちらかを返却します。
 */
function throwBall() {
  const randomResult = random(2);
  return pitchings.find(pitch => pitch.index === randomResult);
}

function checkCurrentPitching(results, throwResult) {
  return results.filter(x => x === throwResult.text).length;
}

function isOut(results, throwResult) {
  const currentCount = checkCurrentPitching(results, throwResult);
  return throwResult.name === 'strike' && currentCount === 2;
}

function isFourBall(results, throwResult) {
  const currentCount = checkCurrentPitching(results, throwResult);
  return throwResult.name === 'ball' && currentCount === 3;
}

function pitching(count) {
  const results = [];
  for (let i = 0; i < count; i++) {
    const throwResult = throwBall();

    if (isOut(results, throwResult)) {
      results.push(pitchingFinal.out)
      return results;
    }

    if (isFourBall(results, throwResult)) {
      results.push(pitchingFinal.fourBall)
      return results;
    }
    results.push(throwResult.text);
  }
  return results;
}

function createResultHtml(results) {
  return results.map(pitching => `
  <div class="box">
    ${pitching}
  </div>
  `).join('');
}

function createPitchingPlanHtml(pitchingPlan, length) {
  const text = `${pitchingPlan}球の予定で、${length}球投げました。配球は以下の通り。`;
  return `<div class="box hero is-primary">${text}</div>`;
}

function renderHtml(html) {
  const resultElem = document.getElementById('result');
  resultElem.innerHTML = html; 
}

const button = document.getElementById('done');
button.addEventListener('click', ev => {
  const count = random(6);
  const results = pitching(count);
  const planHtml = createPitchingPlanHtml(count, results.length);
  const resultHtml = createResultHtml(results);
  renderHtml(planHtml + resultHtml);
});

