import * as React from "react"
import "./NutritionCard.css"
//import ProductDetail from "../ProductDetail/ProductDetail"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function NutritionCard({key,nutritionItem}) {

    return (
        <div className="container"> 
            <h1 className="date">{nutritionItem.created_at}</h1>
            <div className="card" >
                <div className="mainContainer">
                    <h1 className="title">{nutritionItem.name}</h1>
                    <img className ="image" 
                    src = {nutritionItem.image_url} 
                    alt = "${product.name} 's image" 
                    />
                    <h2 className="category">{nutritionItem.category}</h2>
                </div>
                <div className="otherContainer">
                    <h2 className="calories">{nutritionItem.calories}</h2>
                    <h2 className="quantity">{nutritionItem.quantity}</h2>
                </div>
            </div>
        
        </div>
    )
}