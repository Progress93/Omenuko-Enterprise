const user = require('../models/Users');

//create user
exports.createUser = async (req, res) => {
    try {
        // request body validation
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is missing' });
        }
    }
        //check if all required fields are provided
if (!email || !password || !name || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
}

        // Email check
        const existingUser = await user.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // phone number check
        const existingPhone = await user.findOne({ phone: req.body.phone });
        if (existingPhone) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }

       // encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create user
        const newUser = new user({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });

        //check if user exists
        const user = await user.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //check if password is correct
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
