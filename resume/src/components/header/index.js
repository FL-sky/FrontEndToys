import React, { PropTypes } from 'react';
import './style.less';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  name: PropTypes.string.isRequired,
  summary: PropTypes.arrayOf(
    PropTypes.string
  ),
  contact: PropTypes.arrayOf(
    PropTypes.object
  ),
};

export default class Header extends React.Component {

  renderFigure() {
    return (
      <figure>
        <h1 className="title">{this.props.name}</h1>
        {this.props.summary.map((value, index) => (
          <small key={index}>{value}</small>
        ))}
      </figure>
    );
  }

  renderContact() {
    return (
      <aside>
        <ul>
          {this.props.contact.map((item, index) => (
            <li key={index}>
              <FontAwesome className="icon" name={item.icon} />
              <span className="tip">{item.name}</span>
              <a href={item.url}>{item.show}</a>
            </li>
          ))}
        </ul>
      </aside>
    );
  }

  render() {
    return (
      <header>
        <div className="row">
          {this.renderFigure()}
          {this.renderContact()}
        </div>
      </header>
    );
  }
}

Header.propTypes = propTypes;
