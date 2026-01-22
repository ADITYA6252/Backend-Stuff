const express = require('express');
const app =express();


app.set("view engine", "ejs")
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.render('index', {age: 22});
});

app.listen(3000);   