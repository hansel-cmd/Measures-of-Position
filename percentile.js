const text_area = document.querySelector('#text-area');
const score = document.querySelector('#score');
const percentile_position = document.querySelector('#percentile_position');

let data; // an array of the given data
let raw_score; // the raw_score provided
let percentile; // the percentile rank of the raw_score in data


function calculate() {

    // reset
    reset();

    parseData();

    getPercentile();
}

function calculateRight() {

}

function reset() {

    data = [];
    percentile = 0;
    raw_score = 0;
}
 
function parseData() {

    raw_score = Number(score.value);
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

function getPercentile() {

    let number_of_values_below_x = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i] < raw_score)
            number_of_values_below_x++;
    }


    let freq = data.reduce((retval, cur_data) => {
        if (cur_data == raw_score)
            return retval + 1;
        else
            return retval;
    }, 0);

    percentile = (number_of_values_below_x + 0.5 * freq) / data.length * 100;

    percentile_position.innerHTML = `<strong>${percentile}th</strong> percentile. P<sub>${percentile}</sub> = ${raw_score}`;

}

// 18 15 12 6 8 2 3 5 20 10 even
// 2 3 5 7 8 10 11 13 15 16 19 odd
// 5 6 8 9 11 12 14 15 16 16 17 19 20 22 23 25 even

