const text_area = document.querySelector('#text-area');
const q1_text = document.querySelector('#q1');
const q2_text = document.querySelector('#q2');
const q3_text = document.querySelector('#q3');

const d1_text = document.querySelector('#d1');
const d2_text = document.querySelector('#d2');
const d3_text = document.querySelector('#d3');
const d4_text = document.querySelector('#d4');
const d5_text = document.querySelector('#d5');
const d6_text = document.querySelector('#d6');
const d7_text = document.querySelector('#d7');
const d8_text = document.querySelector('#d8');
const d9_text = document.querySelector('#d9');

const iqr_text = document.querySelector('#iqr_text');
const l_outlier_text = document.querySelector('#lower_outlier_text');
const h_outlier_text = document.querySelector('#higher_outlier_text');

const how_many_lower_outliers = document.querySelector('#how_many_lower_outlier');
const how_many_higher_outliers = document.querySelector('#how_many_higher_outlier');

let data; // an array of the data set (sorted)
let q1; // position of Q1
let q2; // position of Q2
let q3; // position of Q3

let iqr;
let lower_outlier;
let higher_outlier;

// position of Qk, where k = 1 -> 9
let d1;
let d2;
let d3;
let d4;
let d5;
let d6;
let d7;
let d8;
let d9;


function calculate() {
    
    reset();
    
    parseData();    

    getQuartilePositions();

    getInterQuartileRange();

    getDecilePositions();

    q1_text.innerHTML = getValue(q1);
    q2_text.innerHTML = getValue(q2);
    q3_text.innerHTML = getValue(q3);

    d1_text.innerHTML = getValue(d1);
    d2_text.innerHTML = getValue(d2);
    d3_text.innerHTML = getValue(d3);
    d4_text.innerHTML = getValue(d4);
    d5_text.innerHTML = getValue(d5);
    d6_text.innerHTML = getValue(d6);
    d7_text.innerHTML = getValue(d7);
    d8_text.innerHTML = getValue(d8);
    d9_text.innerHTML = getValue(d9);
}

function reset() {
    data = [];
    q1 = 0;
    q2 = 0;
    q3 = 0;
    d1 = 0;
    d2 = 0;
    d3 = 0;
    d4 = 0;
    d5 = 0;
    d7 = 0;
    d8 = 0;
    d9 = 0;
    iqr = 0;
    lower_outlier = 0;
    higher_outlier = 0;
}

function parseData() {

    let value = text_area.value.replaceAll(/\s/g, ' ').split(' ');
    
    data = value.reduce((retval, cur_data) => {
        
        if (retval === undefined)
            retval = []

        if (!isNaN(parseInt(cur_data)))
            retval.push(parseInt(cur_data));

        return retval;
    }, []);

    data.sort((a, b) => a - b);
}

function getQuartilePositions() {
    
    q1 = (data.length + 1) / 4;
    q2 = (data.length + 1) / 2;
    q3 = 3 * (data.length + 1) / 4;

    console.log(`
        Q1: ${q1}
        Q2: ${q2}
        Q3: ${q3}
    `);

}

function getInterQuartileRange() {
    
    let q1_value = data[q1 - 1];
    if (isDecimal(q1)) {
        let lower = Math.floor(q1) - 1;
        let higher = Math.ceil(q1) - 1;

        q1_value = (data[lower] + data[higher]) / 2;
    }

    let q3_value = data[q3 - 1];
    if (isDecimal(q3)) {
        let lower = Math.floor(q3) - 1;
        let higher = Math.ceil(q3) - 1;

        q3_value = (data[lower] + data[higher]) / 2;
    }

    iqr = q3_value - q1_value;
    iqr_text.innerHTML = `IQR is <span class="fw-bold">${iqr}</span>`;

    checkOutliers(q3_value, q1_value);

}

function checkOutliers(high, low) {
    lower_outlier = low - 1.5 * iqr;
    higher_outlier = high + 1.5 * iqr;

    console.log(`
        lower outlier: ${lower_outlier}
        higher outlier: ${higher_outlier}
    `);

    l_outlier_text.innerHTML = lower_outlier;
    h_outlier_text.innerHTML = higher_outlier;

    let lower_count = 0;
    let higher_count = 0;
    for (i = 0; i < data.length; i++) {
        if (data[i] < lower_outlier)
            lower_count++;
        
        if (data[i] > higher_outlier)
            higher_count++;
    }

    how_many_higher_outliers.innerHTML = `there are ${higher_count}`;
    how_many_lower_outliers.innerHTML = `there are ${lower_count}`;
}

function getDecilePositions() {
    
    function get(k) {
        console.log(`D${k}: ${k * (data.length + 1) / 10}`);
        return k * (data.length + 1) / 10;
    }

    d1 = get(1);
    d2 = get(2);
    d3 = get(3);
    d4 = get(4);
    d5 = get(5);
    d6 = get(6);
    d7 = get(7);
    d8 = get(8);
    d9 = get(9);
}

function isDecimal(x) {
    return x % 1 != 0;
}

function getValue(x) {
    let value = data[x - 1];

    // get the average of the ceil and floor of the decimal
    if (isDecimal(x)) {
        let lower = Math.floor(x) - 1;
        let higher = Math.ceil(x) - 1;

        value = (data[lower] + data[higher]) / 2;
    }

    return `Position = ${x} and the data is <span class="fw-bold">${value}</span>`;
}