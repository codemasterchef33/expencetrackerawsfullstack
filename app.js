const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const cors = require('cors');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./util/database');

app.use(bodyParser.json({ extended: false }));

app.use(cors());

const userRoutes = require('./routes/user');
const expenceRoutes = require('./routes/expence');
const purchaseRouter = require('./routes/purchase');
const premiumRouter = require('./routes/premium');
const passwardRouter = require('./routes/passward');
const errorController = require('./controllers/error');

const User = require('./models/user');
const Expence = require('./models/expence');
const Order = require('./models/order');
const ForgotPassward = require('./models/forgotPassward');
const Filedownloaded = require('./models/filedownloaded');


app.use(express.static(path.join(__dirname, 'frontend')));

app.use(helmet());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),{flag: 'a'}
);

app.use(morgan('combined', {stream: accessLogStream}));

app.use('/user', userRoutes);

app.use('/expence', expenceRoutes);

app.use('/purchase', purchaseRouter);

app.use('/premium', premiumRouter);

app.use('/passward' , passwardRouter);


app.use(errorController.get404);


User.hasMany(Expence);
Expence.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassward);
ForgotPassward.belongsTo(User);

User.hasMany(Filedownloaded);
Filedownloaded.belongsTo(User);

const port = process.env.PORT;

sequelize
  // .sync({force : true})
  .sync()
  .then(() => {
    console.log(`listening to the port:${port}`);
    app.listen(port);
  })
  .catch(err => console.log(err))

