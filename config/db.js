const mongoose = require("mongoose");

mongoose.connect(
    process.env.ADRESSE_DB+"mern-project",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => console.log("Mongo db connected"))
.catch((err) => console.log("failed to connect mongo db", err));
