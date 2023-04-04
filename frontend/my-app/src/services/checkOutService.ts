import { environment } from "../environments";
import { CheckOut } from "../interfaces/CheckOut";

const urlCheckOutService = environment.checkOutService;

const createCheckOut = async ( checkOut:CheckOut ) => {

    const config = {
        method:"POST",
        body:JSON.stringify(checkOut),
        headers: {
            "Content-type":"application/json",
        }
    }

    try {
        
        const data = await fetch(`${urlCheckOutService}/`,config)
            .then((res)=>res.json())
            .catch((err)=> err={err,error:true,message:'Ocorreu um erro inesperado, tente mais tarde!'} );

            return data;

    } catch (error) {
        console.log(error);        
    }

}


const findAll = async (offset:number) =>{

    try {
        
        const data = await fetch(`${urlCheckOutService}/?offset=${offset}`)
            .then((res)=>res.json())
            .catch((err)=>err);

            return data;

    } catch (error) {
        console.log(error);
    }

}



const findByCustomer = async (offset:number, name:string) =>{

    try {
        
        const data = await fetch(`${urlCheckOutService}/customer/?name=${name}&offset=${offset}`)
            .then((res)=>res.json())
            .catch((err)=>err);

            return data;

    } catch (error) {
        console.log(error);
    }

}

const findByDateInterval = async (offset:number, initialDate:string, finalDate:string) =>{

    try {
        
        const data = await fetch(`${urlCheckOutService}/date/?initial=${initialDate}&final=${finalDate}&offset=${offset}`)
            .then((res)=>res.json())
            .catch((err)=>err);

            return data;

    } catch (error) {
        console.log(error);
    }

}

const checkOutService = {
    createCheckOut,
    findAll,
    findByCustomer,
    findByDateInterval
}

export default checkOutService;