const getAllCars = async (connection) => {
    try {
        const [result] = await connection.query("select * from cars");
        return result;
        console.log(result)
    } catch (error) {
        console.log("cannot get all Cars", error);
    }
}

const getCarById = async (connection, car_id) => {
    try {
        const [result] = await connection.query(`SELECT * FROM cars WHERE car_id=${car_id}`)
        return result;
    } catch (error) {
        console.log("cannot get Car By ID", error);
    }
}

const addCar = async (connection, car_details) => {
    const { model, 
        kms_driven, 
        fuel_type, 
        gear_transmission_type, price, city, state, car_img } = car_details;

    const queryStatement = `INSERT INTO cars (model, 
        kms_driven, 
        fuel_type, 
        gear_transmission_type, price, city, state, car_img) VALUES (?,?,?,?,?,?,?,?);`
    
    try {
        const [result] = await connection.query(queryStatement, [
            model, 
        kms_driven, 
        fuel_type, 
        gear_transmission_type, price, city, state, car_img
        ]);
        return result;
    }
    catch(error){
        console.log("Cannot add car",error);
    }
}

const deleteCarByID = async(connection, car_id)=>{
    try {
        const [result] = await connection.query(`DELETE FROM cars WHERE car_id=${car_id};`)
        return result;
    } catch (error) {
        console.log('Cannot delete car', error);
    }
}

const updateCar = async(connection, car_id, car_details)=>{
    // console.log(car_id, car_details);
    const {model, 
        kms_driven, 
        fuel_type, 
        gear_transmission_type, price, city, state, car_img} = car_details;
    try {
        const result = await connection.query(`UPDATE cars SET model='${model}', kms_driven=${kms_driven},fuel_type='${fuel_type}', gear_transmission_type='${gear_transmission_type}', price='${price}', city='${city}', state='${state}', car_img='${car_img}' WHERE car_id='${car_id}';`);
        
        return result;
    } catch (error) {
        console.log('cannot update user', error);
    }
}
module.exports = { getAllCars, getCarById, addCar, deleteCarByID, updateCar };