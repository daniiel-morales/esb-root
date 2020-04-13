module.exports = {
  namespace: 'esb-root',
  redis: {
    driver: 'redis',
    options: {
      host: 'localhost',
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
