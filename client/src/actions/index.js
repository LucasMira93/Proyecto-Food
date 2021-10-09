import axios from 'axios'
export const GET_RECIPES = 'GET_RECIPES'
export const FILTER_BY_DIET = "FILTER_BY_DIET"
export const FILTER_CREATED = "FILTER_CREATED"
export const ORDER_RECIPES = "ORDER_RECIPES"
export const GET_NAME_RECIPES = "GET_NAME_RECIPES"
export const GET_TYPES = "GET_TYPES"

export function getRecipes(){
    
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/recipes")

        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}

//ver el filter de los tipos de dietas
export function filterTypeOfDiet(payload){
    return{
        type: FILTER_BY_DIET, 
        payload

    }
}
//creados o existentes
export function filterCreated(payload){
    return {
        type: FILTER_CREATED,
        payload
    }
}
// ascendente, descendete y puntuación
export function order_recipes(payload){
    return {
        type : ORDER_RECIPES,
        payload

    }
}
//esto es para el searchBar
export function getNameRecipes(sourceName){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/recipes?name=" + sourceName)
            return dispatch({
                type: GET_NAME_RECIPES, // 
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

//la url hay que cambiarla y hay que añadir los tipos de dieta en el back, preguntar
export function getTypes(){
    return async function (dispatch){
        var info = await axios("http://localhost:3001/recipes", {

        })
        return dispatch({type: "GET_TYPES", payload: info.data});
    };
}

export function postRecipes(payload){
    return async function (dispatch){
        const response = await axios.post("http://localhost:3001/recipes", payload)
        console.log(response)
        return response;
    }
}