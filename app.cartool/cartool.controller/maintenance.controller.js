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
      const {
        last_date_verif, validity_period, validity_km,
      } = oneMaintenance;
      const lastDate = dayjs(last_date_verif);

      // calcul des km restants avant le prochain entretien en valeur absolue
      const lastKmRemaining = current_km + validity_km;

      // calcul du temps restant avant entretien en fonction des km par mois
      const periodPerMonth = Math.abs((current_km - lastKmRemaining) / km_per_month, 10);
      const dateKmPerMonth = lastDate.add(periodPerMonth, 'months').toISOString();

      // calcul du temps restant avant entretien en fonction de la date de validité d'un entretien
      const resultDate = lastDate
        .add(validity_period.years || 0, 'years')
        .add(validity_period.months || 0, 'months')
        .add(validity_period.days || 0, 'days');
      const lastTimeRemaining = resultDate.toISOString();
      const oneMaintenanceCalcul = {
        ...oneMaintenance, lastKmRemaining, lastTimeRemaining, dateKmPerMonth,
      };
      allMaintenanceCalcul.push(oneMaintenanceCalcul);
    }

    return res.json(allMaintenanceCalcul);
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
