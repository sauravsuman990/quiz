import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionTypes } from '../constants/actionTypes'; 

class Review extends Component {
     move = (e) =>{ 
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
            else index = parseInt(e.target.id, 10); 
            if (index >= 0 && index < this.props.pager.count) { 
                let pager = { index: index, 
                    size: 1,
                     count: this.props.pager.count
                     }; 
                     this.props.onPagerUpdate(pager); 
                    }
                 }

    isAnswered = (q) => {
        console.log("----------q-------",q);
        return q.options.some(x => x.selected || q.value) ? 'Answered' : 'Not Answered';
        //.some gives true or false
    }

    render() {
        return <div>
            <h2 className="text-center font-weight-normal">Review Quiz: {this.props.quiz.name}</h2>
            <hr />
            <div className="row text-center">
                {this.props.quiz.questions.map((q, index) =>
                    <div key={q.id} className="col-4 cursor-pointer">
                        <div id={index} onClick={this.props.move} className={`p-3 mb-2 ${this.isAnswered(q) === 'Answered' ? 'bg-info' : 'bg-warning'}`}>{index + 1}. {this.isAnswered(q)}</div>
                    </div>
                )}
            </div>
            
        </div >
    }
}
const mapStateToProps = state => { return { ...state.quiz, ...state.mode, ...state.pager } };
const mapDispatchToProps = dispatch => ({
    onSubmit: payload => dispatch({ type: ActionTypes.QuizSubmit, payload }),
    onPagerUpdate: payload => dispatch({ type: ActionTypes.PagerUpdate, payload })
});
export default  connect(mapStateToProps, mapDispatchToProps)(Review);
