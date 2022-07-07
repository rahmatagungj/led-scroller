window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const customText = urlParams.get('text') || 'Rahmat Agung Julians';
const space = '                        ';
const txt = space + customText;

let hCell = 80;
let vCell = 20;
let sPos = Math.random() * 10000;
let tick = false;
let pval = false;
let u = 0;
let ready = true;

let c = document.createElement('canvas');

function _div() {
  return document.getElementById('led');
}

function _class(e, cn) {
  if (e.setAttribute) {
    e.setAttribute('className', cn);
  }
  e.className = cn;
}

function _isOn(x, y) {
  x += Math.floor(sPos);

  if (y >= charH) return false;

  let cidx = x / charW;
  cidx = cidx % txt.length;

  let gidx = txt.charCodeAt(cidx) - _cOff;
  if (gidx < 0 || gidx >= _cdisp.length) return false;
  else {
    x = x % charW;
    let val = _cdisp[gidx][x * charH + y];

    if (val == 0) return true;
    else return false;
  }
}

function _ref(c) {
  if (!c) return;

  let $ = c.getContext('2d');
  if (!$) return;

  let colOn = 'hsla(' + u + ', 100%, 50%, 1)';
  let colOff = 'hsla(0,0%,10%,1)';
  let w = (c.width = window.innerWidth);
  let h = (c.height = window.innerHeight / 4);
  let cw = w / hCell;
  let ch = h / vCell;

  for (let i = 0; i < hCell; i++) {
    for (let j = 0; j < vCell; j++) {
      let on = _isOn(i, j);
      let comp = false;
      if (pval) {
        if (on == pval[i][j]) comp = true;
      }
      if (!comp) {
        let col = 0;
        if (on) col = colOn;
        else col = colOff;
        $.fillStyle = col;
        $.beginPath();

        $.rect(i * cw, j * ch, cw - 1, ch - 1);
        $.fill();
        $.closePath();
      }
    }
  }
}

function refTbl(tbody) {
  let trs = tbody.getElementsByTagName('tr');
  let nval = new Array();
  for (let i = 0; i < trs.length; i++) {
    let j = 0;
    nval.push(new Array());
    for (let tdN = trs[i].firstChild; tdN; tdN = tdN.nextSibling) {
      if (!tdN.tagName) continue;
      if (!tdN.tagName.toUpperCase() == 'TD') continue;

      let on = _isOn(j, i);
      nval[i].push(on);
      let comp = false;
      if (pval) {
        if (on == pval[i][j]) comp = true;
      }
      if (!comp) {
        if (_isOn(j, i)) _class(tdN, 'on');
        else _class(tdN, 'off');
      }
      j++;
    }
  }
  pval = nval;
}

function dsptbel() {
  let tb = document.createElement('tbody');

  for (let j = 0; j < vCell; j++) {
    let tr = document.createElement('tr');
    for (let i = 0; i < hCell; i++) {
      let td = document.createElement('td');
      td.appendChild(document.createTextNode(' '));
      tr.appendChild(td);
    }
    tb.appendChild(tr);
  }

  return tb;
}

function tblelm() {
  let c = document.createElement('canvas');

  return c;
}

function _dsptblelm() {
  let tble = document.createElement('table');
  let tb = dsptbel();

  refTbl(tb);

  tbl.appendChild(tb);
  return tbl;
}

function _anim() {
  u -= 0.5;
  if (!ready) return;
  let _curt = new Date().getTime();
  if (tick) {
    let dt = _curt - tick;
    sPos += dt * 0.02;
  }
  tick = _curt;
  upd();

  window.requestAnimFrame(_anim);
}

function upd() {
  let elem = _div();
  if (elem) {
    let tbs = elem.getElementsByTagName('tbody');
    if (tbs.length > 0) {
      refTbl(tbs[0]);
    } else {
      let celm = elem.getElementsByTagName('canvas');

      if (celm.length > 0) {
        _ref(celm[0]);
      } else {
        let c = tblelm();
        elem.appendChild(c);
        _ref(c);
      }
    }
  }
}

_anim();
