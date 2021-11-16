const Calendar = require('../model/Calendar');
const uuid = require('uuid');

class CalendarController {
    async getActivity(req, res) {
        const {date} = req.body;
        const key = req.cookies.key;

        const calendar = await Calendar.findOne({key});

        if (!calendar) {
            return res.status(401).json({
                discription: "user not loggin"
            })
        }
    }

    async setActivity(req, res) {
        const {date, note} = req.body;
        const key = req.cookies.key;

        const calendar = await Calendar.findOne({key});

        if (!calendar) {
            return res.status(404).json({
                discription: "calendar not found"
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
            return res.status(401).json({
                discription: "user are not login"
            })
        }

        const calendar = await Calendar.findOne({key});

        if (!calendar) {
            return res.status(400).json({
                discription: "user have not calendar"
            })
        }

        return res.status(200).json({
            activity: calendar.activity
        })
    }

    async deleteNote(req, res) {
        const key = req.cookies.key;

        if (!key) {
            return res.status(401).json({
                discription: "user are not login"
            })
        }

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
            return res.status(400).json({
                discription: "user have not calendar"
            })
        }

        let activity = calendar.activity;

        const idxActivity = activity.map(act => act.date).findIndex(actDate => 
            actDate === calendarDate.getTime()
        );

        if (idxActivity === -1) {
            return res.status(400).json({
                discription: "no such note in calendar"
            })
        } else {
            const idxDay = activity[idxActivity].notes.map(notes => notes.day).indexOf(day);

            if (idxDay === -1) {
                return res.status(400).json({
                    discription: "no such note in calendar"
                })
            } else {
                if (activity[idxActivity].notes.length > 1) {
                    activity[idxActivity].notes.splice(idxDay ,1);
                } else {
                    if (activity.length > 1) {
                        activity.slice(idxDay ,1);
                    } else {
                        activity = []
                    }
                }

                await Calendar.findOneAndUpdate({key}, {activity})

                return res.status(200);
            }
        }
    }

    async saveNote(req, res) {
        const key = req.cookies.key;

        if (!key) {
            return res.status(401).json({
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

            return res.status(200)
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
        }

        await Calendar.findOneAndUpdate({key}, {activity})

        return res.status(200);
    }
}

module.exports = new CalendarController();