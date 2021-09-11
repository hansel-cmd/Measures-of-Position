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

    data.sort();
}

function getPercentile() {

    let number_of_values_below_x = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i] < raw_score)
            number_of_values_below_x++;
    }

    percentile = (number_of_values_below_x + 0.5) / data.length * 100;

    percentile_position.innerHTML = `P<sub>${percentile}</sub> = ${raw_score}`;




}

// 18 15 12 6 8 2 3 5 20 10