const bodyParser = require('body-parser')
const express = require('express');
const {Translate} = require('@google-cloud/translate');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const projectId = 'avian-curve-217904';
const translate = new Translate({
  projectId: projectId,
});

app.post('/translate', (req, res) => {
  translate
  .translate(req.body.message, req.body.language)
  .then(results => {
    res.json({'message':req.body.message,'translation':results[0]});
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
})

const port = 4000;
app.listen(port, '0.0.0.0', () => {
  console.log(`listening on http://0.0.0.0:${port}`);
});