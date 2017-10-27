const { NODE_ENV = 'development' } = process.env
const __PROD__ = NODE_ENV === 'production'

module.exports = {
  comments: !__PROD__,
  compact: __PROD__,
  ignore: NODE_ENV === 'test' ? undefined : [ /\.spec\.js$/ ],
  presets: [
    [
      'env',
      {
        debug: true,
        loose: true,
        targets: {
          browsers: '> 2%',
          node: __PROD__ ? '6' : 'current'
        },
        useBuiltIns: 'usage'
      }
    ]
  ]
}
