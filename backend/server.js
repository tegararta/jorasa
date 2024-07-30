const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import CORS
const { sequelize } = require('./config/db'); // Import sequelize instance
const { user, unit_kerja, survey, layanan, pertanyaan, coresponden, jawaban, saran } = require('./models'); // Import all models
const middlewareLogReq = require('./middleware/logs');
dotenv.config();

// Import Router
const userRoutes = require('./routes/userRoutes'); 
const tokenRoutes = require('./routes/tokenRoutes');
const app = express();

// Middleware
app.use(cookieParser()); // Use cookie-parser before routes
app.use(helmet());
app.use(express.json());
app.use(cors({ 
    credentials: true,
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
})); // Use CORS

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        // Sync all models with the database
        await sequelize.sync({ force: false });
        console.log('All models were syncloginhronized successfully.');

        // Middleware and Routes
        app.use(middlewareLogReq);
        app.use('/token', tokenRoutes);
        app.use('/users', userRoutes);

        // Start server on port 5000
        app.listen(5000, () => {
            console.log('Server started on port 5000');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

startServer();
