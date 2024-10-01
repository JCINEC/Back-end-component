const userModel = require('../models/userModel') // Import the user model
const bcrypt = require('bcrypt') // For hashing passwords
//const jwt = require('jsonwebtoken')


const registerUserController = async (req, res) => {

  const { firstName, lastName, userName, email, password, birthDate, hasDriverLicense, paymentMethod } = req.body

  if (typeof firstName !== "string" || firstName.trim() === "" || 
      typeof lastName !== "string" || lastName.trim() === "" || 
      typeof userName !== "string" || userName.trim() === "" || 
      typeof password !== "string" || password.trim() === "" || 
      typeof email !== "string" || email.trim() === "" || 
      !birthDate || 
      typeof birthDate.year !== "number" || birthDate.year < 1900 || 
      typeof birthDate.month !== "number" || birthDate.month < 1 || birthDate.month > 12 || 
      typeof birthDate.day !== "number" || birthDate.day < 1 || birthDate.day > 31 ||
      typeof paymentMethod !== "string" || paymentMethod === "") {
    return res.status(400).json({ message: 'Fields filled unproperly'})
  }

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newBirthDate = Number(`${birthDate.year}${(birthDate.month < 10 ? '0' : '')}${birthDate.month}${(birthDate.day < 10 ? '0' : '')}${birthDate.day}`)

    // Create a new user instance
    const newUser = new userModel({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      birthDate: newBirthDate,
      hasDriverLicense,
      paymentMethod,
      joinedRoutes: [],
    })

    // Save the user to the database
    await newUser.save()

    return res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}


const loginUserController = async (req, res) => {

  const { email, password } = req.body

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // I wont use the token of 1h, because I prefer let the user to logout
    //const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' })

    return res.status(200).json({ message: 'Login successful'/*, token*/ })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getRoutesFromUser = async (req, res) => {

    const userName = req.params.userName //Lo ideal es obtener el userId desde un middleware que descifre el token en JWT....
    console.log('userName',userName);
    
    const resUserInfo = await getUserInfo(userName)
  
    res.status(200).send({user: resUserInfo})
} 

module.exports = {registerUserController, loginUserController, getRoutesFromUser}
