const validateApiKey = (req, res, next) => {
    const apiKey = req.header('x-api-key');

    if (!apiKey) {
        return res.status(401).json({
            status: 'error',
            message: 'API Key ไม่พบ'
        });
    }

    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({
            status: 'error',
            message: ' API Key ไม่ถูกต้อง'
        });
    }

    next();
};

module.exports = validateApiKey;