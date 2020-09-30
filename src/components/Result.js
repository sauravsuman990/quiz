import React, { Component } from 'react';
import InputButton from './InputButton';
import { ActionTypes } from '../constants/actionTypes';
import { connect } from 'react-redux';

    class Result extends Component{
        constructor(props){
            super(props);
            this.state={}
        }
        render (){
            const questions  = this.props.quiz.questions;
            let correct = 0;
            questions.forEach(q => { q.isCorrect = q.options.every(x => x.selected === x.isAnswer || x.isAnswer === q.value);
                correct = q.isCorrect? correct+1:correct
            })
    
    //isCorrect true means ans is true, selected and isAnswer match that's why corrrect ans
    return (
        <div className="result">
            <h2 className="text-center font-weight-normal">Quiz Result</h2>
            <div className="alert alert-info text-center"><h3> You scored {correct} out of {questions.length} </h3></div>
            {questions.map((q, index) =>    
                <div key={q.id} className={`mb-2 ${q.isCorrect ? 'bg-success' : 'bg-danger'}`}>
                    <div className="result-question">
                        <h5>{index + 1}. {q.name}</h5>
                        {!q.sub && <div className="row">
                            {
                                q.options.map(option =>
                                    <div key={option.id} className="col-6">
                                        {option.selected?option.selected=false:""}
                                        <input id={option.id} type="checkbox" disabled="disabled" checked={option.selected} /> {option.name}
                                    </div>
                                )
                            }
                        </div>}
                        {
                        !!q.sub && <div>
                            {q.value}
                            {q.value?q.value="":null}
                        </div>
                        }
                        <div className={`m-1 p-1 text-bold ${q.isCorrect ? 'text-success' : 'text-danger'}`}>Your answer is {q.isCorrect ? 'Correct' : 'Wrong'}.</div>

                    </div>
                </div>
            )}
            <InputButton total={correct} length={questions.length}/>
            <h4 className="alert alert-info text-center">Kindly Enter your Name and Email !!.</h4>
        </div>
    )
}
    }
const mapStateToProps = state => { return { ...state.quiz, ...state.mode, ...state.pager,...state.score } };
const mapDispatchToProps = dispatch => ({
    onSubmit: payload => dispatch({ type: ActionTypes.QuizSubmit, payload }),
    onPagerUpdate: payload => dispatch({ type: ActionTypes.PagerUpdate, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(Result);














// function Result(props) {
//     let questions = props.questions;
//     let email = props.email;
//     console.log("result------questions*****", questions);
//     console.log("***email***",email);
//     let Result = 0;
//     questions.forEach(q => {
//         q.isCorrect = q.options.every(x => {
//            return x.selected === x.isAnswer || q.value === x.isAnswer;
//         });
//         if (q.isCorrect === true) {
//             Result++;
//         }
//     })


