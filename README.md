# sp-winston-express

## Deprecated

## Usage

```javascript
var log = require('sp-winston-express');
// At end of chain to do exception handling add
app.use(log.errorLogger);

// Otherwise use like winston with things like:
log.info('hi');
```
