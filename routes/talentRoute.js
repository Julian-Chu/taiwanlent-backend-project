// @ts-check
'use strict'

module.exports = app => {
  
  // 當沒有token或token.verified != true,  回傳人才部分資訊
  // 針對已驗證的登入使用者回傳全部人才資訊
  app.get('/api/talents',()=>{
    
  });

  app.post('/api/candidates/message',()=>{

  })
}