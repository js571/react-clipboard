# react-clipboard2

Component to allow the user to easily copy text.

## Install

```bash
npm install react-clipboard2 --save
```

## Usage

```js
var React = require("react");
var ReactDOM = require("react-dom");
var Clipboard = require("react-clipboard2");

var App = React.createClass({

  render: function() {
    return (
      <div>
        <Clipboard  onFail={handleFail.bind(this)}  onCopy={handleCopy.bind(this)} text="this text will be copyed">
            <button>Click here to copy</button>
        </Clipboard>
      </div>
    );
  },

  handleCopy : function(text) {
    alert("copied: " + text);
  }

  handleFail: function () {
    alert('failed');
  }

});

ReactDOM.render(
  <App />,
  document.querySelector("#app")
);
```