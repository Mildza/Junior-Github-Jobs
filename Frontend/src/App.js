import React from 'react';
import './App.css';

import Jobs from './components/Jobs/Jobs';

async function fetchJobs(updateCb) {
  const res = await fetch('/api/jobs');
  let json = await res.json();
  updateCb(json);
}

function App() {
  const [jobList, setJobList] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(setJobList);
  }, [])

  return (
    <div className="container">
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;
