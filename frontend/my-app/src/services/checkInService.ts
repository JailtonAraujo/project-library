import { environment } from "../environments";
import { Checkin } from "../interfaces/CheckIn";

const checkInBaseUrl = `${environment.checkInService}/checkin`;


const createCheckIn = async (checkIn:Checkin) =>{

    const config = {
        method:'POST',
        body:JSON.stringify(checkIn),
        headers: {
            "Content-type":"application/json",
        }
    }

    try {
        
        const data = await fetch(`${checkInBaseUrl}/`,config)
            .then((res)=>res.json())
            .catch((err)=>err={err,error:true,message:'Ocorreu um erro inesperado, tente mais tarde!'});

            return data;

    } catch (error) {
        console.log(error);

        const data = {
            error
        }

        return data;
    }   
}


const findAll = async (offset:number) => {
    
    try {
        
        const data = await fetch(`${checkInBaseUrl}/?offset=${offset}`)
            .then((res)=>res.json())
            .catch((err)=>err);

        return data;

    } catch (error) {
        console.log(error);
    }
    
}


const findByCustomerName = async (offset:number,name:string) => {
    
    try {
        
        const data = await fetch(`${checkInBaseUrl}/customer/?name=${name}&offset=${offset}`)
            .then((res)=>res.json())
            .catch((err)=>err);

        return data;

    } catch (error) {
        console.log(error);
    }
    
}

const findByDateInterval = async (offset:number,intialDate:string,finalDate:string) => {
    
    try {
        
        const data = await fetch(`${checkInBaseUrl}/date/?initial=${intialDate}&final=${finalDate}&offset=${offset}`)
            .then((res)=>res.json())
            .catch((err)=>err);


        return data;

    } catch (error) {
        console.log(error);
    }
    
}



const checkInService = {
    createCheckIn,
    findAll,
    findByCustomerName,
    findByDateInterval
}

export default checkInService;