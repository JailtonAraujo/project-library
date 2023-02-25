
//patttern dd/MM/yyyy
const formatDate = (dataToParse) =>{

    let data = new Date(dataToParse),

    dia  = data.getDate().toString().padStart(2, '0'),
    mes  = (data.getMonth()+1).toString().padStart(2, '0'),
    ano  = data.getFullYear();
    
return `${dia}/${mes}/${ano}`;

}


module.exports={formatDate}