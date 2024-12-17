// const path = "./day-4/input.txt";
// const file = Bun.file(path);
// const text = await file.text().then((res) => {
//     getPart1(res);
//     getPart2(res);
// });

const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

function getPart1(input) {
    // check if the letter is an X
    // if so, start searching for the rest of the word
    // next neighbors can be above, below, diagonal, right, left
    const inputCopy = input;
    // split into rows
    const rows = inputCopy.split("\n");
    for (let y = 0; y < rows.length; y++) {
        console.log("row", rows[y]);
        const row = rows[y];
        for (let x = 0; x < row.length; x++) {
            if (row[x] === "X") {
                console.log("found an X", x, y);
                searchSurroundingLetters(rows, x, y);
            }
        }
    }
}

function searchSurroundingLetters(rows, x, y, nextLetterIndex = 1) {
    const stringToFind = "XMAS";
    console.log("searching surrounding...");
    // look N
    const north = rows[y - 1]?.[x];
    // look NE
    const northeast = rows[y - 1]?.[x + 1];
    // look E
    const east = rows[y]?.[x + 1];
    // look SE
    const southeast = rows[y + 1]?.[x + 1];
    // look S
    const south = rows[y + 1]?.[x];
    // look SW
    const southwest = rows[y + 1]?.[x - 1];
    // look W
    const west = rows[y]?.[x - 1];
    // look NW
    const northwest = rows[y - 1]?.[x - 1];

    console.log("east", rows, stringToFind[nextLetterIndex]);
    if (east === stringToFind[nextLetterIndex]) {
        console.log("found the next letter", y, x, rows[y]?.[x + 1]);
        // here we found the next letter to the east, so we need to keep going east until we reach the end of stringToFind or stop finding matches.
        // I think the recursive part should take a direction, input, and nextLetterIndex?
    }

    // we are looking for the next letter. If we don't find it in any of these, we can return?
    // we can find it more than once.
}

getPart1(input);
