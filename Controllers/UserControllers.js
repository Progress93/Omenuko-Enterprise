const User = require('../Models/Users');

//create user
exports.createUser = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is missing' });
        }
//request body
        const { username, email, password, phone, gender, role, hasadminaccess } = req.body;

        //chech if all fields are provided
        if (!email || !password || !username || !phone || !gender || !role || !hasadminaccess) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Email check
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // phone number check
        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(409).json({ message: 'Phone number already exists' });
        }

        // encrypt password
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = new User({
            username:req.body.username,
            email:req.body.email,
            password: hashedPassword,
            phone:req.body.phone,
            gender:req.body.gender,
            role:req.body.role,
            hasadminaccess:req.body.hasadminaccess
        });

    
        await user.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error'});
    }
};




//login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        //check if all required fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        //check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //check if password is correct
        const bcrypt = require('bcryptjs');
        const ispasswordCorrect = await bcrypt.compare(password, user.password);
        if (!ispasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // generate token
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ id: user._id, email: user.email , role: user.role, hasadminaccess: user.hasadminaccess, gender: user.gender, phone: user.phone, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};