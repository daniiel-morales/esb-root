module.exports = {
  namespace: 'esb-root',
  redis: {
    driver: 'redis',
    options: {
      host: 'redis',
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
