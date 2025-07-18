import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import connectDB from './config/db.js'
import bcrypt from 'bcrypt'
import User from './models/User.js'

dotenv.config()
const app = express() 
const router = express.Router()

//database connection
connectDB()

app.use(express.json())
app.use(cors())
app.use('/api',router)

const PORT = process.env.PORT || 3000

router.get('/',(req,res)=>{
    res.json({message:'Welcome to the Recipe App API'})
})

//Endpoint to handle user registration
const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
}
router.post('/register',async(req,res)=>{
    const {username,email,password,confirmPassword} = req.body
    if(!username || !email || !password || !confirmPassword){
        res.status(400).json({error:'All fields are required!'})
        return
    }
    if(password !== confirmPassword){
        res.status(400).json({error:'Passwords dont match!'})
        return
    }

    const hashedPass = await bcrypt.hash(password,10)
    const code = generateCode()
    const codeExpiry = new Date(Date.now() + 10*60*1000)
    
    const user = await User.create({
        username,email,
        password:hashedPass,
        verificationCode: code,
        codeExpiresAt: codeExpiry,
    })

    //Nodemailer setup for sending verification email
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS 
        }
    })

    await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Your verification code is ${code}. It is valid for 10 minutes.`
    })
    return res.status(201).json({user,message:'Verification email sent to your email address!'})
})

router.post('/verify',async(req,res)=>{
    const {email,code} = req.body
    const user = await User.findOne({email})
    if(!user) return res.status(404).json({error:'User not found!'})

    const now = new Date()
    if(user.verificationCode !== code || user.codeExpiresAt < now){
        return res.status(400).json({error:'Invalid or expired verification code!'})
    }
    user.verified = true
    user.verificationCode = null       
    user.codeExpiresAt = null
    await user.save()

    res.status(200).json({message:'Email verified successfully! You can now login.'})
})

//Endpoint to handle user login
router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400).json({error:'Username and Password are required!'})
        return
    }
    try {
        //find user by email
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({error:'User not found!'})    

        //check if user is verified
        if(!user.verified) return res.status(403).json({error:'Email not verified! Please verify your email first.'})

        //Compare password using bcrypt
        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid) return res.status(401).json({error:'Invalid password!'})
        
        //if everything is fine, return success message
        res.status(200).json({message:'Login successful!', user:{id:user._id, username:user.username, email:user.email}})
    } catch(error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({error:'Internal server error!'})
    }
})

//Server is running
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})