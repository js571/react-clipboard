'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _select = require('select');

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clipboard = function () {
  function Clipboard() {
    _classCallCheck(this, Clipboard);
  }

  _createClass(Clipboard, [{
    key: 'copy',
    value: function copy(text, success, fail) {
      var _this = this;

      this.text = text;
      this.success = success;
      this.fail = fail;
      var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

      this.removeFake();

      this.fakeHandlerCallback = function () {
        return _this.removeFake();
      };
      this.fakeHandler = document.body.addEventListener('click', this.fakeHandlerCallback) || true;

      this.fakeElem = document.createElement('textarea');
      // Prevent zooming on iOS
      this.fakeElem.style.fontSize = '12pt';
      // Reset box model
      this.fakeElem.style.border = '0';
      this.fakeElem.style.padding = '0';
      this.fakeElem.style.margin = '0';
      // Move element out of screen horizontally
      this.fakeElem.style.position = 'absolute';
      this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
      // Move element to the same position vertically
      var yPosition = window.pageYOffset || document.documentElement.scrollTop;
      this.fakeElem.style.top = yPosition + 'px';

      this.fakeElem.setAttribute('readonly', '');
      this.fakeElem.value = this.text;

      document.body.appendChild(this.fakeElem);

      this.selectedText = (0, _select2.default)(this.fakeElem);

      this.copyText();
    }
  }, {
    key: 'copyText',
    value: function copyText() {
      var succeeded = void 0;

      try {
        succeeded = document.execCommand('copy');
      } catch (err) {
        succeeded = false;
      }

      if (succeeded) {
        this.success && this.success(this.text);
      } else {
        this.fail && this.fail();
      }
    }
  }, {
    key: 'removeFake',
    value: function removeFake() {
      if (this.fakeHandler) {
        document.body.removeEventListener('click', this.fakeHandlerCallback);
        this.fakeHandler = null;
        this.fakeHandlerCallback = null;
      }

      if (this.fakeElem) {
        document.body.removeChild(this.fakeElem);
        this.fakeElem = null;
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.removeFake();
    }
  }]);

  return Clipboard;
}();

var clipboard = new Clipboard();
exports.default = clipboard;