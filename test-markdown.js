const m = require('@happyhackingspace/markdown');
console.log(m);
console.log(typeof m);
if (m.default) console.log(typeof m.default);

async function test() {
    try {
        const fn = typeof m === 'function' ? m : m.default;
        const res = await fn('# Hello', 'test.md', '', true);
        console.log(res);
    } catch (e) {
        console.error(e);
    }
}
test();
