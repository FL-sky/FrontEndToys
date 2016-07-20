import React, { PropTypes } from 'react';
import Timeline from '../timeline';
import './style.less';

const propTypes = {
  details: PropTypes.object.isRequired,
};

export default class Content extends React.Component {
  render() {
    const { left, right } = this.props.details;
    return (
      <div className="content row">
        <article className="col-sm-6">
          {left ? left.map((value, index) => (
            <Timeline key={index} data={value} />
          )) : null}
        </article>
        <article className="col-sm-6">
          {right ? right.map((value, index) => (
            <Timeline key={index} data={value} />
          )) : null}
        </article>
      </div>
    );
  }
}

Content.propTypes = propTypes;
