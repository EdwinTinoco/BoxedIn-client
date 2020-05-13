import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class topDealsByEmail extends Component {
    // constructor() {
    //     super()

    //     this.state = {
    //         email: ""
    //     }

    //     this.handleChange = this.handleChange.bind(this);
    //     // this.handleSubmit = this.handleSubmit.bind(this);
    // }

    // handleChange(event) {
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     });
    // }

    render() {
        return (
            <div className="deals-email-wrapper">
                <p>Get the latest deals and more.</p>
                {/* <div className="left-column">
                    

                    <form className="deals-email-form">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />

                        <button className="btn" type="submit">Send</button>
                    </form>
                </div> */}

                <div className="right-colum">
                    <FontAwesomeIcon className="box-icon" icon="box" />
                    <div className="boxedin-learn-more">
                        <p className="boxedin">BoxedIn App</p>
                        {/* <p className="learn-more">Learn more></p> */}
                    </div>
                </div>
            </div>
        )
    }
}