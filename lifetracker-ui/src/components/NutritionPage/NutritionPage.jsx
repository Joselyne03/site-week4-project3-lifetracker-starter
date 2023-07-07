import "./NutritionPage.css"
import { useState,useEffect } from "react"
import NutritionCard from "../NutritionCard/NutritionCard";

export default function NutritionPage({ appState, nutritionEntry, user, listNutrition, nutrition }) {
    const [formNutrition, setFormNutrition] = useState(false)
    console.log("FORM: " , nutrition);
    useEffect(() => {
        listNutrition();
    },[])
    const [nutritionInfo, setNutritionInfo] = useState(
        { name: "", calories: "", imageUrl: "", category: null, quantity: "" });
    const handleNutritionInput = (name, event) => {
        setNutritionInfo((prevState) => ({ ...prevState, [name]: event }))
    }

    const userID =user.id; 
    //console.log("IDDD : " , userID);
    const handleSubmissionNutrition = (event) => {
        event.preventDefault();
        console.log("Nutrition Form is submitted!");
        nutritionEntry(nutritionInfo.name,
            nutritionInfo.calories,
            nutritionInfo.imageUrl,
            nutritionInfo.category,
            nutritionInfo.quantity, 
            userID);
        setFormNutrition(false)
    }
    // if(nutrition !== undefined){
    //     let listOfItems =  nutrition.map((item) => (
    //         <div className="grid-card"> 
    //             <NutritionCard 
    //                 key = {item.id}
    //                 nutritionItem = {item}
    //                 /> 
    //         </div>
                
    //     ));
    // }else {
    //     if(listOfProducts === 0){
    //         listOfProducts = 
    //             <div className = "no-products">
    //                 <h2>No items here</h2>
    //             </div>
            
    //     }
    // }
    return (
        <div className="Nutrition">
            {formNutrition ? (
                <>
                    <h1 className="title">Nutrition</h1>
                    <div className="NutritionPage">
                        <div className="nutrition-feed">
                            <form className="nutrition-form" onSubmit={handleSubmissionNutrition} >
                                <h1 className="inputHeader">Name:</h1>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="name"
                                    value={nutritionInfo.name}
                                    onChange={(event) => { handleNutritionInput(event.currentTarget.name, event.currentTarget.value) }}
                                />
                                <h1 className="inputHeader">Calories:</h1>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="calories"
                                    value={nutritionInfo.calories}
                                    onChange={(event) => { handleNutritionInput(event.currentTarget.name, event.currentTarget.value) }}
                                />
                                <h1 className="inputHeader">Quantity:</h1>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="quantity"
                                    value={nutritionInfo.quantity}
                                    onChange={(event) => { handleNutritionInput(event.currentTarget.name, event.currentTarget.value) }}
                                />
                                <h1 className="inputHeader">imageURL:</h1>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="imageUrl"
                                    value={nutritionInfo.imageUrl}
                                    onChange={(event) => { handleNutritionInput(event.currentTarget.name, event.currentTarget.value) }} />
                                <h1 className="inputHeader">Category:</h1>
                                <select name="category"
                                    id="category"
                                    className="form-input"
                                    onChange={(event) => { handleNutritionInput(event.currentTarget.name, event.currentTarget.value), console.log(event.currentTarget.value) }
                                    }>
                                    <option value="" > Select a category </option>
                                    <option value={nutritionInfo.category} > Fruits </option>
                                    <option value={nutritionInfo.category} > Meat </option>
                                    <option value={nutritionInfo.category} > Soda </option>
                                    <option value={nutritionInfo.category} > Snacks </option>

                                </select>
                                <br />
                                <br />
                                <button className="submit-nutrition" type="submit">Save</button>
                            </form>
                            <div className="Nutrition-row">
                                       rows here 
                            </div>
                        </div>
                    </div>

                </>
            ) : (
                <>
                     <button className="request-nutrition" onClick={() => setFormNutrition(true)}>Add Nutrition</button>
                </>
            )}
        </div>
    )

}