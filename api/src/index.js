import app from './app';
import database from './database'

app.listen(app.get('port'));
console.log("Server on port", app.get('port'));