import { genRandomOption, randomSort } from './utils';
import './style.less';

class WordDown {
  constructor (doms, words) {
    // 数据
    this.rightNum = 0;
    this.usedTime = 0;
    
    // 状态
    this.process = false;
    this.falling = false;

    // 关联 DOM 对象
    this.refs = doms;
    this.liveHeight = document.body.clientHeight - 120;
    
    // 单词数据
    this.wordObjects = words;
    this.topics = [];
    this.curTopics = null;
    
    // Timer
    this.timerId = null;
    this.downTimerId = null;
    this.downSpeed = 200;
    this.startTime = 0;
    this.endTime = 0;
  }

  init () {
    this.initStatusBar();
    this.refs.welcome.style.height = this.liveHeight + 'px';
    this.refs.gameBox.style.height = this.liveHeight + 'px';
    this.initWords();
    this.initEvent();
    this.initStatusBar();
  }
  
  initWords () {
    const length = this.wordObjects.length;
    for (let i = 0; i < length; ++i) {
      let curWord = this.wordObjects[i];
      if (curWord.topicContent.optionMean1 === '') {
        const options = genRandomOption(this.wordObjects, i, 2);
        if (options) {
          curWord.topicContent.optionMean1 = this.wordObjects[options[0]].topicContent.wordMean;
          curWord.topicContent.optionMean2 = this.wordObjects[options[1]].topicContent.wordMean;
        }
      }
    }
  }
  
  initEvent () {
    // welcome 开始
    this.refs.welcome.addEventListener('click', () => {
      if (!this.process) {
        this.start();
      }
    }, false);
    // 重玩
    this.refs.replayBtn.addEventListener('click', () => {
      this.replay();
    }, false);
    // 暂停按钮
    this.refs.pauseBtn.addEventListener('click', (event) => {
      if (!this.refs.welcome.classList.contains('hide')) return;
      this.togglePauseBtn();
      if (this.process) {
        this.pause();
      } else {
        this.resume();
      }
      event.stopPropagation();
    }, false);
    // 底部选项
    this.refs.optionsTable.addEventListener('click', (event) => {
      if (event.target.classList.contains('option') && this.falling) {
        this.checkAnswer(event.target);
      }
      event.stopPropagation();
    });
  }
  
  fetchWords () {
    if (this.wordObjects.length <= 0) {
      this.stop();
    }
    if (this.topics.length > 0) {
      this.wordObjects = this.wordObjects.concat(this.topics);
      this.topics = [];
    }
    for (let i = 0; i < 20 && this.wordObjects.length > 0; ++i) {
      this.topics.push(this.wordObjects.shift());
    }
    randomSort(this.topics);
  }
  
  initStatusBar () {
    this.rightNum = 0;
    this.usedTime = 0;
    this.refs.rightNumBar.textContent = this.rightNum;
    this.refs.usedTimeBar.textContent = this.usedTime;
  }
  
  initOptionsTable () {
    const length = this.refs.optionBoxes.length;
    for (let i = 0, j = 0; i < length; ++i) {
      this.refs.optionBoxes[i].classList.remove('right');
      this.refs.optionBoxes[i].classList.remove('wrong');
      this.refs.optionBoxes[i].textContent = '';
    }
    this.refs.meanBox.textContent = '';
  }
  
  increaseTime () {
    this.usedTime += 1;
    this.refs.usedTimeBar.textContent = this.usedTime;
  }
  
  increaseRightNum () {
    this.rightNum += 1;
    this.refs.rightNumBar.textContent = this.rightNum;
  }
  
