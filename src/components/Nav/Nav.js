
import React from "react";
import "./Nav.css";

const Nav = props => (
    <div className="nav nav-pills row">

            <div className="col-md-2">
                <h1>WHO'S Who?</h1>
            </div>
            <div className="col-md-7">
                {props.message}
            </div>
            <div className="col-md-3 score-box">
                Score: <span style={{ color: "yellow" }}>{props.curScore}</span> | Top Score: {props.topScore}
            </div>

    </div>
);

export default Nav;
