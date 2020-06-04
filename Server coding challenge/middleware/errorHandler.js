function errorHandler(error, req, res) {
    console.log("err")
    let movie_ID = req.params;
    let {id, firstName, lastName} = req.body;

    if (!id) {
        res.statusMessage = "Id is missing in the body of the request."
        return res.status(406).end();
    }

    if (id !== movie_ID) {
        res.statusMessage = "id and movie_ID do not match"
        return res.status(409).end();
    }

    if (!firstName || !lastName) {
        res.statusMessage = "You need to send both firstName and lastName of the actor to add to the movie list."
        return res.status(403).end();
    }

    res.next();
}

module.exports = errorHandler;