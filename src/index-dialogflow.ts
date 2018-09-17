import expressApp from './app-dialogflow'

const port = process.env.PORT || 3000

expressApp.listen(port, (err) => {
    if (err) return console.log(err)
    return console.log(`DialgogFlow Test for Prod server is listening on ${port}`)
})