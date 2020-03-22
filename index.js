const locais = require('./dados/locais.json');
const infoLocais = require('./dados/info-locais.json');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;
const apiKey = '41bd5d8a8433449c72ac1b3abf02f0ca';

const apiKeyValidator = function (req, res, next) {
  const apiKeyReq = req.query.apiKey;
  if (apiKey !== apiKeyReq) {
    res.status(401).json({ erro: 'API KEY incorreta.' });
  }
  next();
};

app.use(express.static('public'));
app.use(cors());
app.use(apiKeyValidator);

app.get('/api/locais', (req, res) => {
  res.json(locais);
});

app.get('/api/info-local/:latlng', function (req, res) {
  const latlng = req.params.latlng;
  const infoLocal = infoLocais.find(local => local.latlng === latlng);
  if (infoLocal) {
    res.json(infoLocal);
  } else {
    res.status(404).json({ erro: 'Local não encontrado para essa localização' });
  }
});

app.listen(port, () => console.log(`Servidor executando na porta ${port}.`));
