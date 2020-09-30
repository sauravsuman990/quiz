import React, { Component } from 'react';
import { ActionTypes } from '../constants/actionTypes';
import { connect } from 'react-redux';
const mapStateToProps = state => ({ ...state.quiz, ...state.mode, ...state.pager });
const mapDispatchToProps = dispatch => ({
    onAnswer: payload => dispatch({ type: ActionTypes.QuizAnswer, payload }),
    onPagerUpdate: payload => dispatch({ type: ActionTypes.PagerUpdate, payload })
});
class Questions extends Component {
    move = (e) => {
        let id = e.target.id;
        let index = 0;
        if (id === 'first')
            index = 0;
        else if (id === 'prev')
            index = this.props.pager.index - 1;
        else if (id === 'next')
            index = this.props.pager.index + 1;
        else if (id === 'last')
            index = this.props.pager.count - 1;
        else
            index = parseInt(e.target.id, 10);
        if (index >= 0 && index < this.props.pager.count) {
            let pager = {
                index: index,
                size: 1,
                count: this.props.pager.count
            };
            this.props.onPagerUpdate(pager);
        }
    }
    // setMode = (e) => this.props.onSubmit(e.target.id);
    onAnswer(question, option) {
        let quiz = JSON.parse(JSON.stringify(this.props.quiz));
        console.log("inter===>",quiz)
        let q = quiz.questions.find(x => x.id === question.id);
        if (q.questionTypeId === 1) {
            q.options.forEach((x) => { x.selected = false; });
        q.options.find(x => x.id === option.id).selected = true;
        }
        else{
            let o = q.options.find(x => x.id === option.id);
            o.selected = !o.selected;
        }
        this.props.onAnswer(quiz);
    }
    onClick(question,value){
        let quiz=JSON.parse(JSON.stringify(this.props.quiz));
        let q = quiz.questions.find(x => x.id===question.id);
        q.value = value;
        this.props.onAnswer(quiz);
    }
    render() {
        let questions = (this.props.quiz.questions) ?
            this.props.quiz.questions.slice(this.props.pager.index, this.props.pager.index + this.props.pager.size) : [];
            console.log("questionssssssss",this.props.quiz.questions[1])
            if(this.props.pager.count<10){
                
            }
        return (
            <div id="quiz">
                <h2 className="text-center font-weight-normal">{this.props.quiz.name}</h2>
                <hr />
                {questions.map(q =>
                    <div key={q.id}>
                        <div className="badge badge-info">Question {this.props.pager.index + 1} of {this.props.pager.count}.</div>
                        <h3 className="font-weight-normal">{this.props.pager.index + 1}. <span>{q.name}</span></h3>
                        {!!q.sub&&<input type="text" value={q.value||''} onChange={(event)=>this.onClick(q,event.target.value)}/>}
                        {!q.sub&&<div className="row text-left options">
                            {
                                q.options.map(option =>
                                    <div key={option.id} className="col-6">
                                        <div className="option">
                                            <label className="font-weight-normal" htmlFor={option.id}>
                                                <input id={option.id} checked={option.selected} type="checkbox" onChange={() => this.onAnswer(q, option)} />
                                                {option.name}
                                            </label>
                                        </div>
                                    </div>
                                )
                            }
                        </div>}
                        </div>
                        )}
                <hr />
                <div className="text-center">
                    {<button id="first" className="btn btn-default" onClick={this.move}>First</button>}
                    {<button id="prev" className="btn btn-default" onClick={this.move}>Prev</button>}
                { this.props.pager.index!==9  && <button id="next" className="btn btn-primary" onClick={this.move}>Next</button>}
                    <button id="last" className="btn btn-default" onClick={this.move}>Last</button>
                </div>
            </div >
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Questions);