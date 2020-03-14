module.exports = {
  namespace: 'esb-root',
  redis: {
    driver: 'redis',
    options: {
      host: '127.0.0.1',
      port: 6379
    }
  },
  log: {
    enabled: false,
    options: {
      level: 'trace'
    }
  }
}
