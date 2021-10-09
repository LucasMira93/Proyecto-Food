const {Diet} = require("../db")

let dietId = 0;

let diets = [
    {
        name: "Gluten Free",
        id: ++dietId,
    },
    {
        name: "Ketogenic",
        id: ++dietId,
    },
    {
        name: "Vegetarian",
        id: ++dietId,
    },
    {
        name: "Lacto Ovo Vegetarian",
        id: ++dietId,
    },
    {
        name: "Ovo-Vegetarian",
        id: ++dietId,
    },
    {
        name: "Vegan",
        id: ++dietId,
    },
    {
        name: "Pescetarian",
        id: ++dietId,
    },
    {
        name: "Paleo",
        id: ++dietId,
    },
    {
        name: "Primal",
        id: ++dietId,
    },
    {
        name: "Low FODMAP",
        id: ++dietId,
    },
    {
        name: "Whole30",
        id: ++dietId,
    },
];

async function getTypes(req, res, next){
    try{
        const response = await Diet.findAll();
        if(response.length > 0) return res.json(response);
        else{
            try{
                const dietsDB = await Diet.bulkCreate(diets);
                return res.json(dietsDB);
            } catch{
                (err) => next(err);
            }
        }
    } catch{
        (err) => next(err);
    }
}

module.exports = {
    getTypes,
}