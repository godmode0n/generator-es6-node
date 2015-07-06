var art = require('ascii-art');

module.exports = function logo(){
  return art.font('godmode', 'Doom', 'yellow')
    .font('0n', 'Doom','red')
    .font('!', 'Doom', 'blue',function(logo){
      console.log(logo);
    });
}
