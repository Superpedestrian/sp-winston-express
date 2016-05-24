# sp-winston-express

## Deprecated

## Usage

```javascript
var log = require('sp-winston-express');
// To use with morgan as log stream:
app.use(morgan('combined', {stream: log.stream}));

// At end of chain to do exception handling add
app.use(log.errorLogger);

// Otherwise use like winston with things like:
log.info('Hi');
log.error('Bad things!');
```
