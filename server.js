require('dotenv').config();

const 
    express = require('express'),
    mongoose = require("mongoose"),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT,
    uri = process.env.MONGODB_URL,
    userRouter = require('./routes/userRouter'),
    noteRouter = require('./routes/noteRouter');

app.use(express.json());
app.use(cors());

// Routes
app.use('/users',userRouter);
app.use('/api/note',noteRouter);

// listen Server
app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`); 
});

// Connect to mongodb
mongoose.connect(uri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB 😍');
});