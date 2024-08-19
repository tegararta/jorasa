const { sequelize } = require('../config/db');
const user = require('./user');
const unit_kerja = require('./unit_kerja');
const survey = require('./survey');
const layanan = require('./layanan');
const pertanyaan = require('./pertanyaan');
const coresponden = require('./coresponden');
const jawaban = require('./jawaban');
const saran = require('./saran');

// Define associations
user.hasMany(unit_kerja, { foreignKey: 'id_user' });
user.hasMany(survey, { foreignKey: 'id_user' });
survey.hasMany(pertanyaan, { foreignKey: 'id_survey'})
unit_kerja.hasOne(user, { foreignKey: 'id_user' });
survey.belongsTo(user, { foreignKey: 'id_user' });
layanan.belongsTo(unit_kerja, { foreignKey: 'id_unit' });
unit_kerja.hasMany(layanan, { foreignKey: 'id_unit' })
coresponden.belongsTo(survey, { foreignKey: 'id_survey' });
pertanyaan.belongsTo(survey, { foreignKey: 'id_survey' });
jawaban.belongsTo(pertanyaan, { foreignKey: 'id_pertanyaan' });
saran.belongsTo(coresponden, { foreignKey: 'id_coresponden' });
survey.hasMany(coresponden, { foreignKey: 'id_survey' });

// Coresponden model
coresponden.hasMany(jawaban, { foreignKey: 'id_coresponden' });
coresponden.hasMany(saran, { foreignKey: 'id_coresponden' });

// Jawaban model
jawaban.belongsTo(coresponden, { foreignKey: 'id_coresponden' });


module.exports = {
    sequelize,
    user,
    unit_kerja,
    survey,
    layanan,
    pertanyaan,
    coresponden,
    jawaban,
    saran,
};
