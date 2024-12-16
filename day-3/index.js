const path = "./day-3/input.txt";
const file = Bun.file(path);
const text = await file.text().then((res) => {
    getPart1(res);
    getPart2(res);
});

const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const input2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

function getPart1(input) {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm;
    const matches = [...input.matchAll(regex)];
    const product = matches.reduce((prev, curr) => {
        return prev + curr[1] * curr[2];
    }, 0);
    console.log("product", product);
}

function getPart2(input) {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)|(do|don't)\(\)/gm;
    const matches = [...input.matchAll(regex)];
    let enabled = true;
    const product = matches.reduce((prev, curr) => {
        if (curr[0].startsWith("don't")) {
            enabled = false;
            return prev;
        } else if (curr[0].startsWith("do")) {
            enabled = true;
            return prev;
        }
        if (enabled) {
            return prev + curr[1] * curr[2];
        }
        return prev;
    }, 0);
    console.log("result", product);
}
