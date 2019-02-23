class RwPoll extends HTMLElement {
  constructor() {
    super();
    this._attached = false;
    this._data = null;
    this._selected = null;

    // Elements
    this._$question = null;
    this._$answers = null;

    this._root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._attached = true;
    this._root.innerHTML = `
      <style>
        .rw-poll-container #question {
          background-color: gray;
          color: white;
          line-height: 2;
          margin-bottom: 0;
          text-indent: 10px;
        }

        .rw-poll-container #answers {
          list-style-type: none;
          margin: 0;
          padding: 0;
          cursor: pointer;
        }

        .rw-poll-container #answers li {
          padding: 10px;
          background-color: #eee;
          border-bottom: 1px solid grey;
        }

        .rw-poll-container #answers :last-child {
          border: none;
        }

        .rw-poll-container #answers li:hover {
          background-color: #d3d3d3;
        }

        .rw-poll-container #answers li.selected {
          background-color: green;
          color: white;
        }
      </style>
      <div class="rw-poll-container">
        <h3 id="question"></h3>
        <ul id="answers"></ul>
      </div>
    `;
    this._$question = this._root.querySelector('#question');
    this._$answers = this._root.querySelector('#answers');
    this._$answers.addEventListener('click', (event) => {
      this._$answers.querySelectorAll('li').forEach(($li, index) => {
        if ($li === event.target) {
          this.selected = index;
        }
      });
    });
    this._render();
  }

  _render() {
    if (this._attached && this._data !== null) {
      this._$answers.innerHTML = '';
      this._$question.innerHTML = this._data.question;
      this._data.answers.forEach((answer) => {
        const $li = document.createElement('li');
        $li.innerHTML = answer;
        this._$answers.appendChild($li);
      });
    }
  }

  set data(data) {
    if (this._data === data) return;
    this._data = data;
    this._render();
  }

  get data() {
    return this._data;
  }

  set selected(index) {
    const $answers = this._$answers.querySelector(`li:nth-child(${index + 1})`);
    if ($answers !== null) {
      this._$answers.querySelectorAll('li').forEach(($li) => {
        $li.classList.remove('selected');
      });
      $answers.classList.add('selected');
      this._selected = index;
    }
  }

  get selected() {
    return this._selected;
  }
}

window.customElements.define('rw-poll', RwPoll);
