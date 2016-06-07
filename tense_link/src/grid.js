// 连连看格子

export default class Grid {
  constructor (id, text = '', container) {
    // 数据
    this.id = id;
    this.group = -1;
    this.seq = -1;
    this.noise = false;
    
    // game box
    this.container = container;
    
    // gridEle
    this.gridEle = document.createElement('div');
    this.gridEle.id = 'grid' + id;
    this.gridEle.classList.add('grid');
    
    // optionEle
    this.optionEle = document.createElement('div');
    this.optionEle.classList.add('option');
    
    // textEle
    this.textEle = document.createElement('p');
    this.textEle.innerHTML = text;
    
    // build DOM tree
    this.optionEle.appendChild(this.textEle);
    this.gridEle.appendChild(this.optionEle);
    this.gridEle.Grid = this;
    this.optionEle.Grid = this;
    this.textEle.Grid = this;
  }
  
  adjustSize () {
    let width = this.container.scrollWidth;
    this.gridEle.style.height = (width / 3 - 6) + 'px';
  }
  
  canMark () {
    return !this.optionEle.classList.contains('hide');
  }
  
  markSelected () {
    this.optionEle.classList.add('selected');
  }
  
  isSelected () {
    return this.optionEle.classList.contains('selected');
  }
  
  removeSelected () {
    this.optionEle.classList.remove('selected');
  }
  
  markWrong () {
    this.optionEle.classList.add('wrong');
  }
  
  removeWrong () {
    this.optionEle.classList.remove('wrong');
  }
  
  reset () {
    this.optionEle.classList.remove('selected');
    this.optionEle.classList.remove('wrong');
  }
  
  disappear () {
    this.reset();
    this.optionEle.classList.add('hide');
  }
  
  show () {
    this.optionEle.classList.remove('hide');
  }
  
  isPass () {
    return this.optionEle.classList.contains('hide') || this.noise;
  }
  
  setData (text) {
    this.textEle.innerHTML = text;
  }
  
  getDOM () {
    return this.gridEle;
  }
}
