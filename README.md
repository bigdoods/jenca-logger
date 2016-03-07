[![Build Status](https://travis-ci.org/jenca-cloud/jenca-logger.svg?branch=master)](https://travis-ci.org/jenca-cloud/jenca-logger)

# jenca-logger

A syslogd type service for jenca

## Development

Clone jenca-cloud repo and follow the readme for vagrant and jencactl to install this service image.

## CLI

For development and testing, within jenca-logger directory run:
```bash
$ SLACK_USERNAME="Jenca Logger" SLACK_URL="https://hooks.slack.com/services/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" npm test
```

The environment variables are setup in travis for CI to work.
