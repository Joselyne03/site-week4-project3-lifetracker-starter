import * as React from "react"
import "./NutritionCard.css"
//import ProductDetail from "../ProductDetail/ProductDetail"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function NutritionCard({ nutritionItem }) {
    const date = new Date(nutritionItem.created_at)
    console.log("date : ", date)

    return (
        
        <div className="container">
            <div className="background"
                style={{ backgroundImage: `url(${nutritionItem.image_url})` }} ></div>
            <div className="overlay"></div>

            <div className="flex-container">
            
                <div className="top-container">
                    <h1 className="date">{date.toDateString()}</h1>
                    <h2 className="category">{nutritionItem.category}</h2>
                </div>
                <div className="item-title"> 
                    <h1 className="title">{nutritionItem.name}</h1>
                </div>
                <div className="small-cantainer">
                    <h2 className="quantity">Quantity: {nutritionItem.quantity}</h2>
                    <h2 className="calories">Calories: {nutritionItem.calories}</h2>
                </div>
           
            </div>

        </div>
    )
}
// {/* 
// <div className="container">
//       <div
//         className="background"
//         style={{ backgroundImage: `url(${userInfo.url})` }}
//       ></div>
//       <div className="overlay"></div>
//       <div className="flex-container">
//         {/* Content using flex */}
//         </div>
//         </div>
// */}