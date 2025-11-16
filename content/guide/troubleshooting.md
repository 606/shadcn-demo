---
title: Troubleshooting
description: Common issues and solutions
---

# Troubleshooting

## Common Issues

### Connection Timeout

**Problem:** `Error: Connection timeout`

**Solution:**
```bash
# Check your network connection
ping example.com

# Increase timeout in config
export AVRO_TIMEOUT=10000
```

### Module Not Found

**Problem:** `Error: Cannot find module 'avro'`

**Solution:**
```bash
# Reinstall the package
npm install avro --save

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Permission Denied

**Problem:** `Error: EACCES: permission denied`

**Solution:**
```bash
# Fix npm permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

## Debug Mode

Enable debug logging:

```bash
export AVRO_DEBUG=true
npm start
```

This will output detailed logs to help diagnose issues.

## Getting Help

If you can't find a solution:

1. Check the [API Reference](../api/reference.md)
2. Review [Examples](../examples/basic.md)
3. Open an issue on GitHub
