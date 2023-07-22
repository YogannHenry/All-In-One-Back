const carDatamapper = require('../cartool.datamapper/car.datamapper.js')
const userDatamapper = require('../../app.user/user.datamapper.js')

const cartoolController = {
    async getAllCar (req, res) {
        const allCar = await carDatamapper.getAllCar();
        if (allCar.length === 0){
            res.status(404).json(`message: il n'existe aucune voiture`)
          }
        res.json(allCar);
    },

    async getOneCar (req, res) {
        const carId = req.params.carId;
        const oneCar = await carDatamapper.getOneCar(carId);
        if (oneCar.length === 0){
            res.status(404).json(`message: il n'existe aucune voiture avec l'id ${carId}`)
          }
        res.json(oneCar);
    },

    async createOneCar (req, res) {
        const {name, type, current_km, km_per_month, icon, userId} = req.body;
        const existedUser = await userDatamapper.getUserById(userId)
        if(existedUser.length === 0) {
            res.status(404).json(`message: il n'existe aucun user avec l'id ${userId}`)
        }
        const oneCar = await carDatamapper.createOneCar(name, type, current_km, km_per_month, icon, userId);
        res.json(oneCar);
    },

    async deleteOneCar (req, res) {
        const carId = req.params.carId;
        const existedCar = await carDatamapper.getOneCar(carId);
        if(existedCar.length === 0){
            res.status(404).json(`message: il n'existe aucune voiture avec l'id ${carId}`)
        } else {
            const oneCar = await carDatamapper.deleteOneCar(carId);
            res.json(`message: la voiture avec l'id ${carId} a été supprimée avec succès`);
        }
    },
    
    async modifyOneCar (req,res) {
        const carId = req.params.carId;
        const existedCar = await carDatamapper.getOneCar(carId);
        if(existedCar.length === 0){
            res.status(404).json(`message: il n'existe aucune voiture avec l'id ${carId}`)
        } else {
        const {name, type, current_km, km_per_month, icon} = req.body;
        const updatedCar = await carDatamapper.modifyOneCar(name, type, current_km, km_per_month, icon, carId);
        res.json(updatedCar);
        }
    }
}

module.exports = cartoolController