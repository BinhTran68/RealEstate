const asyncHandler = require("express-async-handler");
const redis  = require("../config/redis.config")

const clientTwilio = require('twilio')(process.env.TWILI0_ACCOUNT_SID, process.env.TWILI0_AUTH_TOKEN);

const createOTP = asyncHandler(async (req, res, next) => {
    const  { phoneNumber }  = req.body;
    const redisKey = `otp:${phoneNumber}`;
    const otp = generateOTP();
    await  redis.set(redisKey, otp,{
        EX: process.env.OTP_TTL,
    });

    // Can't send OTP to message
    clientTwilio.messages
        .create({
            body: `Mã xác thực Happy Home của bạn là ${otp}`,
            to: phoneNumber,
            from: '+12513021899',
        })
        .then((message) => {
            console.log("Tin nhắn đã được gửi:", message.sid);
            return res.status(200).json("Tin nhắn đã được gửi thành công");
        })
        .catch((error) => {
            console.error("Lỗi khi gửi tin nhắn:", error);
            return res.status(500).json("Đã xảy ra lỗi khi gửi tin nhắn")
        });

})

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // Tạo số ngẫu nhiên có 6 chữ số
}

module
    .exports = {
    createOTP
}