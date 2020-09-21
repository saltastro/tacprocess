import React from 'react'

const FailToLoad = () => (
  <div>
    <div className='dim-screen-fail'>
        <div id='emoticons'>
          <div className='emoti' data-emoti='sad'/>
        </div>
      <div>
        <h2>Oops. Data download failed.</h2>
        <h2>Please refresh the page and, if necessary, login again  </h2>
        <h2>If this message persist please contact SALT help.</h2>
      </div>
    </div>
  </div>
)

export default FailToLoad