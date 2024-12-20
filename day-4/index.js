const path = "./day-4/input.txt";
const file = Bun.file(path);
const text = await file.text().then((res) => {
    getPart1(res);
    // getPart2(res);
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
    // check if the letter is an X
    // if so, start searching for the rest of the word
    // next neighbors can be above, below, diagonal, right, left
    const inputCopy = input;
    // split into rows
    const rows = inputCopy.split("\n");

    const matches = [];
    for (let y = 0; y < rows.length; y++) {
        console.log("row", rows[y]);
        const row = rows[y];
        for (let x = 0; x < row.length; x++) {
            if (row[x] === "X") {
                console.log("found an X", x, y);
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
    console.log("searching surrounding...");
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
            console.log("new matches", matches);
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
            console.log("new matches", matches);
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
            console.log("new matches", matches);
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
            console.log("new matches", matches);
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
            console.log("new matches", matches);
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
            console.log("new matches", matches);
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
            console.log("new matches", matches);
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
            console.log("new matches", matches);
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

    console.log("letter wasnt found");

    return nextLetter;
    // if we're searching east, we can stop looking for Xs by length - 1 - stringToFind.length (stop looking at .length - 5), etc.
}

// getPart1(input);
