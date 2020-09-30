import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';


class InputButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            showSuccess: false,
            error: {},
            isValid: false,
            savebtn: true

        }
    }
  validate = target => {
        let id = target.id;
        let value = target.value;
        let type = target.type;
        console.log("*****type****",this.type);
        let error = {};
        if (type === "text") {
            if (validator.isEmpty(value)) {
                let errorText = "This field cannot be blank";
                if (error[id])
                    error[id].push(errorText);
                else
                    error[id] = [errorText]
            }
        } else if (type === "email") {
            if (validator.isEmpty(value)) {
                let errorText = "This field cannot be blank";
                if (error[id])
                    error[id].push(errorText);
                else
                    error[id] = [errorText]
            }
            else if (!validator.isEmail(value)) {
                let errorText = "Please enter valid email";
                if (error[id])
                    error[id].push(errorText);
                else
                    error[id] = [errorText]
            }
        }
        console.log("*******generated error", error)
        let newError = Object.assign({}, this.state.error);
        console.log("******newError", newError)
        if (error[id]) {
            newError[id] = error[id];
            console.log("*************newError[id]", newError[id]);
        }
        else {
            delete newError[id]
            console.log("*************newError[id]...not error[id]", newError[id]);
        }

        this.setState(prevState => {
            console.log("***********isValid", this.state.isValid);
            return {
                ...prevState,
                // error: {
                //     ...prevState.error,
                //     [id]: error[[id]]
                // }
                error: newError,
                isValid: Object.keys(newError).length === 0

            }
        })
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        this.validate(e.target);
    };
    
    onSubmit = e => {
        e.preventDefault();
        console.log('***error***********', this.state.error);
        
        if (Object.keys(this.state.error).length > 0)

            return;
        
        const newArray = {
            name: this.state.name,
            email: this.state.email,
            score: this.props.total,
            maxscore: this.props.length,
            time: new Date().toLocaleString()
        };
        let prevData = localStorage.getItem("leaders");
        let leaders = [];
        if (prevData) {
            leaders = JSON.parse(prevData);
        }
        leaders.push(newArray);
        localStorage.setItem('leaders', JSON.stringify(leaders));
        this.setState({
            showSuccess: true,

        });
        if (leaders) {
            this.showButton();
            toast.info("Submitted Successfully", {
                onClose: () => {
                    this.props.history.push('/leaderboard')
                }
            })

        }
    }

    showButton = () => {
    this.setState({
                name: '',
                email: '',
    
        })
    }

    render() {
     return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Enter your name:-</label><br />
                        <input type="text" onChange={this.onChange}
                            name="name" id="name"
                            size="30" placeholder="Enter your Name..."
                            value={this.state.name} /><br />
                        <div className='table1'>
                            {
                                this.state.error["name"] && this.state.error["name"].map((errorText, index) =>
                                    <div key={index} >{errorText}</div>
                                )
                            }
                        </div>
                        <label>Enter your Email:-</label><br />
                        <input type="email" onChange={this.onChange}
                            name="email" id="email"
                            size="30" placeholder="Enter your Email ..."
                            value={this.state.email} />
                        <div className='table1'>
                            {
                                this.state.error["email"] && this.state.error["email"].map((errorText, index) =>
                                    <div key={index} >{errorText}</div>
                                )
                            }
                        </div>
                       
                      <div className="text-center font-weight-normal">
                            <button type="submit" disabled={!((this.state.name && this.state.email ) && !(!this.state.isValid && this.state.savebtn))} className="btn btn-info" >Save</button >
                            {!!this.state.showSuccess && <div className="text-center font-weight-normal" >"Submitted Successfully "</div>}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default withRouter(InputButton);