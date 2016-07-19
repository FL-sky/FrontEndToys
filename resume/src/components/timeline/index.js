import React, { PropTypes } from 'react';
import './style.less';

export default class Timeline extends React.Component {

  render() {
    return (
      <section className="timeline">
        <div className="timeline-header">
          <h3>{this.props.title}</h3>
          <div className="timeline-body">

          </div>
        </div>
      </section>
    );
  }
}

Timeline.propTypes = {
  title: PropTypes.string.isRequired,
};
