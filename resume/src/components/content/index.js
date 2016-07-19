import React from 'react';
import Timeline from '../timeline';
import './style.less';

export default class Content extends React.Component {
  render() {
    return (
      <div className="content row">
        <article className="col-sm-6">
          <Timeline title="教育经历" />
        </article>
        <article className="col-sm-6">
          hhh
        </article>
      </div>
    );
  }
}
