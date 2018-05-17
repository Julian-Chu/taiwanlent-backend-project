
async function hashPassword(plainTextPassword){
  const saltRounds = 10;
  const hashPassword = await new Promise((resolve, reject)=>{
    bcrypt.hash(plainTextPassword, saltRounds, (err, res)=>{
      if(err) reject(err);
      resolve(res);
    });
  })

  return hashPassword;
};

function createTokenForUser(user) {
  // console.log('jwt key:', keys.jwtSecretKey);
  // console.log('user:', user);
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.userId,
    iat: timestamp,
    verified: user.emailVerified || false
  }, keys.jwtSecretKey)
};


async function comparePassword(hashedPassword, hashFromDB){
  const isEqual = await new Promise((resolve, reject)=>{
    bcrypt.compare(hashedPassword, hashFromDB,(err,res)=>{
      if(err) reject(err);
      resolve(res);
    });
  })
  return isEqual;
};


module.exports ={
  hashPassword,
  createTokenForUser,
  comparePassword
}