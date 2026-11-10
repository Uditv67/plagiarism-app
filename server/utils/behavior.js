export function scoreBehavior(text, events) {
  const total = text.length || 1;

  const pasted = events
    .filter((e) => e.type === 'paste')
    .reduce((sum, e) => sum + (e.length || 0), 0);
  const keys = events.filter((e) => e.type === 'key').length;
  const deletes = events.filter((e) => e.type === 'delete').length;
  const tabs = events.filter((e) => e.type === 'tab_switch').length;

  const seconds = events.length ? events[events.length - 1].t / 1000 : 1;

  const pasteRatio = Math.min(pasted / total, 1);
  const speed = keys / Math.max(seconds, 1); // key presses per second
  const deleteRatio = deletes / Math.max(keys + deletes, 1);

  const reasons = [];
  let score = 0;

  if (pasteRatio > 0.6) {
    score += 50;
    reasons.push('Most of the text was pasted');
  } else if (pasteRatio > 0.3) {
    score += 25;
    reasons.push('A large part of the text was pasted');
  }
  if (speed > 10) {
    score += 15;
    reasons.push('Unusually fast typing');
  }
  if (keys > 50 && deleteRatio < 0.02) {
    score += 15;
    reasons.push('Almost no corrections while typing');
  }
  if (tabs >= 3) {
    score += 20;
    reasons.push('Frequent tab switching');
  }

  return {
    score: Math.min(score, 100),
    pasteRatio: Number(pasteRatio.toFixed(2)),
    speed: Number(speed.toFixed(1)),
    deleteRatio: Number(deleteRatio.toFixed(2)),
    tabs,
    reasons,
  };
}