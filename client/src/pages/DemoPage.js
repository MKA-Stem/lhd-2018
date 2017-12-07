import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import LoadingSpinner from 'components/LoadingSpinner';
import flow from 'lodash.flow';

const setMessage = gql`
  mutation setMessage($message: String!) {
    setMessage(message: $message) {
      id
      message
    }
  }
`;

const demoQuery = gql`
  query {
    viewer {
      id
      message
    }
  }
`;

const Body = ({data}) => {
  if (data.loading) {
    return <LoadingSpinner />;
  }
  if (data.error) {
    console.log(data.error);
    return <pre>{data.error.message}</pre>;
  } else {
    return <p>{data.viewer.message}</p>;
  }
};

export const DemoPage = ({data, setMessage}) => (
  <div>
    <h1>Demo Page</h1>
    <Body data={data} />
    <button onClick={() => setMessage({variables: {message: prompt('Set message:')}})}>
      Edit message
    </button>
  </div>
);

export default flow([graphql(setMessage, {name: 'setMessage'}), graphql(demoQuery)])(DemoPage);
