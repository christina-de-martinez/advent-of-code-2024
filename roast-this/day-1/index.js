const path = "./day-1/input.txt";
const file = Bun.file(path);
const text = await file.text().then((res) => {
    getPart1(res);
    getPart2(res);
});

function splitInputIntoColumns(input) {
    const lines = input.split("\n");
    const firstColumn = [];
    const secondColumn = [];
    lines.map((line) => {
        const [addToFirstColumn, addToSecondColumn] = line.split("   ");
        firstColumn.push(parseInt(addToFirstColumn));
        secondColumn.push(parseInt(addToSecondColumn));
    });
    return [firstColumn, secondColumn];
}

function getPart1(input) {
    const [firstColumn, secondColumn] = splitInputIntoColumns(input);
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

function getPart2(input) {
    const [firstColumn, secondColumn] = splitInputIntoColumns(input);
    const secondColumnOccurrences = {};
    for (let i = 0; i < secondColumn.length; i++) {
        if (!secondColumnOccurrences[secondColumn[i]]) {
            secondColumnOccurrences[secondColumn[i]] = 0;
        }
        secondColumnOccurrences[secondColumn[i]] =
            secondColumnOccurrences[secondColumn[i]] + 1;
    }
    const similarityScore = firstColumn.reduce((acc, curr) => {
        const multiplier = secondColumnOccurrences[curr] || 0;
        return acc + curr * multiplier;
    }, 0);
    console.log("similarityScore", similarityScore);
}
