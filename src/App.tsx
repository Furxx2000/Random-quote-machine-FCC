import React from 'react';
import './App.scss';

interface QuoteProps {
  quotesData: object[];
  quote: string;
  author: string;
  url: string;
  colors: string[];
  color: string;
  animation: boolean;
}

class App extends React.Component<{}, QuoteProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      quotesData: [],
      quote: '',
      author: '',
      url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
      colors: [
        '#16a085',
        '#27ae60',
        '#2c3e50',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#FB6964',
        '#342224',
        '#472E32',
        '#BDBB99',
        '#77B1A9',
        '#73A857',
      ],
      color: '',
      animation: false,
    };
    this.getQuote = this.getQuote.bind(this);
    this.fetchQuote = this.fetchQuote.bind(this);
    this.animation = this.animation.bind(this);
    this.removeAnimation = this.removeAnimation.bind(this);
  }

  async componentDidMount() {
    await this.fetchQuote();
    this.animation();
  }

  async fetchQuote() {
    const res = await fetch(this.state.url);
    const data = await res.json();
    const randomQuote = this.getRandomQuote(data.quotes);
    this.setState({
      quotesData: data.quotes,
      quote: randomQuote.quote,
      author: randomQuote.author,
    });
  }

  getRandomQuote(quotes: any) {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  getQuote() {
    const randomQuote = this.getRandomQuote(this.state.quotesData);
    this.setState({
      quote: randomQuote.quote,
      author: randomQuote.author,
    });
    this.animation();
  }

  animation() {
    const color = Math.floor(Math.random() * this.state.colors.length);
    document.body.style.backgroundColor = this.state.colors[color];
    document.body.style.color = this.state.colors[color];

    this.setState((state) => ({
      color: state.colors[color],
      animation: true,
    }));
    this.removeAnimation();
  }

  removeAnimation() {
    setTimeout(() => {
      this.setState({
        animation: false,
      });
    }, 1000);
  }

  render() {
    return (
      <div id='wrapper'>
        <article id='quote-box'>
          <p id='text' className={this.state.animation ? 'fade-animation' : ''}>
            <i className='fa fa-quote-left'></i>
            {this.state.quote}
          </p>
          <p
            id='author'
            className={this.state.animation ? 'fade-animation' : ''}
          >
            {this.state.author}
          </p>
          <section id='buttons'>
            <div className='social-btns'>
              <a
                id='tweet-quote'
                href='twitter.com/intent/tweet'
                style={{ backgroundColor: `${this.state.color}` }}
                className='button'
                title='Tweet this quote!'
                target='_blank'
              >
                <i className='fa-brands fa-twitter'></i>
                <span className='sr-only'>Tweet this quote!</span>
              </a>
              <a
                id='tumblr-quote'
                style={{ backgroundColor: `${this.state.color}` }}
                className='button'
                title='Post this quote on thumblr!'
                target='_blank'
              >
                <i className='fa-brands fa-tumblr'></i>
                <span className='sr-only'>Post this quote on thumblr!</span>
              </a>
            </div>
            <button
              id='new-quote'
              type='button'
              onClick={this.getQuote}
              style={{ backgroundColor: `${this.state.color}` }}
            >
              New quote
            </button>
          </section>
        </article>
        <footer>by Danny</footer>
      </div>
    );
  }
}

export default App;
