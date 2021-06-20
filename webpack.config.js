const config = (env) => {
  if (env === 'development' || env === 'production') {
    console.log('Building ' + env + ' environment...')
    return require('./webpack/' + env + '.js');
  } else {
    console.log("Wrong webpack build parameter. Possible choices: 'development' or 'production'.")
  }
}

module.exports = config;