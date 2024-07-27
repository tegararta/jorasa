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
unit_kerja.hasMany(user, { foreignKey: 'id_unit' });
user.belongsTo(unit_kerja, { foreignKey: 'id_unit' });
survey.belongsTo(user, { foreignKey: 'id_user' });
layanan.belongsTo(unit_kerja, { foreignKey: 'id_unit' });
coresponden.belongsTo(survey, { foreignKey: 'id_survey' });
pertanyaan.belongsTo(survey, { foreignKey: 'id_survey' });
jawaban.belongsTo(pertanyaan, { foreignKey: 'id_pertanyaan' });
saran.belongsTo(coresponden, { foreignKey: 'id_coresponden' });

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
