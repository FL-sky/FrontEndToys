import { genRandomOption, randomSort, showAnimate } from './utils';
import './style.less';
import { requestWord, sendHasLearned } from './data';

class WordDown {
  constructor (doms) {
    // 数据
    this.rightNum = 0;
    this.usedTime = 0;
    
    // 状态
    this.request = true;
    this.process = false;
    this.falling = false;

    // 关联 DOM 对象
    this.refs = doms;
    this.liveHeight = 0;
    this.rowHeight = 0;
    
    // 单词数据
    this.wordObjects = [];
    this.curTopic = null;
    this.curAudioEle = null;
    this.learned = [];
    
    // Timer
    this.timerId = null;
    this.downTimerId = null;
    this.downSpeed = 200;
    this.startTime = 0;
    this.endTime = 0;
    
    // 构建初始化
    this.initEvent();
  }

  genOptions () {
    const length = this.wordObjects.length;
    for (let i = 0; i < length; ++i) {
      let curWord = this.wordObjects[i];
      if (!curWord.option1) {
        const options = genRandomOption(this.wordObjects, curWord.id, 2);
        if (options) {
          curWord.option1 = this.wordObjects[options[0]].mean_word;
          curWord.option2 = this.wordObjects[options[1]].mean_word;
        }
      }
    }
    randomSort(this.wordObjects);
  }

  requestTopics (callback) {
    this.request = true;
    requestWord({
      success: (response) => {
        if (response.error_code === 0) {
          this.request = false;
          this.wordObjects = this.wordObjects.concat(response.terms);
          this.genOptions();
          if (callback) {
            callback.call(this);
          }
        }
      },
      error: (response) => {
        console.log('error request');
        this.stop();
      }
    });
  }
  
