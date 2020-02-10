module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'url-loader?name=project/frontend/src/images/[name].[ext]',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ]
    }
  };