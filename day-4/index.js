const path = "./day-4/input.txt";
const file = Bun.file(path);
const text = await file.text().then((res) => {
    getPart1(res);
});

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
    const inputCopy = input;
    const rows = inputCopy.split("\n");

    const matches = [];
    for (let y = 0; y < rows.length; y++) {
        const row = rows[y];
        for (let x = 0; x < row.length; x++) {
            if (row[x] === "X") {
                searchSurroundingLetters(rows, x, y, 1, "all", matches);
            }
        }
    }
    console.log("number of matches:", matches.length);
}

function searchSurroundingLetters(
    rows,
    x,
    y,
    nextLetterIndex = 1,
    direction = "all",
    matches
) {
    const stringToFind = "XMAS";
    if (
        y > rows.length ||
        x > rows[y].length ||
        nextLetterIndex > stringToFind.length - 1
    ) {
        return;
    }
    let nextLetter;

    let north, east, south, west, northwest, northeast, southeast, southwest;
    if (direction === "all" || direction === "north") {
        north = rows[y - 1]?.[x];
    }
    if (direction === "all" || direction === "east") {
        east = rows[y]?.[x + 1];
    }
    if (direction === "all" || direction === "south") {
        south = rows[y + 1]?.[x];
    }
    if (direction === "all" || direction === "west") {
        west = rows[y]?.[x - 1];
    }
    if (direction === "all" || direction === "northwest") {
        northwest = rows[y - 1]?.[x - 1];
    }
    if (direction === "all" || direction === "northeast") {
        northeast = rows[y - 1]?.[x + 1];
    }
    if (direction === "all" || direction === "southwest") {
        southwest = rows[y + 1]?.[x - 1];
    }
    if (direction === "all" || direction === "southeast") {
        southeast = rows[y + 1]?.[x + 1];
    }

    if (north === stringToFind[nextLetterIndex]) {
        if (nextLetterIndex === stringToFind.length - 1) {
            matches.push([y - 1, x, "north"]);
            return;
        }
        nextLetter = searchSurroundingLetters(
            rows,
            x,
            y - 1,
            nextLetterIndex + 1,
            "north",
            matches
        );
    }

    if (east === stringToFind[nextLetterIndex]) {
        if (nextLetterIndex === stringToFind.length - 1) {
            matches.push([y, x + 1, "east"]);
            return;
        }
        nextLetter = searchSurroundingLetters(
            rows,
            x + 1,
            y,
            nextLetterIndex + 1,
            "east",
            matches
        );
    }

    if (west === stringToFind[nextLetterIndex]) {
        if (nextLetterIndex === stringToFind.length - 1) {
            matches.push([y, x - 1, "west"]);
            return;
        }
        nextLetter = searchSurroundingLetters(
            rows,
            x - 1,
            y,
            nextLetterIndex + 1,
            "west",
            matches
        );
    }

    if (south === stringToFind[nextLetterIndex]) {
        if (nextLetterIndex === stringToFind.length - 1) {
            matches.push([y + 1, x, "south"]);
            return;
        }
        nextLetter = searchSurroundingLetters(
            rows,
            x,
            y + 1,
            nextLetterIndex + 1,
            "south",
            matches
        );
    }

    if (northwest === stringToFind[nextLetterIndex]) {
        if (nextLetterIndex === stringToFind.length - 1) {
            matches.push([y - 1, x - 1, "northwest"]);
            return;
        }
        nextLetter = searchSurroundingLetters(
            rows,
            x - 1,
            y - 1,
            nextLetterIndex + 1,
            "northwest",
            matches
        );
    }

    if (northeast === stringToFind[nextLetterIndex]) {
        if (nextLetterIndex === stringToFind.length - 1) {
            matches.push([y - 1, x + 1, "northeast"]);
            return;
        }
        nextLetter = searchSurroundingLetters(
            rows,
            x + 1,
            y - 1,
            nextLetterIndex + 1,
            "northeast",
            matches
        );
    }

    if (southwest === stringToFind[nextLetterIndex]) {
        if (nextLetterIndex === stringToFind.length - 1) {
            matches.push([y + 1, x - 1, "southwest"]);
            return;
        }
        nextLetter = searchSurroundingLetters(
            rows,
            x - 1,
            y + 1,
            nextLetterIndex + 1,
            "southwest",
            matches
        );
    }

    if (southeast === stringToFind[nextLetterIndex]) {
        if (nextLetterIndex === stringToFind.length - 1) {
            matches.push([y + 1, x + 1, "southeast"]);
            return;
        }
        nextLetter = searchSurroundingLetters(
            rows,
            x + 1,
            y + 1,
            nextLetterIndex + 1,
            "southeast",
            matches
        );
    }

    return nextLetter;
}
