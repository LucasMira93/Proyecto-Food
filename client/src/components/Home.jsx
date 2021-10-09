import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getRecipes, filterTypeOfDiet, filterCreated, order_recipes } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home(){
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    // genero estados locales
    const [currentPage, setCurrentPage] = useState(1) // arranco en 1 ya que siempre empiezo desde la primer página
    const [recipesForPage, setRecipesForPage] = useState(9)// el readme pide 9 recetas por página
    const [orden, setOrden] = useState("");
    const indexOfLastRecipes = currentPage * recipesForPage;
    const indexOfFirstRecipes = indexOfLastRecipes - recipesForPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipes ,indexOfLastRecipes)

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }


    useEffect (() =>{
        dispatch(getRecipes())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    
    }

    function handleFilterRecipe(e){
        dispatch(filterTypeOfDiet(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(order_recipes(e.target.value))
        setCurrentPage(1);
        setOrden(`ORDER_RECIPES ${e.target.value}`)
    }

    return (
        <div>
            <Link to='/recipes'>Crear Receta</Link>

            <h1>Disfruta de comidas sanas</h1>
            <button onClick={e => {handleClick(e)}}>
                Recargar todas las recetas
            </button>

            <div>
                <select onChange={e => handleSort(e)}>
                <option value= "asc"> Ascendente</option>
                    <option value= "desc"> Descendente</option>
                    <option value= "healthScore"> Puntuacion</option>
                </select>

                <select onChange={e => handleFilterRecipe(e)}>
                    <option value="All">Tipo de dieta</option>
                    <option value="Gluten free">Libre de gluten</option>
                    <option value="Ketogenic">Cetogénico</option>
                    <option value="Vegetarian">Vegetariano</option>
                    <option value="Lacto Ovo Vegetarian">Lacto-Vegetariano</option>
                    <option value="Ovo-Vegetarian">Ovo-Vegetariano</option>
                    <option value="Vegan">Vegano</option>
                    <option value="Pescetarian">Pescetariano</option>
                    <option value="Paleo">Paleo</option>
                    <option value="Primal">Primitiva</option>
                    <option value="Low FODMAP">FODMAP bajo</option>
                    <option value="Whole30">Whole30</option>
                    
                </select>

                <select onChange={e => handleFilterCreated(e)}>
                    <option value="All">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Existente</option>
                </select>
                
                <Paginado
                recipesForPage = {recipesForPage}
                allRecipes = {allRecipes.length} // paso un caracter de valor numérico
                paginado = {paginado}
                />
                <SearchBar/>
                <div>
                {
                    currentRecipes?.map((e) => {
                        return(
                            <div key={e.id}>
                            <Link to = {`/${e.id}`}>
                       <Card diets={e.diets} title={e.title} image={e.image ? e.image : e.image}/>
                       </Link>
                       </div>
                    );
                })}
                </div>
            </div>
            </div>
    )

}