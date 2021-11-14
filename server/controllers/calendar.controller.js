const Calendar = require('../model/Calendar');
const uuid = require('uuid');

class CalendarController {
    async getActivity(req, res) {
        const {date} = req.body;
        const key = req.cookies.key;

        const calendar = await Calendar.findOne({key});

        if (!calendar) {
            return res.json({
                status: "error",
                discription: "user not loggin"
            })
        }
    }

    async setActivity(req, res) {
        const {date, note} = req.body;
        const key = req.cookies.key;

        const calendar = await Calendar.findOne({key});

        if (!calendar) {
            return res.json({
                status: "error",
                discription: "user not found"
            })
        }

        const lastActivity = calendar.activity.filter(activity => activity.date === date);

        let dateWithFirstDay = date;
        dateWithFirstDay.setDate(1);
        const day = date.getDate();

        if (!lastActivity) {
            let calendarWithNewActivity = calendar;
            calendarWithNewActivity.activity.push({
                dateWithFirstDay,
                notes: {
                    day,
                    note
                }
            });

            await Calendar.findOneAndUpdate({key}, {calendar: calendarWithNewActivity});
        }
    }

    async getNote(req, res) {
        const key = req.cookies.key;

        if (!key) {
            return res.json({
                status: "error",
                discription: "user are not login"
            })
        }

        const calendar = await Calendar.findOne({key});

        if (!calendar) {
            return res.json({
                status: "error",
                discription: "user have not calendar"
            })
        }

        return res.json({
            status: "ok",
            activity: calendar.activity
        })
    }

    async deleteNote(req, res) {

    }

    async saveNote(req, res) {
        const key = req.cookies.key;

        if (!key) {
            return res.json({
                status: "error",
                discription: "user are not login"
            })
        }

        const {note} = req.body;
        const date = new Date(req.body.date);

        const day =  date.getDate();

        let calendarDate =  date;
        calendarDate.setDate(1);
        calendarDate.setHours(1);
        calendarDate.setMinutes(1);
        calendarDate.setSeconds(1);
        calendarDate.setMilliseconds(1);

        const calendar = await Calendar.findOne({key});

        if (!calendar) {

            const id = uuid.v4();

            await new Calendar({id, key, activity: [{
                date: calendarDate.getTime(),
                notes: {
                    day,
                    note
                }
            }]}).save();

            return res.json({
                status: "ok"
            })
        }

        let activity = calendar.activity;

        const idxActivity = activity.map(act => act.date).findIndex(actDate => 
            actDate === calendarDate.getTime()
        );

        if (idxActivity === -1) {
            activity.push({
                date: calendarDate.getTime(),
                notes: [
                        {
                            day,
                            note
                        }
                ]
            })
        
        } else {
            const idxDay = activity[idxActivity].notes.map(notes => notes.day).indexOf(day);

            if (idxDay === -1) {
                activity[idxActivity].notes.push({
                    day,
                    note
                })
            } else {
                activity[idxActivity].notes[idxDay].note = note;
            }

            activity[idxActivity].notes
        }

        await Calendar.findOneAndUpdate({key}, {activity})

        return res.json({
            status: "ok"
        })
    }
}

module.exports = new CalendarController();