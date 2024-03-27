const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');


const app = express();
app.use(cors());

app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://kaviya:kaviyapriya@cluster0.phhsteg.mongodb.net/db_lms?retryWrites=true&w=majority';

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const RoleSchema = new mongoose.Schema({
    role_name: { type: String, required: true },
    description: { type: String, required: true }
});

const Role = mongoose.model('Role', RoleSchema, 'role');

const UserSchema = new mongoose.Schema({
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    last_login: { type: Date, default: Date.now },
    status: { type: String, default: 'active' }
});

UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hashedPassword => {
            user.password = hashedPassword;
            next();
        })
        .catch(error => next(error));
});

const User = mongoose.model('User', UserSchema, 'user');

app.post('/register', (req, res) => {
    const { first_name, last_name, email, phone_number, password } = req.body;

    let role_id;
    let roleQueryPromise;
    if (email.endsWith('@admin.com')) {
        roleQueryPromise = Role.findOne({ role_name: 'admin' });
    } else if (email.endsWith('@tutor.com')) {
        roleQueryPromise = Role.findOne({ role_name: 'tutor' });
    } else {
        roleQueryPromise = Role.findOne({ role_name: 'Learner' });
    }

    roleQueryPromise.then(role => {
        role_id = role._id;

        const newUser = new User({
            role_id,
            first_name,
            last_name,
            email,
            phone_number,
            password
        });

        return newUser.save();
    }).then(newUser => {
        console.log('User saved successfully:', newUser);
        res.json(newUser);
    }).catch(error => {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    });
});

// server.js

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            return bcrypt.compare(password, user.password)
                .then(validPassword => {
                    if (!validPassword) {
                        return res.status(400).json({ error: 'Invalid email or password' });
                    }
                    console.log('User logged in:', user);
                    res.json(user);
                });
        })
        .catch(error => {
            console.error('Error logging in:', error);
            res.status(500).json({ error: 'Failed to log in' });
        });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