  makeWordDown (wordEle) {
    let originTop = parseInt(wordEle.style.top.replace('px', ''));
    if (originTop + 30 >= this.liveHeight) {
      this.checkAnswer(this.refs.optionBoxes[1]);
    } else {
      originTop += 5;
      wordEle.style.top = originTop + 'px';
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
  
  start () {
    console.log('game start');
    this.process = true;
    this.refs.welcome.classList.add('hide');
    this.refs.gameBox.classList.remove('hide');
    this.fetchWords();
    this.startTime = Date.now();
    this.timerId = setInterval(() => {
      this.increaseTime();
    }, 1000);
    this.refs.wrongBlock.style.height = 0;
    this.liveHeight = document.body.clientHeight - 120;
    this.showTopic();
  }
  
  replay () {
    console.log('game restart');
    this.refs.endReport.classList.add('hide');
    
    this.refs.welcome.classList.remove('hide');
    this.refs.gameBox.classList.add('hide');
    this.initStatusBar();
    this.initOptionsTable();
    this.refs.playGround.classList.remove('hide');
  }
  
  stop () {
    console.log('game stop');
    this.process = false;
    clearInterval(this.timerId);
    if (this.falling) {
      clearInterval(this.downTimerId);
    }
    this.endTime = Date.now();
    this.refs.reportData[0].textContent = this.rightNum;
    this.refs.reportData[1].textContent = parseFloat((this.endTime - this.startTime) / 1000).toFixed(2);
    this.refs.playGround.classList.add('hide');
    this.refs.endReport.classList.remove('hide');
  }
  
  pause () {
    this.process = false;
    clearInterval(this.timerId);
    if (this.falling) {
      clearInterval(this.downTimerId);
    }
  }
  
  resume () {
    this.process = true;
    this.timerId = setInterval(() => {
      this.increaseTime();
    }, 1000);
    if (this.falling) {
      this.downTimerId = setInterval(() => {
        this.makeWordDown(this.refs.downWord);
      }, this.downSpeed);
    } else {
      this.showTopic();
      this.showOptions();
    }
  }
  
  showTopic () {
    if (this.topics.length < 5) {
      this.fetchWords();
    }
    this.curTopics = this.topics.pop();
    this.refs.downWord.textContent = this.curTopics.topicContent.word;
    this.refs.downWord.style.top = 0;
    this.refs.downWord.classList.remove('hide');
    this.falling = true;
    this.showOptions();
    this.downTimerId = setInterval(() => {
      this.makeWordDown(this.refs.downWord);
    }, this.downSpeed);
  }
  
  showOptions () {
    // 取得选项，随机打乱
    const options = [];
    options.push(this.curTopics.topicContent.wordMean);
    options.push(this.curTopics.topicContent.optionMean1);
    options.push(this.curTopics.topicContent.optionMean2);
    randomSort(options);
    
    // 植入 DOM
    const length = this.refs.optionBoxes.length;
    for (let i = 0, j = 0; i < length; ++i) {
      this.refs.optionBoxes[i].classList.remove('right');
      this.refs.optionBoxes[i].classList.remove('wrong');
      this.refs.optionBoxes[i].textContent = options[j++];
    }
  }
  
  checkAnswer (optionNode) {
    // 掉落单词状态修改
    if (this.falling) clearInterval(this.downTimerId);
    this.falling = false;
    this.refs.downWord.classList.add('hide');
    
    // 检查答案
    const word = this.curTopics.topicContent.word;
    const wordMean = this.curTopics.topicContent.wordMean;
    const right = (optionNode.textContent === wordMean);
    
    if (right) {
      optionNode.classList.add('right');
      this.increaseRightNum();
    } else {
      optionNode.classList.add('wrong');
      // 将错误单词推回去
      this.wordObjects.unshift(this.curTopics);
      this.curTopics = null;
      this.whenAnswerWrong();
    }
    this.refs.meanBox.textContent = word + ' = ' + wordMean;
    this.nextStep();
  }
  
  whenAnswerWrong () {
    let originHeight = parseInt(this.refs.wrongBlock.style.height.replace('px', ''));
    originHeight += 40;
    this.liveHeight -= 40;
    this.refs.wrongBlock.style.height = originHeight + 'px';
    if (this.liveHeight <= 5) {
      this.stop();
    }
  }
  
  nextStep () {
    if (this.process) {
      setTimeout(() => {
        this.showTopic();
      }, 500);
    }
  }
}


window.onload = () => {
  const doms = {
    // play ground
    playGround: document.getElementById('play-ground'),
    // status-bar
    rightNumBar: document.getElementById('right-num'),
    usedTimeBar: document.getElementById('used-time'),
    pauseBtn: document.getElementById('pause-btn'),
    // welcome
    welcome: document.getElementById('welcome'),
    // gameBox
    gameBox: document.getElementById('game-box'),
    wrongBlock: document.getElementById('wrong-block'),
    downWord: document.getElementById('down-word'),
    // options
    optionsTable: document.getElementById('options-table'),
    optionBoxes: document.querySelectorAll('#options-table > .option'),
    meanBox: document.getElementById('mean-box'),
    // end report
    endReport: document.getElementById('end-report'),
    reportData: document.querySelectorAll('.report-data'),
    replayBtn: document.getElementById('replay-btn')
  };
  const game = new WordDown(doms, window.cet4Word);
  game.init();
}

