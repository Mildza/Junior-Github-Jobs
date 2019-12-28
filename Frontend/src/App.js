import React, { useEffect } from 'react';
import './App.css';

import Jobs from './components/Jobs/Jobs';

function App() {
  const [jobList, setJobList] = React.useState([]);

  useEffect(() => {
    fetchJobs(setJobList);
  }, [])

  async function fetchJobs(updateCb) {
    const res = await fetch('/api/jobs');
    let json = await res.json();
    updateCb(json);
  }

  return jobList ?
    (
      <div className="container">
        <Jobs jobs={jobList} />
      </div>
    ) : <div className='loader'></div>
}

export default App;
