const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const sequelizestore = require('connect-session-sequelize');
const session = require('express-session')
const cors = require('cors');
const { sequelize } = require('./config/db');
const { user, unit_kerja, survey, layanan, pertanyaan, coresponden, jawaban, saran } = require('./models'); // Import all models
const middlewareLogReq = require('./middleware/logs');
const authRoutes = require('./routes/authRoutes');
dotenv.config();

// Import Routes
const { 
    adminRoutes, 
    unitkerjaRoutes,
    layananRoutes,
    surveyRoutes
} = require('./routes/'); 
const app = express();

const sessionStore = sequelizestore(session.Store);
const store = new sessionStore({
    db: sequelize
});

// Middleware
app.use(helmet());
app.use(express.json());
app.use(session({
    secret: process.env.ACCESS,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie:{
        secure: 'auto'
    }
}));
app.use(cors({ 
    credentials: true,
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
// tabel menyimpan cookie aktifkan
// store.sync();

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        // Sync all models with the database
        await sequelize.sync({ force: false });
        console.log('All models were syncloginhronized successfully.');

        // Middleware and Routes
        app.use(middlewareLogReq);
        app.use(authRoutes); 
        app.use('/layanan', layananRoutes);
        app.use('/users', adminRoutes);
        app.use('/unit', unitkerjaRoutes);
        app.use('/survey', surveyRoutes);   

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
