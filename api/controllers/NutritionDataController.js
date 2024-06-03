const calories = require("../models/calorieSchema");

const getNutritionData = async (req, res) => {
    try {
        const { userId } = req.params;
        const calorieData = await calories.find({ user: userId });
        // console.log("Calorie data:", calorieData);
        res.json({ status: "ok", calorieData });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = getNutritionData;
