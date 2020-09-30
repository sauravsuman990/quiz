import {
    ActionTypes
} from '../constants/actionTypes';

let initialQuiz = {
    quiz: {
        config: {
            'allowBack': true,
            'allowReview': true,
            'autoMove': false,  // if true, it will move to next question automatically when answered.
            'duration': 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
            'pageSize': 1,
            'requiredAll': false,  // indicates if you must answer all the questions before submitting.
            'richText': false,
            'shuffleQuestions': false,
            'shuffleOptions': false,
            'showClock': false,
            'showPager': true,
            'theme': 'none'
        },
        questions: []
    },
    mode: 'quiz',
    counter:{
        value1: 0,
        Result: 0
    },
    
    pager: {
        index: 0,
        size: 1,
        count: 1
    }
}

export default (state = { ...initialQuiz }, action) => {
    switch (action.type) {
        case ActionTypes.PagerUpdate:
            console.log('quiz.js Pagerupdated')
            return {
                ...state, pager: action.payload, mode: 'quiz'
            }
        case ActionTypes.QuizLoad:
            console.log('quiz.js quizload')
            return {
                ...state, quiz: action.payload     
            }

        case ActionTypes.QuizSubmit:
            console.log('quiz.js Submitted.');
            return {
                ...state, mode: action.payload, 
            }
        case ActionTypes.QuizAnswer:
            console.log('quiz.js reducer Quiz Answer called.');
            return {
                ...state, quiz: action.payload
            }
        case ActionTypes.EmailUpdate:
            return{
                ...state, quiz: action.payload
            }
        default:
            return state;
    }
};
