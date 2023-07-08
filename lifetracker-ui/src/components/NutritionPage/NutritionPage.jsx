import "./NutritionPage.css"
import { useState, useEffect } from "react"
import NutritionCard from "../NutritionCard/NutritionCard";

export default function NutritionPage({ nutritionEntry, user, listNutritionhandeler, nutritionList }) {
    const userID = user.id;
    const [formNutrition, setFormNutrition] = useState(false);
    const [nutritionInfo, setNutritionInfo] = useState(
        { name: "", calories: "", imageUrl: "", category: null, quantity: "" });

    useEffect(() => {
        listNutritionhandeler();
    }, []);
    
    const handleNutritionInput = (name, event) => {
        setNutritionInfo((prevState) => ({ ...prevState, [name]: event }))
    }

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

    let listOfItem = nutritionList.map((item) => (
        <div className="nutrition-grid">
            <NutritionCard nutritionItem={item} />
        </div>
    ));

    return (
        <div className="Nutrition">
            <h1 className="title">Nutrition</h1>
            {formNutrition ? (
                <>
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
                        </div>
                    </div>

                </>
            ) : (
                <>
                    <div className="Nutrition-row">
                    <button className="request-nutrition" onClick={() => setFormNutrition(true)}>Add Nutrition</button>
                        {listOfItem}
                    </div>
                </>
            )}
        </div>
    )

}