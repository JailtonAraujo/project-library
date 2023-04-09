# Project library

System of a library made in Rest arquiteture separated into microservices, Book and Customers Service made in NodeJS, CheckIn Service made in Java and Spring, CheckOut Service made in Java and Spring, E-mail Service made in NodeJS and the FrontEnd made in React. all services communicate via messaging with Apache Kafka.



# Book and Customers Service:
* Here you can see all the books available for checkIn, Search by Name and Category also register new Book: 

![Captura de tela 2023-04-08 224746](https://user-images.githubusercontent.com/90009939/230750855-09a2ab30-156e-4f0b-8c1a-97306f8ba54b.png)

* Pagination also implemented for higher performance:

![Captura de tela 2023-04-08 224820](https://user-images.githubusercontent.com/90009939/230750885-e8655f46-dcdf-409a-954d-19991573278b.png)

* When selecting a book you have the options to make chackIn, Delete and Update:

![Captura de tela 2023-04-08 232524](https://user-images.githubusercontent.com/90009939/230751101-3925e00d-68c1-40d0-9d9b-0923f83b01b3.png)

* This is the Book Form Componente where you can register new n book or update an existing book:

![Captura de tela 2023-04-08 232649](https://user-images.githubusercontent.com/90009939/230751164-9e8b926c-5374-4018-b803-4f2b1427a96c.png)

* Here is the Customers options:

![Captura de tela 2023-04-08 224845](https://user-images.githubusercontent.com/90009939/230751546-6e5a4d68-cea9-412e-9e21-46fc4d968a61.png)

# CheckIn Service:
* Here you selected a customer and confirme checkIn. **OBS: if the customer already has a pending check-in with this book, the check-in will not be confirmed:** 

![Captura de tela 2023-04-08 233851](https://user-images.githubusercontent.com/90009939/230751439-fbc2825e-7e68-4d2b-843e-98679526ea47.png)

* Here you can view all pending check-ins, search by customer or date range, view check-in details or check-out:

![Captura de tela 2023-04-08 224959](https://user-images.githubusercontent.com/90009939/230751888-4c370d25-1be2-4feb-9cee-4b0928e84e79.png)

* Check-in details, note that if the customer does not return before the set date, fees will be charged:

![Captura de tela 2023-04-08 225213](https://user-images.githubusercontent.com/90009939/230752098-6152c238-fda2-48b4-bc09-1ffa875058e8.png)

# CheckOut Service:
* Here you can view all checkOuts, search by customer or date range, view checkOut details:

![Captura de tela 2023-04-08 225331](https://user-images.githubusercontent.com/90009939/230752207-0dc09d38-cccb-46c9-95fd-69bfc9971388.png)

* Check-Out details, note that if the customer does not return before the set date, fees will be charged:

![Captura de tela 2023-04-08 225407](https://user-images.githubusercontent.com/90009939/230752287-b6527152-d47b-4466-890a-5e4d64421516.png)

# E-mail Service:
* this is an example of a confirmed check-in email:

![Captura de tela 2023-04-09 002135](https://user-images.githubusercontent.com/90009939/230752485-d17f05c3-fe9b-461b-a0e1-2e7cc8a0caf9.png)

* this is an example of a confirmed check-out email:

![Captura de tela 2023-04-09 002110](https://user-images.githubusercontent.com/90009939/230752500-b799b7ee-e48e-4569-95ff-103dc2e75400.png)

# Apache kafka topics:





