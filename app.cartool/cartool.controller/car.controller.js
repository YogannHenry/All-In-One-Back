/* eslint-disable camelcase */
const carDatamapper = require('../cartool.datamapper/car.datamapper');
const userDatamapper = require('../../app.user/user.datamapper');

const cartoolController = {
  async getAllCar(req, res) {
    const allCar = await carDatamapper.getAllCar();
    res.json(allCar);
  },

  async getOneCar(req, res) {
    const { carId } = req.params;
    const oneCar = await carDatamapper.getOneCar(carId);
    if (oneCar.length === 0) {
      return res.status(404).json(`message: il n'existe aucune voiture avec l'id ${carId}`);
    }
    return res.json(oneCar);
  },

  async createOneCar(req, res) {
    const {
      name, type, current_km, km_per_month, icon, userId,
    } = req.body;
    const existedUser = await userDatamapper.getUserById(userId);
    if (existedUser.length === 0) {
      return res.status(404).json(`message: il n'existe aucun user avec l'id ${userId}`);
    }
    const oneCar = await carDatamapper
      .createOneCar(name, type, current_km, km_per_month, icon, userId);
    return res.json(oneCar);
  },

  async deleteOneCar(req, res) {
    const { carId } = req.params;
    const existedCar = await carDatamapper.getOneCar(carId);
    if (existedCar.length === 0) {
      return res.status(404).json(`message: il n'existe aucune voiture avec l'id ${carId}`);
    }
    await carDatamapper.deleteOneCar(carId);
    return res.json(`message: la voiture avec l'id ${carId} a été supprimée avec succès`);
  },

  async modifyOneCar(req, res) {
    const { carId } = req.params;
    const existedCar = await carDatamapper.getOneCar(carId);
    if (existedCar.length === 0) {
      return res.status(404).json(`message: il n'existe aucune voiture avec l'id ${carId}`);
    }
    const {
      name, type, current_km, km_per_month, icon,
    } = req.body;
    const updatedCar = await carDatamapper
      .modifyOneCar(name, type, current_km, km_per_month, icon, carId);
    return res.json(updatedCar);
  },
};

module.exports = cartoolController;
