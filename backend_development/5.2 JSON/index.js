import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

//Step 1: Run the solution.js file without looking at the code.
//Step 2: You can go to the recipe.json file to see the full structure of the recipeJSON below.
const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';

const recipe = JSON.parse(recipeJSON)

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/recipe", (req, res) => {
  //Step 3: Write your code here to make this behave like the solution website.
 let recipeChoice = req.body["choice"];

  let name;
  let proteinName;
  let proteinPreparation;
  let salsaName;
  let toppings1;
  let toppings2;
  let toppings3;
  let toppings4;


  switch(recipeChoice){
    case 'chicken'://u can use JSON.parse(recipeJSON)[0] to access the fistlayer of the array of objects so that u can directly use the key and values within it in ejs file
      name = recipe[0].name;
      proteinName = recipe[0].ingredients.protein.name;
      proteinPreparation = recipe[0].ingredients.protein.preparation;
      salsaName = recipe[0].ingredients.salsa.name;
      toppings1 = `${recipe[0].ingredients.toppings[0].quantity} of ${recipe[0].ingredients.toppings[0].name}`
      toppings2 = `${recipe[0].ingredients.toppings[1].quantity} of ${recipe[0].ingredients.toppings[1].name}`
      toppings3 = `${recipe[0].ingredients.toppings[2].quantity} of ${recipe[0].ingredients.toppings[2].name}`
      toppings4 = `${recipe[0].ingredients.toppings[3].quantity} of ${recipe[0].ingredients.toppings[3].name}`
      break;
    case 'beef'://u can use JSON.parse(recipeJSON)[1] to access the secondlayer of the array of objects so that u can directly use the key and values within it in ejs file
      name = recipe[1].name;
      proteinName = recipe[1].ingredients.protein.name;
      proteinPreparation = recipe[1].ingredients.protein.preparation;
      salsaName = recipe[1].ingredients.salsa.name;
      toppings1 = `${recipe[1].ingredients.toppings[0].quantity} of ${recipe[1].ingredients.toppings[0].name}`
      toppings2 = `${recipe[1].ingredients.toppings[1].quantity} of ${recipe[1].ingredients.toppings[1].name}`
      toppings3 = `${recipe[1].ingredients.toppings[2].quantity} of ${recipe[1].ingredients.toppings[2].name}`
      toppings4 = '';
      break;
    case 'fish'://u can use JSON.parse(recipeJSON)[2] to access the thirdlayer of the array of objects so that u can directly use the keys and values within it in ejs file
      name = recipe[2].name;
      proteinName = recipe[2].ingredients.protein.name;
      proteinPreparation = recipe[2].ingredients.protein.preparation;
      salsaName = recipe[2].ingredients.salsa.name;
      toppings1 = `${recipe[2].ingredients.toppings[0].quantity} of ${recipe[2].ingredients.toppings[0].name}`
      toppings2 = `${recipe[2].ingredients.toppings[1].quantity} of ${recipe[2].ingredients.toppings[1].name}`
      toppings3 = `${recipe[2].ingredients.toppings[2].quantity} of ${recipe[2].ingredients.toppings[2].name}`
      toppings4 = '';
      break;
    default:
      recipe = undefined;
  }
  res.render("index.ejs", {recipe: recipe, name: name, proteinName: proteinName, proteinPreparation: proteinPreparation, salsaName: salsaName, toppings1: toppings1, toppings2: toppings2, toppings3: toppings3, toppings4: toppings4})
  //Step 4: Add code to views/index.ejs to use the recieved recipe object.
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
  console.log(recipe)
});