  initEvent () {
    // welcome 开始
    this.refs.welcome.addEventListener('click', () => {
      if (!this.process && !this.request) {
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
      if (event.target.classList.contains('option') && this.falling && this.process) {
        this.checkAnswer(event.target);
      }
      event.stopPropagation();
    }, false);
    // 掉落单词点击播放音频
    this.refs.downWord.addEventListener('click', (event) => {
      this.playWordAudio();
    }, false);
  }
  
  initStatusBar () {
    this.rightNum = this.usedTime = 0;
    this.refs.rightNumBar.textContent = this.rightNum;
    this.refs.usedTimeBar.textContent = this.usedTime;
  }
  
  computeHeight () {
    let rootElement = document.documentElement;
    rootElement.style.fontSize = rootElement.clientWidth / 3.20 + 'px';
    this.rowHeight = this.refs.optionsTable.clientHeight;
    this.liveHeight = rootElement.clientHeight - this.rowHeight * 3;
    this.refs.welcome.style.height = this.liveHeight + 'px';
    this.refs.gameBox.style.height = this.liveHeight + 'px';
  }
  
  initView () {
    this.computeHeight();
    this.refs.wrongBlock.style.height = 0;
    this.refs.welcome.classList.remove('hide');
    this.refs.gameBox.classList.add('hide');
    this.refs.playGround.classList.remove('hide');
    this.refs.endReport.classList.add('hide');
  }

  initOptionsTable () {
    const length = this.refs.optionBoxes.length;
    for (let i = 0; i < length; ++i) {
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
    if (originTop + this.rowHeight >= this.liveHeight) {
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
  
  prepare () {
    this.initStatusBar();
    this.initView();
    this.initOptionsTable();
  }
  
  start () {
    console.log('game start');
    this.process = true;
    this.refs.welcome.classList.add('hide');
    this.refs.gameBox.classList.remove('hide');
    // 开始计时
    this.startTime = Date.now();
    this.timerId = setInterval(() => {
      this.increaseTime();
    }, 1000);
    // 开始掉落单词
    this.showWordTopic();
  }
  
  replay () {
    console.log('game replay');
    this.startTime = Date.now();
    this.requestTopics();
    this.prepare();
  }
  
  stop () {
    console.log('game stop');
    this.process = false;
    // 停止计时
    this.endTime = Date.now();
    clearInterval(this.timerId);
    if (this.falling) {
      clearInterval(this.downTimerId);
    }
    // 发送已学到服务端
    console.log(this.learned);
    sendHasLearned({
      ids: this.learned
    });
    // 显示结束报告页面
    let diff = (this.endTime - this.startTime) / 1000;
    this.refs.reportData[0].textContent = this.rightNum;
    this.refs.reportData[1].textContent = parseFloat(diff).toFixed(2);
    this.refs.playGround.classList.add('hide');
    this.refs.endReport.classList.remove('hide');
  }
  
  pause () {
    this.process = false;
    this.endTime = Date.now();
    clearInterval(this.timerId);
    if (this.falling) {
      clearInterval(this.downTimerId);
    }
  }
  
  resume () {
    console.log('game resume');
    this.process = true;
    this.startTime = this.startTime + (Date.now() - this.endTime);
    this.timerId = setInterval(() => {
      this.increaseTime();
    }, 1000);
    if (this.falling) {
      this.downTimerId = setInterval(() => {
        this.makeWordDown(this.refs.downWord);
      }, this.downSpeed);
    } else {
      this.showWordTopic();
    }
  }
  
  showWordTopic () {
    if (this.wordObjects.length <= 5) {
      this.requestTopics(this.showWordTopic);
    } else {
      // 加载音频
      this.genWordAudio();
      this.preLoadAudio();
      
      // 显示出当前掉落单词
      this.curTopic = this.wordObjects.shift();
      this.refs.downWord.textContent = this.curTopic.word;
      this.refs.downWord.style.top = 0;
      this.refs.downWord.classList.remove('hide');
      this.falling = true;
      
      // 播放音频
      this.curAudioEle = document.getElementById('audio' + this.curTopic.id);
      this.playWordAudio();
      
      // 显示出选项
      this.showOptions();
      
      // 开始掉落
      this.downTimerId = setInterval(() => {
        this.makeWordDown(this.refs.downWord);
      }, this.downSpeed);
    }
  }
  
  genWordAudio () {
    // 移除已经播放过的
    if (this.curAudioEle) {
      this.curAudioEle.removeEventListener('canplaythrough', this.playWordAudio.bind(this));
      this.curAudioEle.parentElement.removeChild(this.curAudioEle);
      this.curAudioEle = null;
    }
    for (let i = 0; i < 5 && i < this.wordObjects.length; ++i) {
      let topicId = this.wordObjects[i].id;
      let audioEle = document.getElementById('audio' + topicId);
      if (audioEle == null) {
        let audioSrc = this.wordObjects[i].audio_word;
        audioEle = document.createElement('audio');
        audioEle.id = 'audio' + topicId;
        audioEle.src = audioSrc;
        document.body.appendChild(audioEle);
      }
    }
  }
  
  preLoadAudio () {
    let audios = document.getElementsByTagName('audio');
    console.log()
    for (let i = 0; i < audios.length; ++i) {
      if (!audios[i].hasAttribute('loaded')) {
        audios[i].load();
        audios[i].oncanplaythrough = (event) => {
          audios[i].setAttribute('loaded', 'true');
        };
      }
    }
  }
  
  showOptions () {
    // 取得选项，随机打乱
    const options = [];
    options.push(this.curTopic.mean_word);
    options.push(this.curTopic.option1);
    options.push(this.curTopic.option2);
    randomSort(options);
    
    // 植入 DOM
    const length = this.refs.optionBoxes.length;
    for (let i = 0; i < length; ++i) {
      this.refs.optionBoxes[i].classList.remove('right');
      this.refs.optionBoxes[i].classList.remove('wrong');
      this.refs.optionBoxes[i].textContent = options[i];
    }
  }
  
  playWordAudio () {
    if (this.curAudioEle) {
      this.curAudioEle.play();
    }
  }
  
  checkAnswer (optionNode) {
    // 掉落单词状态修改
    if (this.falling) {
      clearInterval(this.downTimerId);
    }
    this.falling = false;
    this.refs.downWord.classList.add('hide');
    
    // 检查答案, 显示正确释义
    const word = this.curTopic.word;
    const wordMean = this.curTopic.mean_word;
    this.refs.meanBox.textContent = word + ' = ' + wordMean;

    const right = (optionNode.textContent === wordMean);
    if (right) {
      this.whenAnswerRight(optionNode);
    } else {
      this.whenAnswerWrong(optionNode);
    }
    
    // 下一关
    this.nextStep();
  }
  
  whenAnswerRight (optionNode) {
    optionNode.classList.add('right');
    this.increaseRightNum();
    if (this.learned.indexOf(this.curTopic.id) === -1) {
      this.learned.push(this.curTopic.id);
    }
  }
  
  whenAnswerWrong (optionNode) {
    optionNode.classList.add('wrong');
    // 改变 wrong Block 高度
    let height = this.refs.wrongBlock.style.height;
    height = parseInt(height.replace('px', '')) + this.rowHeight;
    showAnimate(this.refs.wrongBlock, 'bounce-down');
    this.refs.wrongBlock.style.height = height + 'px';
    // 更新 liveHeight, 判断死亡
    this.liveHeight -= this.rowHeight;
    if (this.liveHeight <= 5) {
      this.stop();
    }
  }
  
  nextStep () {
    if (this.downSpeed > 100) {
      this.downSpeed -= 5;
    }
    if (this.process) {
      setTimeout(() => {
        this.showWordTopic();
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
  const game = new WordDown(doms);
  game.prepare();
  game.requestTopics();
}

