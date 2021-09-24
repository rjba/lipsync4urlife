function createResponse() {
  //important imports
  var m = require("Mustache")

  var date = new Date()
   //use of template
   //declaration of template
   var template = '{"heure":"{{heure}}", "minute":"{{minute}}"}'
   //Datas for template
   var data = {
          heure: date.getHours(),
          minute: date.getMinutes()
      };
	return JSON.parse(m.render(template, data));
}
module.exports = {createResponse};
