const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios'); 

const {Recipe, Diets} = require('../db');
const { getTypes } = require('../Controlers/Types');




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//getRecipesNames() cambiar ese por getRecipeInfo()
//buscar todos los getRecipesNames()
const getRecipeInfo = async () =>{
  const urlApi = await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=afef0744d2bf4e5fb25ebd2cbce223d2&addRecipeInformation=true&number=100")
    const infoApi = await urlApi.data.results.map(i =>{
        return {
            id: i.id,
            sourceName: i.sourceName,
            title: i.title,
            spoonacularScore: i.spoonacularScore,
            healthScore: i.healthScore,
            image: i.image,
            summary: i.summary,
            diets: i.diets,
            //AGREGAR pasos
        };
    });
    return infoApi;
};

//modificar esto para que lo traiga de la BD
const getRecipesDB = async () =>{
    return await Recipe.findAll({
        include: {
            model: Diets, // traeme el modelo
            summary: summary, // traeme el resumen
            diets: ['diets'], // traeme tipo de dieta
            through: { // mediante las dietas
                diets: [],
            },
        },
    })
};



router.get("/recipes", async (req, res) =>{
    const name = req.query.name // buscamos si hay un recipe en query
    let allRecipes = await getRecipeInfo();
    if(name){
        let recipeName = await allRecipes.filter(i => i.title.toLowerCase().includes(name.toLowerCase())); // con esto me fijo si el nombre que me pasan por query coincide con el nombre del recipe
        // uso toLowerCase para que siempre lo que me pasen por query quede en minúscula
        // hacer esta verificación siempre, por las dudas
        recipeName.length ? // se encontró algo en recipe.Name.length?
        res.status(200).send(recipeName) :
        res.status(404).send("No se encuentra la receta");
    }else{
        res.status(200).send(allRecipes);
    }
});

router.get("/recipes/:id", async (req, res) =>{
    const id = req.params.id;
    const infoApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=afef0744d2bf4e5fb25ebd2cbce223d2`);
    const recipeInfo = await getRecipeInfo()
    if(id){
        let recipeId = await recipeInfo.filter(e => e.id == id)
        recipeId.length ?
        res.status(200).json(recipeId) :
        res.status(404).send("No se encuentra lo requerido")
    }

})

router.get("/types", async (req, res) =>{
    let types = await getTypes()
    res.send(types)
})

router.post("/recipe", async (req, res) => {
 // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
//Crea una receta en la base de datos
        let createRecipe = await Recipe.create({
            sourceName,
            title,
            image,
            summary,
            steps,
            diets,
            createInDb,
        })
        let recipeInDb = await Recipe.findAll({
            where: {name : createRecipe}
        })

        createRecipe.addRecipe(recipeInDb)
})



module.exports = router;
