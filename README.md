# mixed-content-crawler [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> Find mixed content errors on a site by crawling it with Puppeteer

## Installation

```sh
$ npm install mixed-content-crawler
```

## CLI Demo

![mixed-content-crawler demo](https://raw.githubusercontent.com/busterc/mixed-content-crawler/76d2c596/demo.gif)

## CLI Usage

```sh
$ mixed-content-crawler

  Find mixed content errors on a site by crawling it with Puppeteer

  Usage

    $ mixed-content-crawler <url>

  Example

    $ mixed-content-crawler https://buster.neocities.org/crwlr/

$ mixed-content-crawler https://buster.neocities.org/crwlr/
resolved: 200 https://buster.neocities.org/crwlr/
resolved: 200 https://buster.neocities.org/crwlr/other.html
blocked-mixed-content: http://http.badssl.com/icons/icon-red.png
resolved: 200 https://buster.neocities.org/crwlr/mixed-content.html
resolved: 404 https://buster.neocities.org/crwlr/missing.html
requestfailed: https://buster.neocities.org/crwlr/dummy.pdf {"errorText":"net::ERR_ABORTED"}
```

## Module Usage

```js
const mixedContentCrawler = require('mixed-content-crawler');

const results = await mixedContentCrawler('https://buster.neocities.org/crwlr/');
results.forEach((mixedRequests, page) => {
  console.log(page);
  for (let r of mixedRequests) {
    console.log('->', r);
  }
});
// https://buster.neocities.org/crwlr/mixed-content.html
// -> http://http.badssl.com/icons/icon-red.png
```

## TODO

- [] Allow for ignoring `location.hash` when determinining unique URLs
- [] Better documentation

## License

ISC © [Buster Collings]()

[npm-image]: https://badge.fury.io/js/mixed-content-crawler.svg
[npm-url]: https://npmjs.org/package/mixed-content-crawler
[travis-image]: https://travis-ci.org/busterc/mixed-content-crawler.svg?branch=master
[travis-url]: https://travis-ci.org/busterc/mixed-content-crawler
[daviddm-image]: https://david-dm.org/busterc/mixed-content-crawler.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/busterc/mixed-content-crawler
[coveralls-image]: https://coveralls.io/repos/busterc/mixed-content-crawler/badge.svg
[coveralls-url]: https://coveralls.io/r/busterc/mixed-content-crawler
