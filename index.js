const app = require('./app');
const port = process.env.port || 3000;
app.listen(port, _ => {
    console.log(`Express app online at port ${port}.`);
});