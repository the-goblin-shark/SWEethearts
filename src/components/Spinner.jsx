import React, { Fragment } from 'react';
// import spinner from '../../img/spinner.gif';
const spinner = 'http://static.onemansblog.com/wp-content/uploads/2016/05/Spinner-Loading.gif'

export default () =>
  (
    <Fragment> 
      <img src={spinner} 
          style={{width: '200px', margin:'auto', display:'block'}}
          alt='Loading...'
      />  
    </Fragment>
  )