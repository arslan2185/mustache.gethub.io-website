const express = require('express');
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const port = 80;

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect("mongodb://localhost:27017/contactmusta");
}

const contactSchema = new mongoose.Schema({
	name: String,
	phone: String,
	email: String,
	address: String,
	more: String
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact; 
app.use('/static', express.static("static"));
app.use(express.urlencoded({extended: true}));

app.set('views engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req, res)=>{
	res.status(200).render("home.pug");
});
app.get('/about',(req, res)=>{
	res.status(200).render("about.pug");
});
app.get('/gallery',(req, res)=>{
	res.status(200).render("gallery.pug");
});
app.get('/blog',(req, res)=>{
	res.status(200).render("blog.pug");
});
app.get('/contact', (req, res)=>{
	res.status(200).render('contact.pug');
});
app.post('/contact', (req,res)=>{
	const myData = new Contact(req.body);
	console.log(req.body);
	myData.save().then(()=>{
		res.send("This item has been saved to the database");
	}).catch(()=>{
		res.status(400).send("Item was not saved to the database")
	})
	//  res.status(200).render('contact.pug');
})

app.listen(port, ()=>{
	console.log(`This is run by scuress the ${port}`);
});

