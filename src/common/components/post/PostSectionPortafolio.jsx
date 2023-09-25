const PostSectionPortafolio = ({ portafolioData, certifications, bgColor }) => {
  return (
    <>
      <div className={`axil-tech-post-banner ${bgColor || 'bg-color-grey'}`}>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-12 col-md-6 col-12'>
              <div className='row'>
                {portafolioData.map((portafolio, index) => (
                  <div
                    className='col-lg-6 col-md-6 col-sm-6 col-12 mt--30'
                    key={`portafolio-${index}`}
                  >
                    <div className='content-block post-default image-rounded'>
                      <div className='post-content'>
                        <div className='post-cat'>
                          <div className='post-cat-list'>
                            <a className='hover-flip-item-wrapper'>
                              <span className='hover-flip-item'>
                                <span data-text={portafolio.cloud[0]}>
                                  {portafolio.cloud[1]}
                                </span>
                              </span>
                            </a>
                          </div>
                        </div>
                        <h5 className='title'>
                          <a href={portafolio.url}>{portafolio.title}</a>
                        </h5>
                        <br />
                        <div>
                          <span>
                            <h5>Description: </h5>
                            <h6>{portafolio.description}</h6>
                          </span>
                          <span>
                            <h5>Maitainers:</h5>
                            <h6> {portafolio.maitainers[0]}</h6>
                          </span>
                          <br />
                          <h5>Technologies</h5>
                          {portafolio.technologies.map((tech, index) => (
                            <>
                              <h9 key={`tech-${index}`}>{tech}</h9>
                              <br />
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-12 col-md-6 col-12'>
              <div className='row'>
                {certifications.map((certification, index) => (
                  <div
                    className='col-lg-6 col-md-6 col-sm-6 col-12 mt--30'
                    key={`certification-${index}`}
                  >
                    <div className='content-block post-default image-rounded'>
                      <div className='post-content'>
                        <div className='post-cat'>
                          <div className='post-cat-list'>
                            <a className='hover-flip-item-wrapper'>
                              <span className='hover-flip-item'>
                                <span data-text={certification.cloud[0]}>
                                  {certification.cloud[1]}
                                </span>
                              </span>
                            </a>
                          </div>
                        </div>
                        <h5 className='title'>
                          <a href={certification.url}>{certification.title}</a>
                        </h5>
                        <br />
                        <div>
                          <span>
                            <h5>Description: </h5>
                            <h6>{certification.description}</h6>
                          </span>
                          <br />
                          <h5>Skills</h5>
                          {certification.skills.map((skill, index) => (
                            <>
                              <h9 key={`skill-${index}`}>{skill}</h9>
                              <br />
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default PostSectionPortafolio;
