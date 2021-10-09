import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {postRecipes, getTypes} from "../actions/index"

export default function RecipeCreate(){
    const dispatch = useDispatch()
    const history = useHistory()         //esto redirije a la ruta que yo le indique
    const types = useSelector((state) => state.types)

    const[input, setInput] = useState({
        title: "",
        summary: "",
        score: "",
        healthScore: "",
        steps: "",
        types: [], //que sería las dietas, el tipo de comida.
    })

    useEffect(() => {
        dispatch(getTypes())
    }, []);

    //voy a guardar las cosas que escribe el usuario en el estado input
    function handleChange(e){
        setInput({
            ...input,
            [e.target.title] : e.target.value
        })
        console.log(input)
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                types: e.target.value,
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postRecipes(input))
        alert("Receta creada!")
        setInput({
            title: "",
        summary: "",
        score: "",
        healthScore: "",
        steps: "",
        types: [],
        })
        history.push("/home")
    }

    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crea tu propia receta</h1>
            <form>
                <div>
                    <label>Título:</label>
                    <input
                     type="text" 
                     value = {input.title}
                     name="title" 
                     onChange={handleChange}
                     />
                     
                </div>
                <div>
                    <label>Ingredientes:</label>
                    <input
                     type="text"
                     value = {input.summary}
                     name = "summary"
                     onChange={handleChange}
                      />
                </div>
                <div>
                    <label>Puntuación de salud del 1 al 100:</label>
                    <input
                    type="text"
                    value = {input.healthScore}
                    name = "healthScore"
                    onChange={handleChange}
                     />
                </div>
                <div>
                    <label>Paso a paso:</label>
                    <input
                    type="text"
                    value = {input.steps} //COLOCAR LOS STEPS EN LAS RUTAS Y CAMBIAR ESTO
                    name = "healthScore"
                    onChange={handleChange}
                     />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                    type="text"
                    value = {input.image}
                    name = "image"
                    onChange={handleChange}
                     />
                </div>
                <div>
                    <label>Tipos de dietas</label>
                    <label><input
                    type = "checkbox"
                    name = "Libre de Gluten"
                    value = "Gluten Free"
                    onChange={(e)=> handleCheck(e)}
                    />Libre de gluten</label>

                    <label><input
                    type = "checkbox"
                    name = "Cetogénico"
                    value = "Ketogenic"
                    onChange={(e)=> handleCheck(e)}
                    />Cetogénico</label>

                    <label><input
                    type = "checkbox"
                    name = "Vegetariano"
                    value = "Vegetarian"
                    onChange={(e)=> handleCheck(e)}
                    />Vegetariano</label>

                    <label><input
                    type = "checkbox"
                    name = "Lacto-vegetariano"
                    value = "Lacto-Vegetarian"
                    onChange={(e)=> handleCheck(e)}
                    />Lacto-vegetariano</label>

                    <label><input
                    type = "checkbox"
                    name = "Ovo-Vegetariano"
                    value = "Ovo-Vegetarian"
                    onChange={(e)=> handleCheck(e)}
                    />Ovo-Vegetariano</label>

                    <label><input
                    type = "checkbox"
                    name = "Vegano"
                    value = "Vegan"
                    onChange={(e)=> handleCheck(e)}
                    />Vegano</label>
                
                    <label><input
                    type = "checkbox"
                    name = "Pescetariano"
                    value = "Pescetarian"
                    onChange={(e)=> handleCheck(e)}
                    />Pescetariano</label>
                
                    <label><input
                    type = "checkbox"
                    name = "Paleo"
                    value = "Paleo"
                    onChange={(e)=> handleCheck(e)}
                    />Paleo</label>
            
                    <label><input
                    type = "checkbox"
                    name = "Primitiva"
                    value = "Primal"
                    onChange={(e)=> handleCheck(e)}
                    />Primitiva</label>
                
                    <label><input
                    type = "checkbox"
                    name = "FODMAP bajo"
                    value = "Low FODMAP"
                    onChange={(e)=> handleCheck(e)}
                    />FODMAP bajo</label>
                
                    <label><input
                    type = "checkbox"
                    name = "Whole30"
                    value = "Whole30"
                    onChange={(e)=> handleCheck(e)}
                    />Whole30</label>
                </div>

                <button type ="submit">Crear receta</button>
                    
                
            </form>

        </div>
    )

    
}