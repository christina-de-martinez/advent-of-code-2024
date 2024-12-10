const path = "./day-3/input.txt";
const file = Bun.file(path);
const text = await file.text().then((res) => {
    getPart1(res);
    // getPart2(res);
});

// const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

function getPart1(input) {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm;
    const matches = [...input.matchAll(regex)];
    const product = matches.reduce((prev, curr) => {
        return prev + curr[1] * curr[2];
    }, 0);
    console.log("product", product);
}

// getPart1(input);
