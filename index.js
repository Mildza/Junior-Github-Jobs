const express = require('express')
const app = express()

const CronJob = require('cron').CronJob;
const fetchGithub = require('./github')

let jobs

const getAsync = async () => {
  new CronJob('1 */1 * * *', fetchGithub, null, true, 'America/Los_Angeles');
  jobs = await fetchGithub();
}
getAsync()
app.get('/api/jobs', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  return res.send(jobs)
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static('Frontend/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"))
  })
}

app.listen(process.env.PORT || 3001, () => console.log(`Its starts`))