import { environment } from "../environments";

import { Customer } from "../interfaces/Customer";

const customerEndPoint = `${environment.baseApicustomersAndBooks}/customer`;

const newCustomer = async (customer:any) =>{

    const config:any = {
        method:'POST',
        body:JSON.stringify(customer),
            headers: {
                "Content-type":"application/json",
            }
        
    }

    try {

        console.log(customer)
        
        const data = await fetch(`${customerEndPoint}/`,config)
            .then((res)=>res.json())
            .catch((err)=>err);

        return data;

    } catch (error) {
        console.log(error);    
    }

}

const getAll = async (offset:number) => {

    try {
        
        const data = await fetch(`${customerEndPoint}/?offset=${offset}`)
            .then((res)=>res.json())
            .catch((err)=>err);

            return data;

    } catch (error) {
        console.log(error);
    }

}

const deleteCustomer = async (id:number) =>{

    const config = {
        method:'DELETE'
    }

    try {
        
        const data = await fetch(`${customerEndPoint}/${id}`,config)
            .then((res)=>res.json())
            .catch((err)=>err);

        return data;

    } catch (error) {
        console.log(error);
    }

}

const findById = async (id:number) =>{

    try {
        
        const data = await fetch(`${customerEndPoint}/${id}`)
            .then((res)=>res.json())
            .catch((err)=>err);

        return data;

    } catch (error) {
        console.log(error);
    }

}

const updateCustomer = async (customer:any) =>{

    const config={
        method:'PATCH',
        body:JSON.stringify(customer),
        headers: {
            "Content-type":"application/json",
        }
    }

    try {
        
        const data = await fetch(`${customerEndPoint}/update`,config)
            .then((res)=>res.json())
            .catch((err)=>err);

        return data;

    } catch (error) {
        console.log(error);
    }

}

const finByName = async (name:string,offset:number) =>{

    try {
        
        const data = await fetch(`${customerEndPoint}/search/name?name=${name}&offset=${offset}`)
            .then((res)=>res.json())
            .catch((err)=>err);

        return data;

    } catch (error) {
        console.log(error);
    }

}

const customerServices = {
    newCustomer,
    getAll,
    deleteCustomer,
    findById,
    updateCustomer,
    finByName
}

export default customerServices;