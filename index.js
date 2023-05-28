// Function to get the maximum number of digits in the array
function getMaxDigits(arr) {
  let maxDigits = 0;
  for (let i = 0; i < arr.length; i++) {
    const numDigits = Math.floor(Math.log10(arr[i])) + 1;
    if (numDigits > maxDigits) {
      maxDigits = numDigits;
    }
  }
  return maxDigits;
}

// Radix sort function
function radixSort(arr) {
  const maxDigits = getMaxDigits(arr);

  for (let digit = 0; digit < maxDigits; digit++) {
    const buckets = Array.from({ length: 10 }, () => []);

    for (let i = 0; i < arr.length; i++) {
      const digitValue = Math.floor(arr[i] / Math.pow(10, digit)) % 10;
      buckets[digitValue].push(arr[i]);
    }

    arr = [].concat(...buckets);
  }

  return arr;
}

// Function to generate random data array with given size and maximum digits
function generateRandomData(size, maxDigits) {
  const arr = [];
  const maxNumber = Math.pow(10, maxDigits) - 1;
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (maxNumber + 1)));
  }
  return arr;
}

// Function to measure the execution time of radixSort in milliseconds
function measureRadixSortPerformance(arr) {
  const startTime = performance.now();
  radixSort(arr);
  const endTime = performance.now();
  return endTime - startTime;
}

// Run tests with different input sizes and maximum digits
const inputSizes = [30, 60, 120, 25000, 50000];
const maxDigitsArr = [2, 4, 8];
const testRuns = 10;

const testResults = [];
const averageTimes = [];

for (let i = 0; i < inputSizes.length; i++) {
  const inputSize = inputSizes[i];
  const results = [];
  let totalTime = 0;

  for (let j = 0; j < testRuns; j++) {
    const maxDigits =
      maxDigitsArr[Math.floor(j / (testRuns / maxDigitsArr.length))];
    const testData = generateRandomData(inputSize, maxDigits);
    const executionTime = measureRadixSortPerformance([...testData]);
    results.push(executionTime.toFixed(2));
    totalTime += executionTime;
  }

  testResults.push(results);
  averageTimes.push((totalTime / testRuns).toFixed(2));
}

// Print the test results
console.log("Table 2. Results of Average Case (Time in milliseconds)\n");
console.log(
  "Data Size  | Test 1 | Test 2 | Test 3 | Test 4 | Test 5 | Test 6 | Test 7 | Test 8 | Test 9 | Test 10 | Average"
);
console.log(
  "--------------------------------------------------------------------------------------"
);

for (let i = 0; i < inputSizes.length; i++) {
  const inputSize = inputSizes[i];
  let row = `${inputSize.toString().padEnd(11)}|`;

  for (let j = 0; j < testRuns; j++) {
    const executionTime = testResults[i][j];
    row += ` ${executionTime.toString().padEnd(7)}|`;
  }

  row += ` ${averageTimes[i].toString().padEnd(8)}|`;
  console.log(row);
}
