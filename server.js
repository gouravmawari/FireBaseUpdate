require("dotenv").config();
const app = require("./app");

const StartServer = async () => {
    try {
        
        app.listen(3000, () => {
            console.log(`Server is running on port 3000`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
    }
};

StartServer();
