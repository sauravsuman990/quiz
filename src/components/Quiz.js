import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
class Quiz extends Component {
    render() {
        return (
            <div>
                    <div>
                        <hr />
                        <Link to="/" className="btn btn-info" >Quiz</Link>
                        <Link to="/review" className="btn btn-info" >Review</Link>
                        <Link to="/submit" className="btn btn-warning">Submit</Link >
                        <Link to="leaderboard" className="btn btn-primary">Leaderboard</Link>
                        

                    </div >
            </div>
        )
    }
}
export default Quiz;