const User = require("../../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { username, email, password, dob } = req.body;

    // Validate request body
    if (!username || !email || !password || !dob) {
        return res.status(400).json({ message: "All fields are required (username, email, password, dob)." });
    }

    try {
        // Check for duplicate username or email
        const duplicateUser = await User.findOne({ username }).exec();
        const duplicateEmail = await User.findOne({ email }).exec();
        if (duplicateUser || duplicateEmail) {
            return res.status(409).json({ message: "Username or email already exists." });
        }

        // Convert DOB to proper format
        const [day, month, year] = dob.split("-");
        const formattedDob = new Date(`${year}-${month}-${day}`);
        formattedDob.setUTCHours(0, 0, 0, 0);

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and store the new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            dob: formattedDob,
        });

        console.log("User created:", newUser);

        res.status(201).json({ success: `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        // Find user by username
        const foundUser = await User.findOne({ username }).exec();
        if (!foundUser) {
            return res.status(401).json({ message: "Invalid username or password." }); // Unauthorized
        }

        // Compare passwords
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        // Generate JWTs
        const accessToken = jwt.sign(
            { username: foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        // Save refreshToken in DB
        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        // Set HTTP-only cookie for refresh token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });

        // Send accessToken in response
        res.status(200).json({ accessToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const logoutUser = async (req, res) => {
    try {
        // Check if the jwt cookie exists
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204); // No content

        const refreshToken = cookies.jwt;

        // Check if refreshToken exists in DB
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser) {
            // Clear cookie even if the user is not found (security best practice)
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204); // No content
        }

        // Remove refreshToken from the user in DB
        foundUser.refreshToken = "";
        const result = await foundUser.save();
        console.log(result);
        // Clear the JWT cookie
        res.clearCookie('jwt', { 
            httpOnly: true, 
            sameSite: 'None', 
            secure: true 
        });

        res.sendStatus(204); // No content (successful logout)
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { registerUser, loginUser,logoutUser };
