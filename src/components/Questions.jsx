import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles.scss';

import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider, Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

const MY_QUERY = gql`
    query {
      isCompleted,
      questions {
        id,
        text,
        choices {
          id,
          isSelected
        }
      }
    }`;

const CURRENT_QUESTION = gql`
    query {
      currentQuestion
    }`;

const Questions = (props) => (
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
      if (error) return <p>Error :</p>;

      props.cache.writeData({
        data: {
          assessment: data.assessment,
          currentQuestion: 0
        }
      });

      console.log(data.assessment)

      return data.assessment.questions.map((question, index) => (
        <div key={index} className="questionContainer">
          <div>{question.text}</div>
          <div className="formText">
            {/* --> uncomment if want full question description
              <div className="questionDescription">
              {question.description} </div> */}
            <p className="question">{question.question}</p>

            <div>
              {question.choices.map((choice, index) => {
                return <ApolloConsumer key={choice.id}>
                  {client => (
                    <div
                      className="inputSelection"
                      onClick={() => {
                        // cache.writeData({ data: { 
                        //   questions: currentQuestion + 1 
                        // } });
                        const fullData = props.client.readQuery({ query: MY_QUERY });
                        console.log('full query: ', fullData.questions[0])
                        // client.writeData({ data: { points: choice.id } });
                        localStorage.clear;
                        // props.handleToggleQuestionSelected();
                        // console.log(client.readQuery({ query: props.MY_QUERY }).questionSelected)

                        // props.handleIsQuestionSelected();
                      }}
                    >
                      <input className="inputRadio" type="hidden" value={choice.id} />
                      <div className="inputDescriptionContainer">
                        <div className="questionLetter"><span className="letter">{choice.id[choice.id.length - 1].toUpperCase()}</span></div>
                        <label className="inputDescriptionText">{choice.text}</label>
                        <div className="selectionTextContainer">

                        </div>
                      </div>
                    </div>
                  )}
                </ApolloConsumer>
              })}
            </div>
            <div className="buttonContainer">
              <ApolloConsumer>
                {client => (
                  <button
                    className="btn"
                    onClick={() => {
                      // client.writeData({ data: { points: choice.id } });
                      props.handleReturnQuestion();
                      
                      localStorage.clear;
                    }}
                  >
                    Next >
                </button>
                )}
              </ApolloConsumer>
            </div>
          </div>

        </div>
      ))[props.client.readQuery({ query: CURRENT_QUESTION }).currentQuestion];

      // const returnQuestion = () => {
      //   console.log('hiii')
      //   let currentQuestion = props.client.readQuery({ query: CURRENT_QUESTION }).currentQuestion;
      //   console.log('currentQuestion: ', currentQuestion);
      //   // console.log('currentQuestion: ', currentQuestion);
      //   props.cache.writeData({ data: { currentQuestion: currentQuestion + 1 } });
      //   // return questionArray[currentQuestion];
      // }

      console.log(props.client.readQuery({ query: CURRENT_QUESTION }).currentQuestion)
      return questionArray[props.client.readQuery({ query: CURRENT_QUESTION }).currentQuestion];
    }}
  </Query>
);

export default Questions;