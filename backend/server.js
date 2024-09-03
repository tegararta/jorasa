const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
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
    surveyRoutes,
    responden
} = require('./routes/'); 
const app = express();
const sessionStore = sequelizestore(session.Store);
const store = new sessionStore({
    db: sequelize
});


// Dokumentasi API
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation Jorasa',
        version: '1.0.0',
        description: 'API documentation using Swagger',
      },
      servers: [
        {
          url: 'http://localhost:5000',
        },
      ],
    },
    apis: ['./controller/**/*.js'], // Ganti dengan lokasi file routing kamu
  };
  const specs = swaggerJsdoc(options);
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
    origin: ['http://localhost:3000', 'http://192.168.43.16:3000'],
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

        //API Dokumentasi
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
        // Middleware and Routes
        app.use(middlewareLogReq);
        app.use(authRoutes); 
        app.use('/layanan', layananRoutes);
        app.use('/users', adminRoutes);
        app.use('/unit', unitkerjaRoutes);
        app.use('/survey', surveyRoutes);   
        app.use('/responden', responden);

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
