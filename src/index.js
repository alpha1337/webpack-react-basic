// Dependencies
import React from "react";
import ReactDOM from "react-dom";

// Import CSS
import "./styles/index.scss";

const AppContainer = document.getElementById('container');

class Content extends React.Component {
    render() {
        return (
            <div>
                <h1>Basic Webpack Setup</h1>
            </div>
        );
    }
}

ReactDOM.render(
    <Content />,
    AppContainer
);