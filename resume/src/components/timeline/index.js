import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import Remarkable from 'remarkable';
import './style.less';

const md = new Remarkable();

const propTypes = {
  data: PropTypes.object.isRequired,
};

export default class Timeline extends React.Component {

  rawMarkup(text) {
    const rawMarkup = md.render(text);
    return { __html: rawMarkup };
  }

  renderItem(itemData, key) {
    const {
      title, icon, duration, repo, demo,
      intro, description, honor,
    } = itemData;
    return (
      <li key={key} className="timeline-item">
        <div className="title-wrapper">
          <FontAwesome className="icon" name={icon} />
          <h4>{title}</h4>
          {duration ? <span className="duration">{duration}</span> : null}
          {repo ? (
            <span className="repo">
              <FontAwesome className="icon" name="link" />
              <a href={repo}>源代码</a>
            </span>
          ) : null}
          {demo ? (
            <span className="repo">
              <FontAwesome className="icon" name="link" />
              <a href={demo}>Demo</a>
            </span>
          ) : null}
        </div>
        <ul className="description-list">
          {intro ? (
            <li>
              <FontAwesome className="icon" name="cog" />
              <div dangerouslySetInnerHTML={this.rawMarkup(intro)}></div>
            </li>
          ) : null}
          {description ? description.map((text, index) => (
            <li key={index}>
              <FontAwesome className="icon" name="star" />
              <div dangerouslySetInnerHTML={this.rawMarkup(text)}></div>
            </li>
          )) : null}
          {honor ? honor.map((text, index) => (
            <li key={index}>
              <FontAwesome className="icon" name="trophy" />
              <div dangerouslySetInnerHTML={this.rawMarkup(text)}></div>
            </li>
          )) : null}
        </ul>
      </li>
    );
  }

  render() {
    const { name, icon, list } = this.props.data;
    return (
      <section className="timeline">
        <div className="timeline-header">
          <FontAwesome className="icon" name={icon} />
          <h3>{name}</h3>
        </div>
        <div className="timeline-body">
          <ul>
            {list.map((value, index) => (
              this.renderItem(value, index)
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

Timeline.propTypes = propTypes;
