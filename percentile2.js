const text_area_right = document.querySelector('#text-area-right');
const percentile_right = document.querySelector('#percentile_right');
const c_text = document.querySelector('#c_text');
const position = document.querySelector('#position');

let data_right; // array of data provided (right side)
let p; // position provided (right side)
let score_right; // the score in the percentile_right's place in data_right set

function calculateRight() {

    resetRight();

    parseDataRight();

    getRawScore();

}

function resetRight() {

    data_right = [];
    score_right = 0;
    p = 0;
}

function parseDataRight() {

    p = Number(percentile_right.value);
    let value = text_area_right.value.replaceAll(/\s/g, ' ').split(' ');
    
    data_right = value.reduce((retval, cur_data) => {
        
        if (retval === undefined)
            retval = []

        if (!isNaN(parseInt(cur_data, 10)))
            retval.push(parseInt(cur_data, 10));

        return retval;
    }, []);

    data_right.sort((a, b) => a - b);
}

function getRawScore() {

    let c = data_right.length * p / 100;

    // not a whole number
    if (c % 1 != 0) {
        // we deduct 1 because we start from index 0
        let pos = Math.ceil(c) - 1;
        
        c_text.innerHTML = `the value <strong>${data_right[pos]}</strong> is the ${p}th percentile. `;

    } else {

        let value = (data_right[c - 1] + data_right[c]) / 2;

        c_text.innerHTML = `the value <strong>${value}</strong> is the ${p}th percentile.`;
        
    }

    position.innerHTML = `<strong>${c}</strong>`;
    
}

// 2 3 5 6 8 10 12 15 18 20
