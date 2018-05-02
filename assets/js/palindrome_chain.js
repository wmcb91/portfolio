const $ = (query) => {
  if (query[0] === '#') {
    return document.querySelector(query);
  }
  return document.querySelectorAll(query);
};

const app = {
  preLoopLines: 2,
  loopLines: 5,
  testNum: 100,
  lineDelay: 60,
  fullSpeed: false,
};

const reverse = (n) => {
  let r = [];
  n = n.toString().split('');
  
  for (let i = n.length; i > 0; i--) {
    r.push(n.pop());
  }
  
  return Number(r.join(''));
};

const palindromeChainLength = (n) => {
  let sum = 0;
  while (true) {
    if (n === reverse(n)) {
      return sum;
    }
    n = n + reverse(n);
    sum++;
  }  
};

console.log(palindromeChainLength(100));

// consoleOut = `<p><a class="num">${output}</a></p>`;
// setTimeout(function() {      
//   $('#output-val').innerHTML = outputOut;
// }, lines * lineDelay * i - lineDelay);

// setTimeout(function() {      
//   $('#output').innerHTML += consoleOut;
// }, lines * lineDelay * i);

const animateLoop = (max, lines, lineDelay) => {
  for (let i = 0; i < max * lines; i++) {
    setTimeout(function() {
      $('.loop-line').forEach(function(el) {
        el.classList.remove('active-line');
      });
      
      $('.loop-line')[i % lines].classList.add('active-line');
      $('.loop-line .comment')[i % lines].innerHtml = i;
    }, i * lineDelay);
  }

  setTimeout(function() {
    $('.loop-line').forEach(function(el) {
      el.classList.remove('active-line');
    });
  }, max * lines * lineDelay);
}

const animatePreLoop = (lines, lineDelay) => {
  // skip first p
  for (let i = 0; i < lines; i++) {
    setTimeout(function() {
      $('p').forEach(function(el) {
        el.classList.remove('active-line');
      });

      $('p')[i + 1].classList.add('active-line');
    }, i * lineDelay);
  }

  setTimeout(function() {
    $('p').forEach(function(el) {
      el.classList.remove('active-line');
    });
  }, lines * lineDelay);
}

const stopAllTimeouts = () => {
  let id = window.setTimeout(null, 0);
  while (id--) {
    window.clearTimeout(id);
  }
};

const runCodeAnimation = () => {
  stopAllTimeouts();  
  $('#r-val').innerHTML = '\\\\ r = []';
  $('#rev-n-val').innerHTML = '\\\\ n = undefined';
  $('#rev-return-val').innerHTML = '\\\\ return undefined';
  $('#output').innerHTML = '';
  $('#test-num').innerHTML = app.testNum;

  animatePreLoop(app.preLoopLines, app.lineDelay);

  setTimeout(function() {
    // setTimeout(function() {
    //   animateLoop(app.max, app.loopLines, app.lineDelay);
    // }, app.lineDelay);
    // palindromeChainLength(app.loopLines, app.lineDelay);
  }, (app.preLoopLines - 1) * app.lineDelay);
};

const toggleFullSpeed = () => {
  app.fullSpeed = !app.fullSpeed;
  if (app.fullSpeed) {
    app.lineDelay = 1;
    $('#speed-label').innerHTML = '<small>&#9889;</small>Speed<small>&#9889;</small>';
  } else {
    app.lineDelay = 1500 / $('#speed').value;
    $('#speed-label').innerHTML = 'Speed';
  }
};

$('#test-num').addEventListener('change', function() {
  let newTestNum = this.value;
  if (newTestNum < 0) {
    newTestNum = 0;
  } else if (newTestNum > 1000) {
    newTestNum = 1000;
  } else if (isNaN(newTestNum)) {
    newTestNum = 100;
  }
  this.value = newTestNum;
  app.testNum = newTestNum;
});

$('#speed').addEventListener('change', function() {
  let newSpeed = this.value;
  if (newSpeed <= 0) {
    newSpeed = 1;
  } else if (newSpeed > 100) {
    newSpeed = 100;
  } else if (isNaN(newSpeed)) {
    newSpeed = 50;
  }

  app.lineDelay = 1500 / newSpeed;
});

$('#speed-label').addEventListener('click', toggleFullSpeed);
$('#run').addEventListener('click', runCodeAnimation);
$('#stop').addEventListener('click', stopAllTimeouts);
