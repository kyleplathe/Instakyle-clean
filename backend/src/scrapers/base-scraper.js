import puppeteer from 'puppeteer';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export class BaseScraper {
  constructor(vendorName) {
    this.vendorName = vendorName;
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
  }

  async login(username, password) {
    throw new Error('Login method must be implemented by vendor-specific scraper');
  }

  async searchPart(partNumber) {
    throw new Error('Search method must be implemented by vendor-specific scraper');
  }

  async getPartDetails(partNumber) {
    throw new Error('GetPartDetails method must be implemented by vendor-specific scraper');
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async handleError(error, context) {
    logger.error({
      message: `Error in ${this.vendorName} scraper`,
      context,
      error: error.message,
      stack: error.stack
    });
  }
} 