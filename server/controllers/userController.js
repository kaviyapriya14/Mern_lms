const bcrypt = require('bcrypt');
const Role = require('../models/role');
const User = require('../models/user');


const registerUser = async (req, res) => {
    const { first_name, last_name, email, phone_number, password } = req.body;

    try {
        let role_id;
        if (email.endsWith('@admin.com')) {
            const adminRole = await Role.findOne({ role_name: 'admin' });
            role_id = adminRole._id;
        } else if (email.endsWith('@tutor.com')) {
            const tutorRole = await Role.findOne({ role_name: 'tutor' });
            role_id = tutorRole._id;
        } else {
            const learnerRole = await Role.findOne({ role_name: 'Learner' });
            role_id = learnerRole._id;
        }

        const newUser = new User({
            role_id,
            first_name,
            last_name,
            email,
            phone_number,
            password
        });

        await newUser.save();
        console.log('User saved successfully:', newUser);
        res.json(newUser);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        console.log('User logged in:', user);
        res.json(user);
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
};

module.exports = {
    registerUser,
    loginUser
};