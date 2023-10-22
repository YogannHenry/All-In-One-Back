/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable camelcase */
const dayjs = require('dayjs');
const carDatamapper = require('../cartool.datamapper/car.datamapper');
const maintenanceDatamapper = require('../cartool.datamapper/maintenance.datamapper');

const maintenanceController = {
  async getAllMaintenance(req, res) {
    const allMaintenance = await maintenanceDatamapper.getAllMaintenance();
    if (allMaintenance.length === 0) {
      res.status(404).json('message: il n\'existe aucun entretien');
    }
    res.json(allMaintenance);
  },

  async getAllMaintenanceByCarId(req, res) {
    const { carId } = req.params;
    const car = await carDatamapper.getOneCar(carId);
    if (car.length === 0) {
      return res.status(404).json(`message: il n'existe aucune voiture avec l'id ${carId} `);
    }
    const allMaintenance = await maintenanceDatamapper.getAllMaintenanceByCarId(carId);
    if (allMaintenance.length === 0) {
      return res.status(404).json(`message: il n'existe aucun entretien pour la voiture avec l'id ${carId} `);
    }
    const { current_km, km_per_month } = car[0];
    const allMaintenanceCalcul = [];
    for (const oneMaintenance of allMaintenance) {
      const { last_date_verif, last_km_verif, validity_km } = oneMaintenance;

      // Calcul du nombre total de kilomètres parcourus depuis la dernière vérification
      const km_since_last_verif = current_km - last_km_verif;
      // Calcul du nombre de mois écoulés depuis la dernière vérification d'entretien
      const lastDateVerif = dayjs(last_date_verif);

      const currentDate = dayjs();

      const days_since_last_verif = Math.floor((currentDate - lastDateVerif) / (24 * 60 * 60 * 1000));

      // Calcul du nombre total de kilomètres attendus depuis la dernière vérification
      const daysPerMonth = 30;
      const km_per_day_driven = Math.ceil(km_per_month / daysPerMonth);

      const expected_km_since_last_verif = days_since_last_verif * km_per_day_driven;

      // Calcul des kilomètres restants avant le prochain entretien
      const lastKmRemaining = validity_km - (km_since_last_verif + expected_km_since_last_verif);

      const number_of_days_before_next_verif = Math.ceil(lastKmRemaining / km_per_day_driven);
      // Calcul des jours restants avant le prochain entretien

      const date_next_maintenance = currentDate.add(number_of_days_before_next_verif, 'day');
      const formattedDateNextMaintenance = date_next_maintenance.format('DD-MM-YYYY');

      // Ajout des résultats au tableau allMaintenanceCalcul
      allMaintenanceCalcul.push({
        ...oneMaintenance,
        last_date_verif,
        last_km_verif,
        validity_km,
        lastKmRemaining,
        formattedDateNextMaintenance,
        number_of_days_before_next_verif,
      });
    }

    return res.status(200).json(allMaintenanceCalcul);
  },

  async createOneMaintenance(req, res) {
    const { carId } = req.params;
    const {
      name, last_km_verif, validity_period, validity_km,
    } = req.body;

    let { last_date_verif } = req.body;
    const dateObject = dayjs(last_date_verif, 'DD/MM/YYYY').toDate();
    last_date_verif = dateObject.toISOString();
    const oneMaintenance = await maintenanceDatamapper
      .createOneMaintenance(name, last_date_verif, last_km_verif, validity_period, validity_km, carId);
    const oneCar = await carDatamapper.getOneCar(oneMaintenance[0].carId);
    let { current_km } = oneCar[0];
    if (current_km < last_km_verif) {
      current_km = last_km_verif;
      await carDatamapper.modifyKmOnCar(current_km, carId);
      return res.json({ oneMaintenance, message: 'nous avons aussi mis à jour les km de la voiture' });
    }
    return res.json(oneMaintenance);
  },

  async deleteOneMaintenance(req, res) {
    const { maintenanceId } = req.params;
    const maintenanceExisted = await maintenanceDatamapper.getOneMaintenance(maintenanceId);
    if (maintenanceExisted.length === 0) {
      return res.status(404).json(`message: il n'existe aucun entretien avec l'id ${maintenanceId} `);
    }
    await maintenanceDatamapper.deleteOneMaintenance(maintenanceId);
    return res.json(`message: l'entretien avec l'id ${maintenanceId} a été supprimé avec succès`);
  },

  async modifyOneMaintenance(req, res) {
    const { maintenanceId } = req.params;
    const maintenanceExisted = await maintenanceDatamapper.getOneMaintenance(maintenanceId);
    if (maintenanceExisted.length === 0) {
      return res.status(404).json(`message: il n'existe aucun entretien avec l'id ${maintenanceId} `);
    }
    const {
      name, last_date_verif, last_km_verif, validity_period, validity_km, icon,
    } = req.body;
    const { carId } = maintenanceExisted[0];
    const oneCar = await carDatamapper.getOneCar(carId);
    let { current_km } = oneCar[0];
    if (current_km < last_km_verif) {
      current_km = last_km_verif;
      await carDatamapper.modifyKmOnCar(current_km, carId);
      return res.json({ maintenanceExisted, message: 'nous avons aussi mis à jour les km de la voiture' });
    }
    const modifiedMaintenance = await maintenanceDatamapper
      .modifyOneMaintenance(name, last_date_verif, last_km_verif, validity_period, validity_km, icon, maintenanceId);
    return res.json(modifiedMaintenance);
  },
};

module.exports = maintenanceController;
