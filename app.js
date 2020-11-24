const express = require('express');
const { type } = require('os');

const app = express();

app.get('/mean', (request, response) => {
    const queryNums = request.query.nums;
    if (!queryNums) {
        return response.status(400).json('nums are required');
    }
    const nums = parseRequest(queryNums);
    if (typeof nums === 'string') {
        return response.status(400).json(nums);
    } else {
        const mean = arrayMean(nums);
        return response.json({
            operation: 'mean',
            value: mean
        });
    }
});

app.get('/median', (request, response) => {
    const queryNums = request.query.nums;
    if (!queryNums) {
        return response.status(400).json('nums are required');
    }
    const nums = parseRequest(queryNums);
    if (typeof nums === 'string') {
        return response.status(400).json(nums);
    } else {
        const median = arrayMedian(nums);
        console.log(median);
        return response.json({
            operation: 'median',
            value: median
        });
    }
});

app.get('/mode', (request, response) => {
    const queryNums = request.query.nums;
    if (!queryNums) {
        return response.status(400).json('nums are required');
    }
    const nums = parseRequest(queryNums);
    if (typeof nums === 'string') {
        return response.status(400).json(nums);
    } else {
        const mode = arrayMode(nums);
        return response.json({
            operation: 'mode',
            value: mode
        });
    }
});

app.get('/all', (request, response) => {
    const queryNums = request.query.nums;
    if (!queryNums) {
        return response.status(400).json('nums are required');
    }
    const nums = parseRequest(queryNums);
    if (typeof nums === 'string') {
        return response.status(400).json(nums);
    } else {
        const mean = arrayMean(nums);
        const median = arrayMedian(nums);
        const mode = arrayMode(nums);
        return response.json({
            operation: 'all',
            mean: mean,
            median: median,
            mode: mode
        });
    }
})

app.listen('3000', function () {
    console.log('App running on port 3000');
});

function parseRequest(queryString) {
    const numStrings = queryString.split(',');
    const nums = [];
    for (let numString of numStrings) {
        const nextNum = parseFloat(numString);
        if (isNaN(nextNum)) {
            return `${numString} is not a number.`;
        } else {
            nums.push(nextNum);
        }
    }
    return nums;
}

function arrayMean(nums) {
    return nums.reduce((val, acc) => { return val + acc; }) / nums.length;
}

function arrayMedian(nums) {
    const orderedNums = nums.sort((a, b) => { return a - b; });
    const middleIndex = orderedNums.length / 2 - 1;
    if (Math.floor(middleIndex) == middleIndex) {
        return arrayMean(orderedNums.slice(middleIndex, middleIndex + 2));
    } else {
        return orderedNums[Math.floor(middleIndex) + 1];
    }
}

function arrayMode(nums) {
    const freqObj = {};
    for (let value of nums) {
        if (freqObj[value]) {
            freqObj[value] += 1;
        } else {
            freqObj[value] = 1;
        }
    }
    let maxFreq = 0;
    let modes = [];
    for (let key in freqObj) {
        if (freqObj[key] === maxFreq) {
            modes.push(parseFloat(key));
        } else if (freqObj[key] > maxFreq) {
            modes = [parseFloat(key)];
            maxFreq = freqObj[key];
        }
    }
    if (modes.length === 1) {
        return modes[0];
    } else {
        return modes;
    }
}

module.exports = {
    arrayMean: arrayMean,
    arrayMedian: arrayMedian,
    arrayMode: arrayMode
};