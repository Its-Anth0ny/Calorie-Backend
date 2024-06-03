const express = require("express");
const router = express.Router();

const loginController = require("../controllers/LoginController");
const registerController = require("../controllers/RegisterController");
const getUserFoodIntake = require("../controllers/UserFoodIntakeController");
const addUserFoodIntake = require("../controllers/FoodController");
const authenticateUser = require("../controllers/authenticateUser");
const calculatorController = require("../controllers/Calculator");
const getPresentFoodItems = require("../controllers/PresentFoodController");
const getNutritionData = require("../controllers/NutritionDataController");

// Login register routes
router.post("/login", loginController);
router.post("/register", registerController);
// Add food items routes
router.post("/user-food-intake", addUserFoodIntake);
router.post("/:userId", calculatorController.calculate);
// Get food items routes
router.get("/user-calories/:userId/:date", getUserFoodIntake);
router.get("/user-food-intake/:userId", getPresentFoodItems);
router.get("/:userId", getNutritionData);

router.get("/profile", authenticateUser, (req, res) => {
    // Access authenticated user via req.user
    res.json({ user: req.user });
});

module.exports = router;
