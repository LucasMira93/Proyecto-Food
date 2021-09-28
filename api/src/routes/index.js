const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios'); 
// const typeOfDiet = require('../models/typeOfDiet');
// const Recipe = require('../models/Recipe');
const {Recipe, typeOfDiet} = require('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getRecipesName = async () =>{
  const urlApi = await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=30403519701e4630bdc34d3ed2730c74&addRecipeInformation=true&number=100")
    const infoApi = await urlApi.data.results.map(i =>{
        return {
            id: i.id,
            title: i.title,
            image: i.image,
        };
    });
    return infoApi;
};

const getRecipesInfo = async () =>{
    return await Recipe.findAll({
        include: {
            model: typeOfDiet, // traeme el modelo
            summary: summary, // traeme el resumen
            diets: ['diets'], // traeme tipo de dieta
            through: { // mediante las dietas
                diets: [],
            },
        },
    })
};

// const infoTypes = async () =>{
//  const infoApi = await getRecipesName();
//  const dbInfo = await getRecipesInfo();
//  const totalInfo = infoApi.concat(dbInfo)
//  return totalInfo;
// };

router.get("/recipes", async (req, res) =>{
    const name = req.query.name // buscamos si hay un recipe en query
    let allRecipes = await getRecipesName();
    if(name){
        let recipeName = await allRecipes.filter(i => i.name.toLowerCase().include(name)); // con esto me fijo si el nombre que me pasan por query coincide con el nombre del recipe
        // uso toLowerCase para que siempre lo que me pasen por query quede en minúscula
        // hacer esta verificación siempre, por las dudas
        recipeName.length ? 
        res.status(200).send(recipeName) :
        res.status(404).send("No se encuentra la receta");
    }else{
        res.status(200).send(allRecipes);
    }
}) 

module.exports = router;
