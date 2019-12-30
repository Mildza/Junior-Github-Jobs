import React, { useState } from 'react'
import Job from '../Job/Job';
import JobsModal from './JobsModal'
import './Jobs.css'


export default function Jobs({ jobs }) {

  const [open, setOpen] = useState(false)
  const [job, selectedJob] = useState({})

  const openModal = (job) => {
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }

  const numJobs = jobs.length;
  let numPages = Math.ceil(numJobs / 50);
  const [activeStep, setActiveStep] = useState(0);

  const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50) + 50);

  const handlePage = (page) => {
    setActiveStep(page - 1)
    scrollToTop();
  }

  const pages = () => {
    const pageArr = []
    for (let i = 1; i < numPages + 1; i++) {
      pageArr.push(<li className="page-item" key={i}><a className={`page-link ${activeStep + 1 === i ? 'active' : ''}`} onClick={handlePage.bind(this, i)} href="#" >{i} </a></li>)
    }
    return pageArr
  }

  function scrollToTop() {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.scrollTo(0, 0);
    }
  };

  function handleNext() {
    setActiveStep(prevActiveStep => {
      if (prevActiveStep === numPages) {
        return prevActiveStep
      }
      return prevActiveStep + 1
    })
    scrollToTop();
  }

  function handleBack() {
    setActiveStep(prevActiveStep => {
      if (prevActiveStep === 0) {
        return prevActiveStep
      }
      return prevActiveStep - 1
    })
    scrollToTop();
  }

  return (
    <>
      {jobs.length > 0 &&
        <div className="col-md-8 offset-md-2">
          <h2 className="text-center">Junior Github Jobs</h2>
          <h5 className="text-right">Found {numJobs} Jobs</h5>
          {jobsOnPage.map((job, i) => <Job key={i} job={job}
            clicked={() => {
              openModal()
              selectedJob(job)
            }} />
          )}
          <div className="page-num">Page <span>{activeStep + 1} / {numPages}</span></div>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className={`page-link ${activeStep === 0 ? 'disabled' : ''}`} tabIndex="-1" onClick={handleBack}>Previous</a>
              </li>
              {}
              {pages()}
              <li className="page-item">
                <a className={`page-link ${activeStep === numPages - 1 ? 'disabled' : ''}`} onClick={handleNext}>Next</a>
              </li>
            </ul>
          </nav>
          <JobsModal open={open} closeModal={closeModal} job={job} />
        </div>
      }
    </>
  )
}