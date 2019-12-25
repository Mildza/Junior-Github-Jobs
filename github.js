const fetch = require('node-fetch');

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithub() {
  console.log('fetching github')
  let resultCount = 1, onPage = 0;
  const allJobs = [];

  while (resultCount > 0) {
    const res = await fetch(`${baseURL}?page=${onPage}`);
    const jobs = await res.json();
    allJobs.push(...jobs);
    resultCount = jobs.length;
    console.log('got', resultCount, 'jobs');
    onPage++;
  }
  console.log('got', allJobs.length, 'jobs total')

  const jrJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();
    if (
      jobTitle.includes('senior') ||
      jobTitle.includes('manager') ||
      jobTitle.includes('sr.') ||
      jobTitle.includes('architect') ||
      jobTitle.includes('back-end') ||
      jobTitle.includes('test') ||
      jobTitle.includes('tester') ||
      jobTitle.includes('data') ||
      jobTitle.includes('.net')
    ) {
      return false
    }
    return true;
  })
  console.log('filtered down to', jrJobs.length);
  return jrJobs
}

module.exports = fetchGithub;