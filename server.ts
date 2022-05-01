const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(express.static('dist/my-first-project'));

app.get('/',(req, res) => {
  res.sendFile(__dirname +'/dist/my-first-project/index.html');
})

app.get('/products',(req, res) => {
  res.sendFile(__dirname +'/dist/my-first-project/index.html');
})

app.get('/fetchProducts', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(data);
    }
  })
})

app.delete('/deleteProduct/:productId', (req, res) => {
  const id = req.params["productId"];
  fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      const arr = JSON.parse(data);
      const index = arr.findIndex(item => item.id === +id);
      arr.splice(index, 1);
      fs.writeFile('data.json', JSON.stringify(arr, null, 2), (err) => {
        if (err) {
          console.error(err)
          console.log(err.message);
        }
        res.send({ id: +id });
      })
    }
  })
})

app.post('/addProduct', (req, res) => {
  const product = req.body;
  fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      const arr = JSON.parse(data);
      product.id = arr.length ? arr[arr.length - 1].id + 1 : 1;
      arr.push(product);
      fs.writeFile('data.json', JSON.stringify(arr, null, 2), (err) => {
        if (err) {
          console.error(err)
          console.log(err.message);
        }
        res.send(product);
      })
    }
  })
})

app.put('/updateProduct/:productId', (req, res) => {
  const id = req.params["productId"];
  const data = req.body;
  const product = { ...data, id: +id };

  fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      const arr = JSON.parse(data);
      const index = arr.findIndex(item => item.id === +id);
      arr.splice(index, 1, product);
      fs.writeFile('data.json', JSON.stringify(arr, null, 2), (err) => {
        if (err) {
          console.error(err)
          console.log(err.message);
        }
        res.send(product);
      })
    }
  })
})

app.listen(3000);
console.log('Server is listening, port: 3000!');
