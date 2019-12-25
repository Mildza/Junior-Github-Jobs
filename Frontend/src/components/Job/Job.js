import React from 'react'
import moment from 'moment'
import './Job.css'

const Job = ({ job, clicked }) => {

  return (
    <div className="row job" onClick={clicked}>
      <div className="col-md-7 job-description">
        <h4 className="job-title">{job.title}</h4>
        <h5 >{job.company}</h5>
        <h6 className="job-location">{job.location}</h6>
      </div>
      <div className="col-md-5 job-item-date">
        <div className="job-logo" >
          <img src={job.company_logo} alt={job.company} />
        </div>
        <div className='job-date'>
          <p>{moment(job.created_at).format('llll')}</p>
        </div>
      </div>
    </div>
  )
}

export default Job