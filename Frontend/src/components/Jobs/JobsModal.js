import React from 'react'
import './JobsModal.css'

const JobsModal = ({ open, closeModal, job }) => {

  const handleChildClick = (e) => {
    e.stopPropagation();
  }

  return (
    <>
      {open &&
        <div id="dialog" className="cover" onClick={closeModal}>
          <div className="modal-dialog" role="document" onClick={handleChildClick}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{job.title}</h5>
                <button type="button" className="close"
                  onClick={closeModal}
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" dangerouslySetInnerHTML={{ __html: job.description }}>
              </div>
              <div className="modal-footer">
                <a href={job.url} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-success">Aplly</button></a>
                <button type="button" className="btn btn-danger"
                  onClick={closeModal}
                >Close</button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default JobsModal
