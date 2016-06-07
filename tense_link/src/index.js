import './style.less';
import Grid from './grid';
import { randomSort, showAnimate } from './utils';
import tenseData from './data';

class TenseLink {
  
  constructor (doms, words) {
    // 数据
    this.rightNum = 0;
    this.usedTime = 15;
    this.level = 1;
    this.life = 3;
    this.mode = -1;
    
    // 状态
    this.process = false;
    this.selected = [];
    
    // 关联 DOM 对象
    this.refs = doms;
    this.refs.grids = [];
    
    // 单词数据
    this.wordObjects = words;
    this.options = [];
    this.boardWords = {};
    this.errorWords = [];

    // Timer
    this.timerId = -1;
    this.handleSpeed = 500;
    
    // 构建初始化
    this.buildGrids();
    this.initEvent();
    this.initWords();
    if (document.cookie) {
      this.refs.welcome.classList.add('hide');
    }
  }
  
  buildGrids () {
    for (let i = 0; i < 9; ++i) {
      let grid = new Grid(i, '', this.refs.gameBox);
      this.refs.gameBox.appendChild(grid.getDOM());
      this.refs.grids[i] = grid.getDOM();
      this.refs.grids[i].Grid.adjustSize();
    }
  }
  
  initEvent () {
    // mode-init
    this.refs.modePage.addEventListener('click', (event) => {
      let target = event.target;
      if (target.nodeName.toLowerCase() === 'button') {
        let mode = target.getAttribute('data-mode');
        this.mode = parseInt(mode);
        this.refs.modePage.classList.add('hide');
        this.initStatusBar();
        this.prepare();
        if (this.refs.welcome.classList.contains('hide')) {
          this.start();
        }
      }
    });
    // welcome
    this.refs.welcome.addEventListener('click', (event) => {
      document.cookie = 'link_first=1';
      showAnimate(this.refs.welcome, 'fade-out');
      setTimeout(() => {
        this.refs.welcome.classList.add('hide');
        this.refs.welcome.classList.remove('fade-out');
        this.start();
      }, 500);
    });
    // replay
    this.refs.replayBtn.addEventListener('click', (event) => {
      this.replay();
    }, false);
    // 暂停按钮
    this.refs.pauseBtn.addEventListener('click', (event) => {
      this.togglePauseBtn();
      if (this.process) {
        this.pause();
      } else {
        this.resume();
      }
      event.stopPropagation();
    }, false);
    // 游戏区域
    this.refs.gameBox.addEventListener('click', (event) => {
      let self = event.target;
      if (this.process && self.Grid && self.Grid.canMark()) {
        if (this.mode === 1 && this.timerId === -1) {
          return;
        }
        this.handleLink(self.Grid);
      }
    }, false);
  }
  
  initWords () {
    randomSort(this.wordObjects);
  }
  
  initTimer () {
    this.usedTime = 15;
    this.refs.usedTimeBar.textContent = this.usedTime;
    if (this.mode === 1) {
      this.refs.usedTimeBar.parentNode.classList.remove('hide');
    } else {
      this.refs.usedTimeBar.parentNode.classList.add('hide');
    }
  }
  
  initStatusBar () {
    this.life = 3;
    this.level = 1;
    this.rightNum = 0;
    this.refs.levelNumBar.textContent = this.level;
    this.initTimer();
    if (this.mode === 1) {
      this.refs.pauseBtn.classList.remove('hide');
    } else {
      this.refs.pauseBtn.classList.add('hide');
    }
  }
  
  reduceTime () {
    this.usedTime -= 1;
    this.refs.usedTimeBar.textContent = this.usedTime;
    if (this.usedTime === 0) {
      this.reduceLife();
    }
  }
  
  increaseRightNum () {
    this.rightNum += 1;
    console.log('rightNum', this.rightNum);
  }
  
  increaseLevel () {
    this.level += 1;
    this.refs.levelNumBar.textContent = this.level;
    console.log('level', this.level);
  }
  
  reduceLife () {
    this.life -= 1;
    console.log('life', this.life);
    if (this.life === 0) {
      this.stop();
    }
  }
  
  togglePauseBtn () {
    if (this.refs.pauseBtn.classList.contains('pause')) {
      this.refs.pauseBtn.classList.remove('pause');
      this.refs.pauseBtn.classList.add('show');
    } else {
      this.refs.pauseBtn.classList.remove('show');
      this.refs.pauseBtn.classList.add('pause');
    }
  }
  
  fetchWords () {
    if (this.wordObjects.length < 3) {
      return false;
    }
    this.options = [];
    this.boardWords = {};
    this.errorWords = [];
    if (this.mode === 1) {
      for (let i = 0; i < 3; ++i) {
        let curWords = this.wordObjects.pop();
        this.boardWords[curWords.id] = curWords;
        this.options.push({
          group: curWords.id, seq: 1, text: curWords.word + '<br>' + curWords.wordMean
        });
        this.options.push({
          group: curWords.id, seq: 2, text: curWords.tense1
        });
        this.options.push({
          group: curWords.id, seq: 3, text: curWords.tense2
        });
      }
    } else {
      let noise = [];
      for (let i = 0; i < 2; ++i) {
        let curWords = this.wordObjects.pop();
        this.boardWords[curWords.id] = curWords;
        this.options.push({
          group: curWords.id, seq: 1, text: curWords.word + '<br>' + curWords.wordMean
        });
        this.options.push({
          group: curWords.id, seq: 2, text: curWords.tense1
        });
        this.options.push({
          group: curWords.id, seq: 3, text: curWords.tense2
        });
        for (let j = 0; j < curWords.noise.length; ++j) {
          noise.push({
            group: curWords.id, seq: 0, text: curWords.noise[j], noise: true
          });
        }
      }
      randomSort(noise);
      this.options = this.options.concat(noise.slice(0, 3));
    }
    randomSort(this.options);
    return true;
  }
  
