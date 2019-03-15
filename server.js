const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const proxy = require('http-proxy-middleware');
require('newrelic');

console.log(path.join(__dirname, 'public'));

app.use(morgan('dev'));

app.use('/shopping/:itemId/', express.static(`${__dirname}/public`));
app.use('/', express.static(`${__dirname}/loaderio`));


// Product Options
app.use(
  '/products/:itemId',
  proxy({
    target:'http://18.212.13.97:3001/',
    changeOrigin: true
  })
);

app.use(
  '/variants/:itemId',
  proxy({
    target:'http://18.212.13.97:3001/',
    changeOrigin: true
  })
);

app.use(
  '/products',
  proxy({
    target:'http://18.212.13.97:3001/',
    changeOrigin: true
  })
);

// Related Items and Size Chart

app.use(
  '/delete/:id',
  proxy({
    target:'http://18.224.184.136:3008',
    changeOrigin: true
  })
);

app.use(
  '/update/:id',
  proxy({
    target:'http://18.224.184.136:3008',
    changeOrigin: true
  })
);

app.use(
  '/post',
  proxy({
    target:'http://18.224.184.136:3008',
    changeOrigin: true
  })
);

app.use(
  '/api/sizechart',
  proxy({
    target:'http://18.224.184.136:3008',
    changeOrigin: true
  })
);

app.use(
  '/api/pavs/:id',
  proxy({
    target:'http://18.224.184.136:3008/',
    changeOrigin: true
  })
);

// Reviews

app.use(
  '/reviews/:itemId',
  proxy({
    target:'http://18.188.163.54:3003',
    changeOrigin: true
  })
);

app.use(
  '/items/:itemId',
  proxy({
    target:'http://52.15.132.177:3004',
    changeOrigin: true
  })
);

app.use(
  '/reviews/helpful/:reviewId',
  proxy({
    target:'http://52.15.132.177:3004',
    changeOrigin: true
  })
);

app.use(
  '/reviews/notHelpful/:reviewId',
  proxy({
    target:'http://52.15.132.177:3004',
    changeOrigin: true
  })
);

app.use(
  '/reviews/flag/:reviewId',
  proxy({
    target:'http://52.15.132.177:3004',
    changeOrigin: true
  })
);

app.use(
  '/reviews/',
  proxy({
    target:'http://52.15.132.177:3004',
    changeOrigin: true
  })
);


app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
