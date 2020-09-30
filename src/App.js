import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import Quiz from './components/Quiz';
import { connect } from 'react-redux';
import { ActionTypes } from './constants/actionTypes';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Review from './components/Review'; 
import LeaderBoard from './components/Leaderboard';
import Result from './components/Result';
import Questions from './components/Questions';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from 'react-router-scroll-top';

const mapStateToProps = state => { 
  console.log("----mapStateToProps----",state)
  return { ...state.quiz } };

const mapDispatchToProps = dispatch => ({
  onQuizLoad: payload =>
  {
  console.log("mapDispatchToProps,onQuizLoad");
  dispatch({ type: ActionTypes.QuizLoad, payload })
  },
  onPagerUpdate: payload => 
  {
  console.log("*****mapDispatchToProps, onPagerUpdate********",payload);
  dispatch({ type: ActionTypes.PagerUpdate, payload })
  }
});

class App extends Component {
  state = {
    quizes: [
      { id: 'data/javascript.json', name: 'Javascript' },
      { id: 'data/aspnet.json', name: 'Asp.Net' },
      { id: 'data/csharp.json', name: 'C Sharp' },
      { id: 'data/designPatterns.json', name: 'Design Patterns' },
      { id: 'data/hindi.json', name: 'Hindi' }
    ],
    quizId: 'data/javascript.json'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  }

  componentDidMount() {
    console.log("state quizId", this.state.quizId);
    this.load(this.state.quizId);
  }

  load(quizId) {
    let url = quizId || this.props.quizId;
    fetch(`../${url}`).then(res => res.json()).then(res => {
      let quiz = res;
      quiz.questions.forEach(q => {
        q.options.forEach(o => o.selected = false);
      });
      quiz.config = Object.assign(this.props.quiz.config || {}, quiz.config);
      this.pager.count = quiz.questions.length / this.pager.size;
      this.props.onQuizLoad(quiz);
      this.props.onPagerUpdate(this.pager);
    });
  }

  onChange = (e) => {
    this.setState({ quizId: e.target.value });
    console.log('----selected target value', e.target.value);
    this.load(e.target.value);
  }

  render() {
    return (
      
      <div className="container">
        <header className="p-2">
          <div className="row">
            <div className="col-6">
              <h3>Quiz Application</h3>
            </div>
            <div className="col-6 text-right">
              <label className="mr-1">Select Quiz:</label>
              <select onChange={this.onChange}>
                {this.state.quizes.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
              </select>
            </div>
          </div>
          
        </header>
       <ToastContainer autoClose={2500}/>
       
        <Router>
          
         {/* <Quiz quiz={this.state.quiz} quizId={this.state.quizId} mode={this.state.mode} /> */}
         <Quiz/>
            <Route exact path="/" component={Questions} />
            <Route exact path="/review" component={Review} />
            <Route exact path="/submit" component={Result} />
            <ScrollToTop>
            <Route exact path="/leaderboard" component={LeaderBoard}/>
            </ScrollToTop>
      </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
