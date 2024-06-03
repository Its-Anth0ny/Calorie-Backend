const Food = require('../models/Food.js');

const getUserFoodIntake = async (req, res) => {
    try {
        const userId = req.params.userId;
        const date = new Date(req.params.date);

        // Find user's food intake records for the specified day
        const userFoodIntake = await Food.find({
            userId: userId,
            timestamp: {
                $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()), // Start of day
                $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1) // End of day
            }
        });

        // Calculate total calories consumed
        const totalCalories = userFoodIntake.reduce((total, intake) => total + intake.calories, 0);
        const totalProteins = userFoodIntake.reduce((total1, intake) => total1 + intake.proteins, 0);
        const totalFats = userFoodIntake.reduce((total2, intake) => total2 + intake.fats, 0);

        res.json({ userId, date, totalCalories ,totalFats,totalProteins});
    } catch (error) {
        console.error('Error fetching user calories:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = getUserFoodIntake;

