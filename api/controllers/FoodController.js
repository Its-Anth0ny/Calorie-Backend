const Food = require("../models/Food.js");

const addUserFoodIntake = async (req, res) => {
    try {
        const foodItems = req.body;
        // console.log(userId);
        // Create an array to store all the new food intake documents
        const newFoodIntakes = [];

        // Iterate over each food item and create a new document for it
        for (const foodItem of foodItems) {
            const newFoodIntake = await Food.create({
                userId: foodItem.userId,
                foodname: foodItem.foodname,
                foodimg: foodItem.foodimg,
                quantity: foodItem.quantity,
                servingSize: foodItem.servingSize,
                calories: foodItem.calories,
                proteins: foodItem.proteins,
                carbs: foodItem.carbs,
                fats: foodItem.fats,
                fiber: foodItem.fiber,
                cholesterol: foodItem.cholesterol,
                timestamp: foodItem.timestamp,
            });

            newFoodIntakes.push(newFoodIntake);
        }
        // console.log(newFoodIntakes);
        res.status(201).json({
            message: "Food intake logged successfully",
            data: newFoodIntakes,
        });
    } catch (error) {
        console.error("Error logging food intake:", error);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = addUserFoodIntake;
