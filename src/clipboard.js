import select from 'select';

class Clipboard {
  copy(text, success, fail) {
    this.text = text;
    this.success = success;
    this.fail = fail;
    const isRTL = document.documentElement.getAttribute('dir') == 'rtl';

    this.removeFake();

    this.fakeHandlerCallback = () => this.removeFake();
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
    let yPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.fakeElem.style.top = yPosition + 'px';

    this.fakeElem.setAttribute('readonly', '');
    this.fakeElem.value = this.text;

    document.body.appendChild(this.fakeElem);

    this.selectedText = select(this.fakeElem);

    this.copyText();
  }

  copyText() {
    let succeeded;

    try {
      succeeded = document.execCommand('copy');
    }
    catch (err) {
      succeeded = false;
    }

    if (succeeded) {
      this.success && this.success(this.text);
    } else {
      this.fail && this.fail();
    }
  }

  removeFake() {
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

  destroy() {
    this.removeFake();
  }
}
const clipboard = new Clipboard();
export default clipboard;