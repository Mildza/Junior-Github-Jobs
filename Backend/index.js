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

app.listen(3001, () => console.log(`Its starts`))