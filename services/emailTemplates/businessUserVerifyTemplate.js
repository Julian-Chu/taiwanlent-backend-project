const keys = require('../../config/key');
module.exports = (user) => {
  return `
  <html> 
  <body>
    <div style="text-align: center;">
      <h3>Hi ${user.name},  Welcome to Taiwanlent!</h3>
      <p> Please verify your registry</p>
      <div>
        <a href="${keys.redirectDomain}/auth/business/verification?vtoken=${user.verifyToken}">Verify account</a>
      </div>
    </div>
  </body>

</html>
  
  
  
  `
}