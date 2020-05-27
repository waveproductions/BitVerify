// Not touching this because I dont know if tape works with mjs -CF

import Hastebin from '../src/index';
const h = new Hastebin({ url: 'https://hasteb.in' });

const args = process.argv;

if (args[2] === 'post') {
  const code = args.slice(4);
  const ext = args[3];
  const link = h.post(code.join(' '), ext).then(link => console.log(link));
}

if (args[2] === 'get') {
  const key = args[3];
  const link = h.get(key).then(link => console.log(link));
}