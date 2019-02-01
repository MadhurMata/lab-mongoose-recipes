const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    //Drop database
    return Recipe.deleteMany({});
    console.log('Connected to Mongo!');
  })
  .then(() => {
    return Recipe.create({
      title: "Carbonara",
      level:'Easy Peasy', 
      ingredients: ['pasta','sauce'],
      cuisine: 'Italian',
      dishType:'Dessert',
      duration: 30,
      creator: 'Madhur & Ranieri',
    })
  })
  .then(recipe => {
    console.log(recipe.title)
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((recipes) => {
    for(let i = 0; i < recipes.length; i++){
      console.log(recipes[i].title);
    }
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'},{duration: 100});
  })
  .then(() => {
    console.log('Updated Rigatoni alla Genovese')
  })
  .then(() => {
    return Recipe.findOneAndRemove({title: "Carrot Cake"})
  })
  .then(() => {
    console.log('Removed Carrot Cake')
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

  //Schema 
  const recipeSchema = new Schema ({
    title: String,
    level:{
      enum:['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] 
    }, 
    ingredients: [],
    cuisine: String,
    dishType:{
      enum:['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
    },
    image: {
      type: String,
      default: 'https://images.media-allrecipes.com/images/75131.jpg'
    },
    duration: {
      type: Number,
      min: 0
    },
    creator: String,
    created: {
      type: Date,
      default: Date.now
    }
  });

  //Passing Schema to the Model
  const Recipe = mongoose.model('Recipe', recipeSchema);

  //Create
  //Recipe.create({
  //  title: "Carbonara",
  //  level:'Easy Peasy', 
  //  ingredients: ['pasta','sauce'],
  //  cuisine: 'Italian',
  //  dishType:'Dessert',
  //  duration: 30,
  //  creator: 'Madhur & Ranieri',
  //}).then(recipe => {
  //  console.log(recipe.title)
  //}).catch( err => {
  //  console.log(err);
  //});
  
  ///Recipe.insertMany(data).then()