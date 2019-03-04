import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles.scss';
import Questions from './Questions.jsx';

import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'https://assessment.staging.enterprisegrade.io/graphql',
  cache
});


const MY_QUERY = gql`
    query {
      data
    }`;

const CURRENT_QUESTION = gql`
    query {
      currentQuestion
    }`;

class App extends React.Component {
  constructor() {
    super()
    this.state = {
    }
    this.handleToggleQuestionSelected = this.handleToggleQuestionSelected.bind(this);
    this.handleIsQuestionSelected = this.handleIsQuestionSelected.bind(this);
    this.handleReturnQuestion = this.handleReturnQuestion.bind(this);
  }

  componentDidMount() {
  }

  handleReturnQuestion() {
    let currentQuestion = client.readQuery({ query: CURRENT_QUESTION }).currentQuestion;
    cache.writeData({ data: { currentQuestion: currentQuestion + 1 } });
    // return questionArray[currentQuestion];
    console.log(client.readQuery({ query: CURRENT_QUESTION }).currentQuestion)
  }

  handleToggleQuestionSelected() {
    let isQuestionInStore = false;

    try {
      const isSelected = client.readQuery({ query: MY_QUERY });
      console.log('full query: ', isSelected)
      if (isSelected) {
        client.writeData({ data: { questionSelected: !isSelected.questionSelected } })
        isQuestionInStore = true;

      }
    }
    catch (error) {
      // console.log(error);
    }

    if (!isQuestionInStore) {
      client.writeData({ data: { questionSelected: true } });
      // console.log(client.readQuery({ query: MY_QUERY }).questionSelected)
    }
  }

  handleIsQuestionSelected() {
    try {
      isSelected = client.readQuery({ query: MY_QUERY }).questionSelected;
      if (isSelected) return true;
      console.log('true')
    }
    catch (error) {
      console.log('false')
      return false;
    }
  }

  render() {
    return (
      <div className="appContainer">
        <div className="innerAppContainer">
          <ApolloProvider client={client}>
            <Questions
              MY_QUERY={MY_QUERY}
              client={client}
              cache={cache}
              handleReturnQuestion={this.handleReturnQuestion}
              handleToggleQuestionSelected={this.handleToggleQuestionSelected}
              handleIsQuestionSelected={this.handleIsQuestionSelected}
            />
          </ApolloProvider>
        </div>
      </div>
    );
  }
}

export default App;
