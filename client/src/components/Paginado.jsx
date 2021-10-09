import React from "react";
import styles from "./styles/paginado.module.css"


//declaro paginado, traigo los componentes
export default function Paginado({recipesForPage, allRecipes, paginado}){
    const pageNumber = []; // declaro un array vacío
    for(let i=0; i<= Math.floor(allRecipes/recipesForPage); i++){
        pageNumber.push(i + 1) // recorro un array y divido todas las recetas por las recetas por pagina que yo quiero
        //devuelve un array de numeros con el resultado al anterior. i + 1 para que arranque en 1
    }

    return (
        <nav>
            <ul className={`${styles.paginado}`}>
                {pageNumber && pageNumber.map(number =>(
                    <div className="num" key={number}>
                    <div onClick = {() => paginado(number)}>{number}</div>
                    </div>
                ))}
            </ul>
        </nav>
    )
}
