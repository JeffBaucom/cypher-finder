var Event = require('../models/event');
var mongoose = require('mongoose');

module.exports = function(app, express) {
    var eventsRouter = express.Router();

    eventsRouter.route('/')
        .post(function(req, res) {
            if (!req.body) return res.sendStatus(400);
            // reate a new instance of the event model
            var event = new Event();

            //set the event information
            event.name = req.body.name;
            event.address = req.body.address;
            event.lat = req.body.lat;
            event.lng = req.body.lng;
            event.start = req.body.start;
            event.end = req.body.end;
            event.styles = req.body.styles;
            event.kind = req.body.kind;
            event.about = req.body.about;
            console.log(event);

            // save and check for errors
            event.save(function(err) {
                if (err) {
                    // duplicate entry
                    console.log('error');
                    if (err.code == 11000) {
                        return res.json({ success: false, message: 'already exists'});
                    } else {
                        return res.send(err);
                    }
                    
                } else {
                    console.log('success');
                    res.send(time);
                    res.json({message: 'event created!'});
                    mongoose.disconnect(function () {
                        console.log('disc');
                    });
                }

            });
        })

        .get(function(req, res) {
            Event.find(function(err, events) {
                if(err) res.send(err);

                // return the events
                res.json(events);
            });
        });
    eventsRouter.route('/:event_id')
        
        // get the event with this id
        .get(function(req, res) {
            Event.findById(req.params.event_id, function(err, event) {
                if (err) { res.send(err)};
                // return the event
                res.json(event);
            });
        })

        .put(function(req, res) {
            Event.findById(req.params.event_id, function(err, event) {
                if (err) { res.send(err)};
                                
                if (req.body.name) event.name = req.body.name;
                if (req.body.address) event.address = req.body.address;
                if (req.body.lat) event.lat = req.body.lat;
                if (req.body.lng) event.lng = rq.body.lng;
                if (req.body.start) event.start = req.body.start;
                if (req.body.end) event.end = req.body.end;
                if (req.body.styles) event.styles = req.body.styles;
                if (req.body.kind) event.kind = req.body.kind;
                if (req.body.abou) event.about = req.body.about;
                
                event.save(function(err) {
                    if (err) res.send(err);
                    
                    res.json({ message: 'Event updated'});
                });
            });
        })
        
        .delete(function(req, res) {
            Event.remove({
                _id: req.params.event_id
            }, function(err, event) {
                if (err) return res.send(err);
                
                res.json({ message: 'Event deleted' });
            });
        });


    return eventsRouter;
};
