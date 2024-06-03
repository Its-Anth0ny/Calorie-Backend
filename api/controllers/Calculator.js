const User = require("../models/userSchema");
const calories = require("../models/calorieSchema");

const calculatorController = {
    calculate: async (req, res) => {
        try {
            const { userId } = req.params;

            // Fetch user details
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Perform calculations
            const bmr = user.calculateBMR();
            const tdee = user.calculateTDEE();
            const targetCaloriesLoss = user.weightLoss();
            const targetCaloriesGain = user.weightGain(); // Or user.weightGain(), depending on the scenario
            const dailyProtein = user.dailyProtein();
            const dailyFats = user.dailyFatsNeeds();
            const dailyCarbs = user.dailyCarb();

            // Create a new calorieData instance
            const calorieData = new calories({
                user: userId,
                bmr,
                tdee,
                targetCaloriesLoss,
                targetCaloriesGain,
                dailyProtein,
                dailyFats,
                dailyCarbs,
            });

            // Save the calculation result to the database
            await calorieData.save();

            return res.status(200).json({
                message: "Calculation result saved successfully",
                data: calorieData,
            });
        } catch (error) {
            console.error("Error while performing calculations:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
};

module.exports = calculatorController;
