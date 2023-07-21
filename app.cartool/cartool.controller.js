const cartoolDatamapper = require('../app.cartool/cartool.datamapper.js')

const cartoolController = {
  async getAllCar (req, res) {
        const allCar = await cartoolDatamapper.getAllCar();
        res.json(allCar);
    },

  async getOneCar (req, res) {
        const carId = req.params.carId;
        const oneCar = await carDatamapper.getOneCar(carId);
         res.json(oneCar);
    },

  async createOneCar (req, res) {
        const {name, type, current_km, km_per_month, icon} = req.body;
        const oneCar = await cartoolDatamapper.createOneCar(name, type, current_km, km_per_month, icon);
        res.json(oneCar);
    },

    async deleteOneCar (req, res) {
        const carId = req.params.carId;
        const existedCar = await cartoolDatamapper.getOneCar(carId);
        if(existedCar.length === 0){
            res.status(404).json("message: la voiture n'existe pas")
        } else {
            const oneCar = await cartoolDatamapper.deleteOneCar(carId);
            res.json("message: Voiture supprimé avec succès");
        }
    },
    
    async modifyOneCar (req,res) {
        const carId = req.params.carId;
        const existedCar = await cartoolDatamapper.getOneCar(carId);
        if(existedCar.length === 0){
            res.status(404).json("message: La voiture n'existe pas")
        } else {
        const {name, type, current_km, km_per_month, icon, userId} = req.body;
        const updatedCar = await carDatamapper.modifyOneCar(name, type, current_km, km_per_month, icon, userId);
        res.json("message: Document modifié avec succès", updatedCar);
        }
    }
}

module.exports = cartoolController