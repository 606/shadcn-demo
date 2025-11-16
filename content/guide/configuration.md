---
title: Configuration
description: How to configure Avro
---

# Configuration

Configure Avro to suit your needs.

## Config File

Create a file named `avro.config.js` in your project root:

```javascript
module.exports = {
  name: 'My Project',
  version: '1.0.0',
  settings: {
    debug: false,
    timeout: 5000
  }
};
```

## Environment Variables

You can also use environment variables:

```bash
export AVRO_DEBUG=true
export AVRO_TIMEOUT=5000
```

## Available Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| debug | boolean | false | Enable debug mode |
| timeout | number | 5000 | Request timeout in ms |
| retries | number | 3 | Number of retries |
