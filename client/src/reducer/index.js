import { GET_RECIPES, FILTER_BY_DIET, FILTER_CREATED, ORDER_RECIPES, GET_NAME_RECIPES, GET_TYPES } from "../actions";

const initialState = {
    recipes : [],
    allRecipes: [],
    types: []
}

export default function rootReducer (state = initialState, action){
    switch(action.type){
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload // para que cuando cambie de filtro, vuelva a filtrar sobre todas las recetas y no el filtro. Es decir, que no filtre sobre lo que ya se filtró
            }

            //SOLUCIONAR ESTO
            case FILTER_BY_DIET:
                const allRecipes = state.recipes
                const statusFilter = action.payload === "Recipes" ? allRecipes : allRecipes.filter(el => el.status === action.payload)
                return {
                    ...state,
                    recipes : statusFilter
                }
                //SOLUCIONADO
                case FILTER_CREATED:
                    const statusFilter2 = action.payload === "created" ? state.allRecipes.filter(e => e.createInDb) : state.allRecipes.filter(e => !e.createInDb)
                    return {
                        ...state,
                        recipes: action.payload === "Recipes" ? state.allRecipes : statusFilter2
                    }
                    //SOLUCIONADO PERO FALTA POR PUNTUACION
                    case ORDER_RECIPES:
                        let sortedArr = action.payload === "asc" ? state.recipes.sort(function(a,b){
                            if(a.title > b.title){
                                return 1;
                            }
                            if(b.title > a.title){
                                return -1
                            }
                            return 0;
                        }):
                        state.recipes.sort(function(a,b){
                            if(a.title > b.title){
                                return -1;
                            }
                            if(b.title > a.title){
                                return 1
                            }
                            return 0;
                        })
                        return{
                            ...state,
                            recipes: sortedArr
                        }
                        //SOLUCIONADO
                        case GET_NAME_RECIPES:
                            return {
                                ...state,
                                recipes: action.payload
                            }
                            //SOLUCIONAR ESTO
                            case "POST_RECIPE":
                                return {
                                    ...state,
                                }
                                case GET_TYPES:
                                    return {
                                        ...state,
                                        types: action.payload
                                    }
            default : 
            return state
    }
}

