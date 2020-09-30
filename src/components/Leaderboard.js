import React, { Component } from 'react';
import { Table } from "react-bootstrap";


class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        let prevData = localStorage.getItem("leaders");
        let emptyArray = [];
        if(prevData){
            emptyArray = JSON.parse(prevData);
         }
         this.state.leaders = emptyArray;
    }
    render() {
        return (
            <div>
          
                <h2 className="text-center font-weight-normal">LEADERBOARD</h2>
                <hr />
                <div className="col-12 cursor-pointer">
                    <Table striped bordered hover>
                        <thead responsive="lg">
                            <tr >
                                <th>Name</th>
                                <th>Email</th>
                                <th>Score</th>
                                <th>Max Score</th>
                                <th>Date-Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.leaders.reverse().map((l,index) => {
                               return  <tr key ={index}>
                                    <td>{l.name}</td>
                                    <td>{l.email}</td>
                                    <td>{l.score}</td>
                                    <td>{l.maxscore}</td>
                                    <td>{l.time}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </div >
            </div>
        )
    }
}
export default Leaderboard;