class AuthController {
    async register(req, res) {
        res.json({
            "register": "ok"
        })
    }

    async login(req, res) {
        res.json({
            "login": "ok"
        })
    }
}

module.exports = new AuthController();