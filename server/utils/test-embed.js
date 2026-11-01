import { embed, cosineVec } from './embed.js';

const a = await embed('The car was driven fast.');
const b = await embed('The vehicle moved at high speed.');
const c = await embed('Cooking pasta requires boiling water.');

console.log('length of one embedding:', a.length);
console.log('car vs vehicle:', cosineVec(a, b));
console.log('car vs pasta:', cosineVec(a, c));