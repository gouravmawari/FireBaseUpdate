require("dotenv").config();
const app = require("./app");
const{server} = require("./socket");
const PORT = process.env.PORT || 3000;

const StartServer = async () => {
    try {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
    }
};

StartServer();
