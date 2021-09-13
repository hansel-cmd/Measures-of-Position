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

let data; // an array of the data set (sorted)
let q1;
let q2;
let q3;

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