var translated = require("google-translate-api");

//   function translate(param){
//   translated(param, {from: 'ro', to: 'en'}).then(res => {
//     console.log(res.text);
//     document.getElementById("translatedField").value=res.text;
// }).catch(err => {
//     console.error(err);
// });
// }
function translate()
{translated('salut', {from: 'ro', to: 'en'}).then(res => {
    console.log(res.text);});
}