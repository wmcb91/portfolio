// Add jQuery-like search traversal
const $ = (query) => {
  if (query[0] === '#' && query.split(' ').length === 1) {
    return document.querySelector(query);
  }
  return document.querySelectorAll(query);
};

Node.prototype.find = function(query) {
  return $(`#${this.id} ${query}`);
}

const app = {
  preLoopLines: 2,
  loopLines: 5,
  testNum: 100,
  lineDelay: 60,
  fullSpeed: false,
  animation: {
    loopCount: 0,
  },
};

const animateLoop = (loopParent, initDelay, lines, lineDelay) => {
  for (let i = 0; i < lines; i++) {
    setTimeout(function() {
      loopParent.find('.loop-line').forEach(function(el) {
        el.classList.remove('active-line');
      });
      
      loopParent.find('.loop-line')[i % lines].classList.add('active-line');
      loopParent.find('.loop-line .comment')[i % lines].innerHtml = i;
    }, i * lineDelay + initDelay);
  }

  setTimeout(function() {
    $('.loop-line').forEach(function(el) {
      el.classList.remove('active-line');
    });
  }, lines * lineDelay);
}

const reverse = (n) => {
  let rev = n.toString().split('').reverse().join('');
  if (rev.length > 17) {
    $('#rev-return-val').innerHTML = '// Integer overflow';
    // Number too large to accurately add and will cause issues
    return 'Integer overflow';
  }
  $('#rev-return-val').innerHTML = `// ${rev}`;
  return Number(rev);
};

const palindromeChainLength = (n) => {
  let sum = 0;
  while (true) {
    let rev = reverse(n);
    // animateLoop($('#reverse'), app.lineDelay * sum, 1, app.lineDelay);
    $('#rev-val').innerHTML = `// rev = ${rev}`;
    if (typeof rev !== 'number') {
      stopAllTimeouts();    
      return 'Integer overflow';
    } else if (n === rev) {
      $('#output').innerHTML += `<a class="num">${n}</a><br>`;
      $('#eq-val').innerHTML = `// true`;
      return sum;
    }
    $('#eq-val').innerHTML = `// false`;
    n = n + rev;
    $('#n-val').innerHTML = `// n = ${n}`;
    sum++;
    $('#sum-val').innerHTML = `// sum = ${sum}`;
  }  
};

const animatePreLoop = (lines, lineDelay) => {
  // skip first p
  for (let i = 0; i < lines; i++) {
    setTimeout(function() {
      $('#pal-chain p').forEach(function(el) {
        el.classList.remove('active-line');
      });

      $('#pal-chain p')[i + 1].classList.add('active-line');
    }, i * lineDelay);
  }

  setTimeout(function() {
    $('p').forEach(function(el) {
      el.classList.remove('active-line');
    });
  }, lines * lineDelay);
}

const runCodeAnimation = () => {
  app.animation.loopCount = 0;
  stopAllTimeouts();
  $('#rev-return-val').innerHTML = '// return undefined';
  $('#rev-val').innerHTML = '// rev = undefined';
  $('#sum-val').innerHTML = '// sum = 0';  
  $('#output').innerHTML = '';
  $('#eq-val').innerHTML = '';
  $('#test-num').innerHTML = app.testNum;
  $('#test-val').innerHTML = app.testNum;
  
  animatePreLoop(app.preLoopLines, app.lineDelay);

  let sum = palindromeChainLength(app.testNum);
  $('#output').innerHTML += `<a class="num">${sum}</a>`;

  // setTimeout(function() {
  //   // setTimeout(function() {
  //   //   animateLoop(app.max, app.loopLines, app.lineDelay);
  //   // }, app.lineDelay);
  // }, (app.preLoopLines - 1) * app.lineDelay);
};

const stopAllTimeouts = () => {
  let id = window.setTimeout(null, 0);
  while (id--) {
    window.clearTimeout(id);
  }
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
  if (isNaN(newTestNum)) {
    newTestNum = 100;
  } else {
    newTestNum = Number(newTestNum);
  }

  if (newTestNum < 0) {
    newTestNum = 0;
  } else if (newTestNum > 1000) {
    newTestNum = 1000;
  }
  this.value = newTestNum;
  app.testNum = newTestNum;
});

$('#speed').addEventListener('change', function() {
  let newSpeed = this.value;
  if (isNaN(newSpeed)) {
    newSpeed = 50;
  } else {
    newSpeed = Number(newSpeed);
  }

  if (newSpeed <= 0) {
    newSpeed = 1;
  } else if (newSpeed > 100) {
    newSpeed = 100;
  } else if (isNaN(newSpeed)) {
    newSpeed = 50;
  } else if (newSpeed === 100) {
    newSpeed = 300;
  }

  app.lineDelay = 1500 / newSpeed;
});

$('#speed-label').addEventListener('click', toggleFullSpeed);
$('#run').addEventListener('click', runCodeAnimation);
$('#stop').addEventListener('click', stopAllTimeouts);
