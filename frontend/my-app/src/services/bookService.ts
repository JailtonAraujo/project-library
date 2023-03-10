import { environment } from '../environments';

const bookEndPoint = `${environment.baseApicustomersAndBooks}/book`;


const findAllBooks = async () => {

    try {

        const data = await fetch(`${bookEndPoint}/`)
            .then((res) => res.json())
            .catch((err) => err);

            console.log(data)

        return data;

    } catch (error) {
        console.log(error);
    }

}

const bookService = {
    findAllBooks
}

export default bookService;