  initBoard () {
    for (let i = 0; i < 9; ++i) {
      this.refs.grids[i].Grid.setData(this.options[i].text);
      this.refs.grids[i].Grid.group = this.options[i].group;
      this.refs.grids[i].Grid.seq = this.options[i].seq;
      this.refs.grids[i].Grid.show();
      if (this.options[i].noise) {
        this.refs.grids[i].Grid.noise = true;
      }
    }
  }
  
  setTimer () {
    if (this.mode !== 1 || this.timerId !== -1) {
      return;
    }
    this.timerId = setInterval(() => {
      this.reduceTime();
    }, 1000);
  }
  
  stopTimer () {
    if (this.timerId !== -1) {
      clearInterval(this.timerId);
      this.timerId = -1;
    }
  }
  
  putErrorWords (id) {
    let word = this.boardWords[id];
    if (word && this.errorWords.indexOf(word) === -1) {
      this.errorWords.push(word);
    }
  }
  
  prepare () {
    this.selected = [];
    let ok = this.fetchWords();
    if (!ok) {
      this.stop();
    } else {
      this.initBoard();
      this.refs.endReport.classList.add('hide');
      this.refs.playGround.classList.remove('hide');
    }
    return ok;
  }
  
  start () {
    console.log('game start');
    this.process = true;
    this.initTimer();
    this.setTimer();
  }
  
  stop () {
    console.log('game stop');
    this.process = false;
    this.stopTimer();
    
    // show end report
    this.refs.reportData[0].textContent = this.rightNum;
    this.refs.reportData[1].textContent = this.level;
    
    // show error words
    let strError = [];
    for (let i = 0; i < this.errorWords.length; ++i) {
      strError.push(`<tr>
        <td>${this.errorWords[i].wordMean}</td>
        <td>${this.errorWords[i].word}</td>
        <td>${this.errorWords[i].tense1}</td>
        <td>${this.errorWords[i].tense2}</td>
      </tr>`)
    }
    this.refs.errorReview.innerHTML = strError.join(' ');
    this.refs.playGround.classList.add('hide');
    this.refs.endReport.classList.remove('hide');
  }
  
  replay () {
    console.log('game replay');
    this.process = true;
    this.initStatusBar();
    this.refs.endReport.classList.add('hide');
    this.refs.modePage.classList.remove('hide');
    this.refs.playGround.classList.remove('hide');
  }
  
  pause () {
    console.log('game pause');
    this.process = false;
    this.stopTimer();
  }
  
  resume () {
    console.log('game resume');
    this.process = true;
    this.setTimer();
  }
  
  isAllPass () {
    for (let i = 0; i < this.refs.grids.length; ++i) {
      if (!this.refs.grids[i].Grid.isPass()) {
        return false;
      }
    }
    return true;
  }
  
  nextStep () {
    console.log('game next step');
    let ok = this.prepare();
    if (ok) {
      this.increaseLevel();
      this.start();
    }
  }
  
  handleLink (target) {
    let has = this.selected.indexOf(target.id);
    if (has !== -1) {
      this.selected.splice(has, 1);
      target.removeSelected();
      return;
    }
    target.markSelected();
    if (this.selected.length === 0) {
      if (target.seq === 1) {
        this.selected.push(target.id);
      } else {
        target.markWrong();
        setTimeout(() => {
          target.reset();
        }, this.handleSpeed);
      }
    } else if (this.selected.length === 1) {
      let has = this.refs.grids[this.selected[0]].Grid;
      if (target.group === has.group && target.seq === 2) {
        this.selected.push(target.id);
      } else {
        target.markWrong();
        this.putErrorWords(has.group);
        this.reduceLife();
        this.selected = [];
        setTimeout(() => {
          has.reset();
          target.reset();
        }, this.handleSpeed);
      }
    } else if (this.selected.length === 2) {
      let has1 = this.refs.grids[this.selected[0]].Grid;
      let has2 = this.refs.grids[this.selected[1]].Grid;
      if (target.group === has1.group && target.group === has2.group &&
          target.seq === 3) {
        this.stopTimer();
        this.increaseRightNum();
        this.selected = [];
        setTimeout(() => {
          has1.disappear();
          has2.disappear();
          target.disappear();
          if (this.isAllPass()) {
            this.nextStep();
          } else {
            this.initTimer();
            this.setTimer();
          }
        }, this.handleSpeed);
      } else {
        target.markWrong();
        this.putErrorWords(has1.group);
        this.reduceLife();
        this.selected = [];
        setTimeout(() => {
          has1.reset();
          has2.reset();
          target.reset();
        }, this.handleSpeed);
      }
    }
  }
}

window.onload = () => {
  const rootElement = document.documentElement;
  
  const doms = {
    // mode init
    modePage: document.getElementById('mode-init'),
    // welcome page
    welcome: document.getElementById('welcome'),
    // play ground
    playGround: document.getElementById('play-ground'),
    // status-bar
    levelNumBar: document.getElementById('level-num'),
    usedTimeBar: document.getElementById('used-time'),
    pauseBtn: document.getElementById('pause-btn'),
    // game box
    gameBox: document.getElementById('game-box'),
    // end report
    endReport: document.getElementById('end-report'),
    reportData: document.querySelectorAll('.report-data'),
    errorReview: document.getElementById('error-words'),
    replayBtn: document.getElementById('replay-btn')
  };

  rootElement.style.fontSize = rootElement.clientWidth / 3.20 + 'px';
  
  let game = new TenseLink(doms, tenseData);
}
