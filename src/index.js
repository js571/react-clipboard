import React, {PropTypes} from 'react';
import clipboard from './clipboard';

const ReactClipBoard = React.createClass({

  propTypes: {
    text: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    onCopy: PropTypes.func,
    onFail: PropTypes.func
  },

  onClick(event) {
    const {text, onCopy, onFail} = this.props;
    clipboard.copy(text, function(str){
      onCopy && onCopy(str);
    }, function () {
      onFail && onFail();
    });
  },

  componentWillUnmount () {
    clipboard.destroy();
  },
  
  render () {
    const {
      text: _text,
      onCopy: _onCopy,
      onFail, _onFail,
      options: _options,
      children,
      ...props
    } = this.props;
    const elem = React.Children.only(children);

    return React.cloneElement(elem, {...props, onClick: this.onClick});
  }
});

export default ReactClipBoard;

