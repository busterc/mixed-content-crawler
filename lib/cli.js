#!/usr/bin/env node
'use strict';

const meow = require('meow');
const mixedContentCrawler = require('./');

const cli = meow(
  `
Usage

  $ mixed-content-crawler <url>

Example

  $ mixed-content-crawler https://buster.neocities.org/crwlr/

`,
  {
    flags: {
      help: {
        alias: 'h'
      },
      version: {
        alias: 'v'
      }
    }
  }
);

(async () => {
  if (cli.input.length === 0) {
    return cli.showHelp(1);
  }

  await mixedContentCrawler(cli.input[0]);
})();
