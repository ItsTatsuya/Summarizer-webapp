const redirect=(req, res)=> {
    // Successful authentication, redirect home.
    res.redirect('/');
  }

  module.exports={redirect};