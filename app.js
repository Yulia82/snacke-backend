const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const { sequelize } = require('./dbconfig/db');
const playersRouter = require("./routes/api/players");

const PORT = process.env.PORT || 3080;

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const serverStart = async () => {
  try {
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
      console.log('Connection has been established successfully.');
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

serverStart();

app.use("/api/players", playersRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err
  res.status(status).json({ message })
})

module.exports = app;