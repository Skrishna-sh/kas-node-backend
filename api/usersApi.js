const connectDB = require("../config/mysqlDB");
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const getAllUsers = async () => {
    try {
        const connection = await connectDB();
        const [results, fields] = await connection.query('SELECT * from users');
        return results;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const getUserById = async (id) => {
    try {
        const connection = await connectDB();
        const [result] = await connection.query(`select * from users where user_id = ${id} `);
        return result;
        // console.log('user : ', result);
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

// const addUser = async (user_details) => {
//     const { username, password_hash, email, first_name, last_name, phone_number, address, city, state, postal_code, country, date_of_birth } = user_details;
//     try {
//         const connection = await connectDB();
//         const result = await connection.query(`INSERT INTO users (username, password_hash, email, first_name, last_name, phone_number, address, city, state, postal_code, country, date_of_birth)
//             VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`, [
//             username, password_hash, email, first_name, last_name, phone_number, address, city, state, postal_code, country, date_of_birth
//         ]
//         )
//         return result[0];
//     } catch (error) {
//         console.error('Error Inserting user:', error);
//     }
// }

const addUser = async (user_details) => {
    const {
        username,
        password_hash,
        email,
        first_name,
        last_name,
        phone_number,
        address,
        city,
        state,
        postal_code,
        country,
        date_of_birth,
        profile_image
    } = user_details;

    try {
        const connection = await connectDB();
        const query = `
            INSERT INTO users (username, password_hash, email, first_name, last_name, phone_number, address, city, state, postal_code, country, date_of_birth, profile_image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const result = await connection.query(query, [
            username,
            password_hash,
            email,
            first_name,
            last_name,
            phone_number,
            address,
            city,
            state,
            postal_code,
            country,
            date_of_birth,
            profile_image
        ]);
        return result[0];
    } catch (error) {
        console.error('Error inserting user:', error);
    }
}

    const updateUser = async (id, password) => {
        try {
            const connection = await connectDB();
            const result = await connection.query(`Update users set password_hash = '${password}' where user_id = ${id}`)

            return result;
        } catch (error) {
            console.error('Error Updating user:', error);
        }
    }
    const deleteUser = async (id) => {
        try {
            const connection = await connectDB();
            const result = await connection.query(`delete from users where user_id = ${id}`)

            return result;
        } catch (error) {
            console.error('Error Deleting user:', error);
        }
    }
    module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };

