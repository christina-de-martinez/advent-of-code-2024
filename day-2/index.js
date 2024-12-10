const path = "./day-2/input.txt";
const file = Bun.file(path);
const text = await file.text();
getPart1(text);
// getPart2(text);

// const testInput = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`;

function getIsIncreasing(num1, num2) {
    return num2 - num1 > 0;
}

function getIsGradual(num1, num2) {
    const difference = Math.abs(num2 - num1);
    return difference >= 1 && difference <= 3;
}

function getPart1(input) {
    const levels = input.split("\n");
    const safeLevels = levels.reduce((prev, curr) => {
        const numbersAsStringsArray = curr.split(" ");
        let direction;
        for (let i = 1; i < numbersAsStringsArray.length; i++) {
            const [currentNumber, nextNumber] = [
                parseInt(numbersAsStringsArray[i]),
                parseInt(numbersAsStringsArray[i - 1]),
            ];
            const isIncreasing = getIsIncreasing(currentNumber, nextNumber);
            if (typeof direction === "string") {
                if (direction === "decreasing" && isIncreasing) {
                    // unsafe: both increasing and decreasing
                    return 0;
                }
            } else {
                direction = isIncreasing ? "increasing" : "decreasing";
            }
            const isGradual = getIsGradual(currentNumber, nextNumber);
            if (!isGradual) {
                // unsafe: rate of change out of bounds
                return 0;
            }
        }
        // safe
        return prev + 1;
    }, 0);

    console.log("safe levels:", safeLevels);
}

// getPart1(testInput);
