exports.get404 = (req, res, next) => {
    res.status(404).send(`<html>Go to home page ===> <a href=http://16.16.160.192:3000/login.html>click me</a></html>`)
}