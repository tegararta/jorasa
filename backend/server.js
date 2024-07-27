const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./config/db'); // Impor instance sequelize
const { user, unit_kerja, survey, layanan, pertanyaan, coresponden, jawaban, saran } = require('./models'); // Impor semua model
const middlewareLogReq = require('./middleware/logs');

// import Router
const userRoutes = require('./routes/userRoutes'); 
const tokenRoutes = require('./routes/tokenRoutes');
const app = express();

// Middleware
app.use(cookieParser()); // Gunakan cookie-parser sebelum rute
app.use(helmet());
app.use(express.json()); 

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        // Sync semua model dengan database
        await sequelize.sync({ force: false });
        console.log('All models were synchronized successfully.');

        // Middleware dan Rute
        app.use(middlewareLogReq);
        app.use('/token', tokenRoutes);
        app.use('/users', userRoutes);

        // Jalankan server pada port 5000
        app.listen(5000, () => {
            console.log('Server started on port 5000');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

startServer();
