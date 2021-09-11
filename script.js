const mean_text = document.querySelector('#mean');
const score_text = document.querySelector('#score');
const sd_text = document.querySelector('#sd');
const z_score_text = document.querySelector('#z-score');


function getZScore() {

    let z_score = (Number(score_text.value) - Number(mean_text.value)) / Number(sd_text.value);
    z_score_text.innerHTML = z_score;
    
}