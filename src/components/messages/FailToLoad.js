import React from 'react'

const FailToLoad = () => (
  <div>
    <div className='dim-screen-fail'>
        <div id='emoticons'>
          <div className='emoti' data-emoti='sad'/>
        </div>
      <div>
        <h2>Oops. Data download failed.</h2>
        <h2>Please refresh the page and login again. </h2>
        <h2>If the message persist please contact SALT help at ______________________________</h2>
      </div>
    </div>
  </div>
)

export default FailToLoad