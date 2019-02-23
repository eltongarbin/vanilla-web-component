class RwRandomQuote extends HTMLElement {
  constructor() {
    super();
    this._quotes = [
      'All we have to decide is what ...',
      'Two things are infinite: the universe and human ...',
      'Try not to become a man of success...'
    ];
    this._$quote = null;
    this._interval = null;
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        .rw-container {
          width: 500px;
          margin: auto;
          border: dotted 1px #999;
          padding: 20px;
        }
        .rw-container h1 {
          font-size: 20px;
          margin: 0;
        }
      </style>
      <div class="rw-container">
        <h1>Random Quote:</h1>
        <p>"<span id="quote"></span>"</p>
      </div>
    `;
    this._$quote = this.querySelector('#quote');
    this._setInterval(this.getAttribute('interval'));
    this._render();
  }

  _render() {
    if (this._$quote !== null) {
      const index = Math.floor(Math.random() * this._quotes.length);
      this.setAttribute('current-index', index);
      this._$quote.innerHTML = this._quotes[index];
    }
  }

  _setInterval(value) {
    if (this._interval !== null) {
      clearInterval(this._interval);
    }

    if (value > 0) {
      this._interval = setInterval(() => this._render(), value);
    }
  }

  static get observedAttributes() {
    return ['interval'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._setInterval(newValue);
  }

  disconnectedCallback() {
    clearInterval(this._interval);
  }
}

window.customElements.define('rw-random-quote', RwRandomQuote);
