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

const checkInService = {
    createCheckIn
}

export default checkInService;