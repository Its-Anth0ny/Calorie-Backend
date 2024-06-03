const Food = require("../models/Food");

// Import necessary modules and dependencies

// Define your controller function
const getPresentFoodItems = async (req, res) => {
    try {
        // Extract the user id from the URL
        const userId = req.params.userId;

        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);
        // Fetch food items with user details using the user id
        const foodItems = await Food.find({
            userId: userId,
            timestamp: {
                $gte: startOfToday,
                $lte: endOfToday,
            },
        });
        // Handle the response and send it back to the client
        res.json(foodItems);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Export the controller function
module.exports = getPresentFoodItems;
