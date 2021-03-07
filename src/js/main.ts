const buttDown = document.getElementById('timer-manager-down');
const buttUp = document.getElementById('timer-manager-up');
const buttStart = document.getElementById('timer-start');
let timer = document.getElementById('time-current-val');
let timerVal = Number(timer.innerHTML);
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
  console.log('start');
})

