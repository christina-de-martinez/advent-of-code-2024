const path = "./day-1/input.txt";
const file = Bun.file(path);
const text = await file.text().then((res) => {
    getSolution(res);
});

// const input = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3`;

function getSolution(input) {
    const lines = input.split("\n");
    const firstColumn = [];
    const secondColumn = [];
    lines.map((line) => {
        const [addToFirstColumn, addToSecondColumn] = line.split("   ");
        firstColumn.push(parseInt(addToFirstColumn));
        secondColumn.push(parseInt(addToSecondColumn));
    });
    firstColumn.sort((a, b) => a - b);
    secondColumn.sort((a, b) => a - b);
    if (firstColumn.length !== secondColumn.length) {
        throw new Error("Columns are not the same length");
    }
    const sumOfDifferences = firstColumn.reduce((acc, curr, index) => {
        const difference = Math.abs(curr - secondColumn[index]);
        return acc + difference;
    }, 0);
    console.log("sumOfDifferences", sumOfDifferences);
}

// getSolution(input);
