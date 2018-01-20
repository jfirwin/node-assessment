const app = require('express')();
const bodyParser = require('body-parser');
const userController = require('./usersCtrl.js');
const port = 3000;

app.use(bodyParser.json());
app.use(`/api`, userController(app));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
