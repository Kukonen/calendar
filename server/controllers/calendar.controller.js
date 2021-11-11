const Calendar = require('../model/Calendar');

class CalendarController {
    async activity(req, res) {
        const {date} = req.body;
        const key = req.cookies.key;

        const calendar = await Calendar.findOne({key});

        if (!calendar) {
            return res.json({
                status: "error",
                discription: "user not loggin"
            })
        }

        const activity = calendar.filter(activity => activity.date === date);
    }
}

module.exports = new CalendarController();