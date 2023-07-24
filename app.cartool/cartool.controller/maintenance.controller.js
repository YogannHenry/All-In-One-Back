const carDatamapper = require('../cartool.datamapper/car.datamapper.js');
const maintenanceDatamapper = require('../cartool.datamapper/maintenance.datamapper.js')
const dayjs = require('dayjs')

const maintenanceController = {
    async getAllMaintenance (req, res) {
        const allMaintenance = await maintenanceDatamapper.getAllMaintenance();
        if (allMaintenance.length === 0){
          res.status(404).json(`message: il n'existe aucun entretien`)
        }
        res.json(allMaintenance);
    },

    async getAllMaintenanceByCarId (req, res) {
      const carId = req.params.carId
      const car = await carDatamapper.getOneCar(carId)
      if (car.length === 0){
        res.status(404).json(`message: il n'existe aucune voiture avec l'id ${carId} `)
      }
      const allMaintenance = await maintenanceDatamapper.getAllMaintenanceByCarId(carId);
      if (allMaintenance.length === 0){
        res.status(404).json(`message: il n'existe aucun entretien pour la voiture avec l'id ${carId} `)
      }
      res.json(allMaintenance);
  },

    async getOneMaintenance (req, res) {
        const maintenanceId = req.params.maintenanceId;
        const oneMaintenance = await maintenanceDatamapper.getOneMaintenance(maintenanceId);
        if (oneMaintenance.length === 0){
          res.status(404).json(`message: il n'existe aucun entretien avec l'id ${maintenanceId} `)
        }
        const {last_date_verif,last_km_verif,validity_period,validity_km} = oneMaintenance[0]
        
        // calcul des km restant avant entretien
        
        const lastKmRemaining = last_km_verif + validity_km
        
        // calcul du temps restant avant entretien
        const lastDate = dayjs(last_date_verif);
        const resultDate = lastDate
          .add(validity_period.years || 0, 'years')
          .add(validity_period.months || 0, 'months')
          .add(validity_period.days || 0, 'days');
        const lastTimeRemaining = resultDate.toISOString();

        const oneMaintenanceCalcul = {...oneMaintenance[0], lastKmRemaining, lastTimeRemaining}
        console.log(oneMaintenanceCalcul) 

        res.json(oneMaintenance);
    },

    async createOneMaintenance (req, res) {
        const carId = req.params.carId;
        const {name, last_date_verif, last_km_verif, validity_period, validity_km, icon} = req.body;
        const oneMaintenance = await maintenanceDatamapper.createOneMaintenance(name, last_date_verif, last_km_verif, validity_period, validity_km, icon, carId);
        res.json(oneMaintenance);
    },

    async deleteOneMaintenance (req, res) {
        const maintenanceId = req.params.maintenanceId;
        const maintenanceExisted = await maintenanceDatamapper.getOneMaintenance(maintenanceId)
        if(maintenanceExisted.length === 0){
          res.status(404).json(`message: il n'existe aucun entretien avec l'id ${maintenanceId} `)
        } else {
          const oneMaintenance = await maintenanceDatamapper.deleteOneMaintenance(maintenanceId);
          res.json(`message: l'entretien avec l'id ${maintenanceId} a été supprimé avec succès`);
        }
    },
    
    async modifyOneMaintenance (req,res) {
        const maintenanceId = req.params.maintenanceId;
        const maintenanceExisted = await maintenanceDatamapper.getOneMaintenance(maintenanceId)
        if(maintenanceExisted.length === 0){
          res.status(404).json(`message: il n'existe aucun entretien avec l'id ${maintenanceId} `)
        } else {
          const {name, last_date_verif, last_km_verif, validity_period, validity_km, icon} = req.body;
          const modifiedMaintenance = await maintenanceDatamapper.modifyOneMaintenance(name, last_date_verif, last_km_verif, validity_period, validity_km, icon, maintenanceId);
          res.json(modifiedMaintenance);
        }
    }
}

module.exports = maintenanceController
