import React from 'react';
import './style.less';
import FontAwesome from 'react-fontawesome';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="row">
          <figure>
            <h1 className="title">彭潇</h1>
            <small>男 / 21岁 / 2017年应届毕业生</small><br />
            <small>前端工程师</small>
          </figure>
          <aside>
            <ul>
              <li>
                <FontAwesome className="icon" name="envelope-o" />
                <span className="tip">邮箱</span>
                <a href="mailto:rayn1027@outlook.com">rayn1027@outlook.com</a>
              </li>
              <li>
                <FontAwesome className="icon" name="github" />
                <span className="tip">Github</span>
                <a href="https://github.com/Raynxxx">https://github.com/Raynxxx</a>
              </li>
              <li>
                <FontAwesome className="icon" name="qq" />
                <span className="tip">QQ</span>
                <a>414747795</a>
              </li>
              <li>
                <FontAwesome className="icon" name="wechat" />
                <span className="tip">微信</span>
                <a>raynxxx</a>
              </li>
              <li>
                <FontAwesome className="icon" name="rss" />
                <span className="tip">博客</span>
                <a href="http://www.raynxxx.com">http://www.raynxxx.com</a>
              </li>
            </ul>
          </aside>
        </div>
      </header>
    );
  }
}
