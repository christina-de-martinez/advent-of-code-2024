const path = "./day-2/input.txt";
const file = Bun.file(path);
const text = await file.text();
getPart1(text);

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
                    return 0;
                }
            } else {
                direction = isIncreasing ? "increasing" : "decreasing";
            }
            const isGradual = getIsGradual(currentNumber, nextNumber);
            if (!isGradual) {
                return 0;
            }
        }
        return prev + 1;
    }, 0);

    return safeLevels;
}
