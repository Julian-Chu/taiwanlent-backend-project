module.exports = (businessUser, talent) => {
  return `
  <html> 
  <body>
    <div style="text-align: center;">
      <h3>Here is Taiwanlent. ${businessUser.Name} would like to contact you</h3>
      <h4>Job Description: </h4>
      <p>
        ${businessUser.jobDesc}
      </p>
      <label>Please Contact: ${businessUser.email}</label>
      <div>

      </div>
    </div>
  </body>

</html>
  `
}