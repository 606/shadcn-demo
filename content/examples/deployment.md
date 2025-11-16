---
title: Deployment
description: Deploy Avro applications to production
---

# Deployment

Guide for deploying Avro applications to production environments.

## Before Deployment

### Environment Setup

Create a `.env` file with production settings:

```bash
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
DATABASE_URL=postgresql://user:pass@db.example.com/prod
API_KEY=your-secret-key
```

### Build Optimization

```javascript
// next.config.ts
export const nextConfig = {
  output: 'export',
  productionBrowserSourceMaps: false,
  swcMinify: true,
};
```

## Deployment Platforms

### Vercel

```bash
npm install -g vercel
vercel deploy
```

### Heroku

```bash
heroku create your-app-name
git push heroku main
```

### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t avro-app .
docker run -p 3000:3000 avro-app
```

## Performance Tuning

### Enable Caching

```javascript
avro.cache.enable({
  ttl: 3600, // 1 hour
  maxSize: 1000
});
```

### Enable Compression

```javascript
avro.use(compression());
```

### Database Optimization

- Use connection pooling
- Add indexes to frequently queried columns
- Implement query caching

## Monitoring

### Logging

```javascript
avro.on('error', (error) => {
  logger.error('Avro error:', error);
});

avro.on('warning', (warning) => {
  logger.warn('Avro warning:', warning);
});
```

### Health Checks

```javascript
avro.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date()
  });
});
```

## Security

- Always use HTTPS in production
- Set secure headers
- Implement rate limiting
- Validate all inputs
- Use environment variables for secrets
