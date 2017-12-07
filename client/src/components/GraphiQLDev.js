import React from 'react';
import GraphiQL from 'graphiql';
import {parse} from 'graphql';
import {execute} from 'apollo-link';

import 'graphiql/graphiql.css';
import './GraphiQLDev.css';

export class GraphiQLDev extends React.Component {
  constructor(props) {
    super(props);
    this.link = this.props.link;

    this.state = {open: false};
  }

  fetch(operation) {
    operation.query = parse(operation.query);
    return execute(this.link, operation);
  }

  toggleOpen() {
    this.setState(e => ({open: !e.open}));
  }

  render() {
    const {open} = this.state;
    const onClick = this.toggleOpen.bind(this);

    if (open) {
      return (
        <div className="GraphiQLDev_open">
          <button className="GraphiQLDev_btn" onClick={onClick}>
            Close GraphiQL
          </button>
          <GraphiQL fetcher={this.fetch.bind(this)} />
        </div>
      );
    }

    return (
      <button className="GraphiQLDev_btn" onClick={onClick}>
        Open GraphiQL
      </button>
    );
  }
}

export default GraphiQLDev;
