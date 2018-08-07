const assert = require('assert');
const mixedContentCrawler = require('../index.js');

describe('mixedContentCrawler', () => {
  it(
    'works',
    async () => {
      console.log = () => {};
      let site = 'https://buster.neocities.org/crwlr/';
      let results = await mixedContentCrawler(site);
      assert(results.size === 1, 'Should have found 1 and only 1 mixed content issue');
    },
    30000
  );
});
