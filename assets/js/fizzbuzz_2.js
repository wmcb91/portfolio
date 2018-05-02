const $ = (query) => {
  if (query[0] === '#') {
    return document.querySelector(query);
  }
  return document.querySelectorAll(query);
};

const app = {
  preLoopLines: 1,
  loopLines: 2,
  max: 100,
  lineDelay: 60,
  fullSpeed: false,
};

const ternaryFizzBuzz = (max, lines, lineDelay) => {
  for (let i = 0; i < max;) {
    let output = (++i % 3 ? '' : 'Fizz') + (i % 5 ? '' : 'Buzz') || i;
    let outputOut = `\\\\ output = ${output}`;
    let consoleOut;
    if (typeof output === 'string') {
      consoleOut = `<p><a class="str">${output}</a></p>`;
    } else {
      consoleOut = `<p><a class="num">${output}</a></p>`;
    }

    setTimeout(function() {      
      $('#output-val').innerHTML = outputOut;
    }, lines * lineDelay * i - lineDelay);

    setTimeout(function() {      
      $('#output').innerHTML += consoleOut;
    }, lines * lineDelay * i);
  };
};

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
  $('#output-val').innerHTML = '\\\\ output = undefined';
  $('#output').innerHTML = '';
  $('#max-val').innerHTML = app.max;

  animatePreLoop(app.preLoopLines, app.lineDelay);

  setTimeout(function() {
    setTimeout(function() {
      animateLoop(app.max, app.loopLines, app.lineDelay);
    }, app.lineDelay);
    ternaryFizzBuzz(app.max, app.loopLines, app.lineDelay);
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

$('#max').addEventListener('change', function() {
  let newMax = this.value;
  if (newMax < 0) {
    newMax = 0;
  } else if (newMax > 1000) {
    newMax = 1000;
  } else if (isNaN(newMax)) {
    newMax = 100;
  }
  this.value = newMax;
  app.max = newMax;
});

$('#speed').addEventListener('change', function() {
  if (app.fullSpeed) return;
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

