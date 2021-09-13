const text_area = document.querySelector('#text-area');
const q1_text = document.querySelector('#q1');
const q2_text = document.querySelector('#q2');
const q3_text = document.querySelector('#q3');

let data; // an array of the data set (sorted)
let q1;
let q2;
let q3;

function calculate() {
    
    reset();
    
    parseData();    

    getQuartilePositions();

    q1_text.innerHTML = getValue(q1);
    q2_text.innerHTML = getValue(q2);
    q3_text.innerHTML = getValue(q3);
}

function reset() {
    data = [];
    q1 = q2 = q3 = 0;
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