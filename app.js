//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const day = new Date().getFullYear()

//connecting mongoose with database
mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', {useNewUrlParser : true});

//Mongoose schema
const itemsSchema = {
  name:String
}

//Mongoose model
const Item = mongoose.model("Item",itemsSchema)

//mongoose document
const item1 = new Item({
  name:"welcome to your todolist!"
})

const item2 = new Item({
  name:"Hit the + buttom to add a new item."
})

const item3  = new Item({
  name: "<--Hit this to delete an item."
})

const defaultItems = [item1,item2,item3 ];


app.get("/",function(req,res){
  Item.find({}).then(function(foundItems){
    if(foundItems.length == 0){
      
  Item.insertMany(defaultItems).then(function () {
    console.log("Successfully saved defult items to DB");
})

   .catch(function (err) {
     console.log(err);
});
res.redirect("/")
    }else{
  res.render("list",{listTitle:day,newListItems:foundItems})
    }
  })
  .catch(function(err){
    console.log(err);
  })
})


app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName
  });
  item.save();
  res.redirect("/")

});

app.post("/delete",function(req,res){
  
  const checkedItemId = req.body.checkbox;
  console.log(checkedItemId)
  Item.findByIdAndDelete(checkedItemId)
  .then(function(){
    console.log("deleted item");
    })
  .catch(function(err){
    console.log(err);
    });
  res.redirect("/");
})
  









app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
