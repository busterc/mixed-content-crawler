'use strict';

const crwlr = require('crwlr');
const puppeteer = require('puppeteer');
const chalk = require('chalk');

const _options = {
  launch: {
    headless: true
  }
};

module.exports = async (site, options) => {
  options = Object.assign({}, _options, options);
  let results = new Map();

  return (async () => {
    const browser = await puppeteer.launch(options.launch);

    const pageOptions = {
      resolved: async (response, page) => {
        let locationHref = await page.evaluate('location.href');
        let status = String(response.status());
        status = status.match(/^2/)
          ? chalk.bgBlack.green(status)
          : chalk.bgYellow.black(status);
        console.log('resolved:', status, locationHref);
      },
      prepare: async newPage => {
        await newPage.setRequestInterception(true);
        await newPage.setBypassCSP(true);

        // Console.log('page._client', newPage._client);
        await newPage._client.send('Page.setDownloadBehavior', {
          behavior: 'allow',
          downloadPath: '/dev/null'
        });

        newPage.on('request', request => {
          if (request.url().match(/^http:/)) {
            let content = results.get(newPage.url()) || [];
            content.push(request.url());
            results.set(newPage.url(), content);
            request.notHTTPS = true;
            return request.abort();
          }
          request.continue();
        });

        newPage.on('requestfailed', request => {
          if (request.notHTTPS) {
            return console.log(
              chalk.bgBlack.red('blocked-mixed-content:'),
              request.url()
            );
          }
          console.log(
            chalk.bgRed.white('requestfailed:'),
            request.url(),
            chalk.bgBlack.red(JSON.stringify(request.failure()))
          );
        });
      },
      goto: {
        waitUntil: 'networkidle2'
      }
    };

    await crwlr(browser, site, pageOptions);
    return results;
  })();
};
