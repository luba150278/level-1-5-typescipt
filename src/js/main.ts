import * as moment from "moment";
//import * as moment-timer from "moment-timer/lib/";

const buttDown = document.getElementById('timer-manager-down');
const buttUp = document.getElementById('timer-manager-up');
const buttStart = document.getElementById('timer-start');
const timerInstr = document.getElementById('timer-instruction');
let timer = document.getElementById('time-current-val');
let timerVal : number = Number(timer.innerHTML);

buttDown.addEventListener('click', () => {
  if (timerVal != 0) {
    timerVal--;
    timer.innerHTML = String(timerVal);
  }
})

buttUp.addEventListener('click', () => {
  timerVal++;
  timer.innerHTML = String(timerVal);
})

buttStart.addEventListener('click', () => {
  if (timerVal != 0) {    
    buttStart.classList.add('hidden');
    timerInstr.innerHTML = 'Осталось';
    startTimer(timerVal*60);
  }
})

function startTimer(time: number) {
  timer.innerHTML = moment.unix(time).format('mm:ss');
  if (time === 0) {
    buttStart.classList.remove('hidden');
    timerInstr.innerHTML = 'Укажите время в минутах';
    timer.innerHTML ='0';
    return;
  }
  setTimeout(() => startTimer(time - 1), 1000);
}