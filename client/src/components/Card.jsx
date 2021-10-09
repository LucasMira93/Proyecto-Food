import React from "react";

export default function Card({diets, title, image,}){
    return (
        <div>
            <h1>{title}</h1>
            <h5>{diets.join(" - ")}</h5>
            <img src={image} alt="img not found" width="200px" height="250px" />
        </div>
    )
}