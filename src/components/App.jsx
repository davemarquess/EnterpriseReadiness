import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles.scss';

import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  // uri: "https://48p1r2roz4.sse.codesandbox.io",
  uri: 'https://assessment.staging.enterprisegrade.io/graphql',
  cache: new InMemoryCache()
});

const inputId = '-Yk_lHR89cTSRLQ9mehOnsth-OnIFNWn'

const Questions = () => (
  <Query
    // query={gql`
    //   {
    //     rates(currency: "USD") {
    //       currency
    //       rate
    //     }
    //   }
    // `}

    query={gql`
    {
      assessment(id: "CWaW4e0HEqvLYHbqcrSBTO5AUwtQGrpm") {
    id,
    shortId,
    isCompleted,
    questions {
      id,
      text,
      description,
      question,
      choices {
        id,
        text,
        recommendation,
        isSelected
      }
    }
  }
    }
  `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      console.log(data.assessment.questions);
      return data.assessment.questions.map((question, index) => (

        <div key={index} className="questionContainer">
          <div>{question.text}</div>
          <div className="formText">
            {/* <div className="questionDescription">
              {question.description}
      </div> */}
            <p className="question">{question.question}</p>

            <div>
              {question.choices.map(choice => {
                return <div className="inputSelection">
                  <input className="inputRadio" key={choice.id} type="hidden" value={choice.id} />
                  <div className="inputDescriptionContainer">
                    <div className="questionLetter"><span className="letter">{choice.id[choice.id.length - 1].toUpperCase()}</span></div>
                    <label className="inputDescriptionText">{choice.text}</label>
                    <div className="selectionTextContainer">

                    </div>
                  </div>
                </div>
              })}
            </div>
            <div className="buttonContainer">
              <button className="btn">Next ></button>
            </div>
          </div>

        </div>
      ));
    }}
  </Query>
);


class App extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  handleSave(event) {
  }

  render() {
    return (
      <div className="appContainer">
        <div className="innerAppContainer">
          <ApolloProvider client={client}>

            <Questions />
          </ApolloProvider>
        </div>
      </div>
    );
  }
}

export default App;
