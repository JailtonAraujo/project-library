package com.br.checkinproducer.service.impl;

import com.br.checkinproducer.model.Book;
import com.br.checkinproducer.model.Order;
import com.br.checkinproducer.repository.BookRepository;
import com.br.checkinproducer.repository.CustomerRepository;
import com.br.checkinproducer.repository.OrderRepository;
import com.br.checkinproducer.service.CheckInService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import javax.persistence.NoResultException;
import java.io.Serializable;
import java.util.Optional;

@Log4j2
@RequiredArgsConstructor
@Service
public class CheckInServiceImpl implements CheckInService {

    private final BookRepository bookRepository;

    private final CustomerRepository customerRepository;

    private final OrderRepository orderRepository;

    private final KafkaTemplate<String, Serializable> kafkaTemplate;

    @Override
    public Boolean checkBookIsAvailable(Long bookId) {

        Optional<Book> optional = bookRepository.findById(bookId);

        //Verify if book exists
        if(optional.isEmpty()){
            throw new NoResultException("Book not found!");
        }
        //verify if book is available
        if(optional.get().getQuantity() == 0){
            throw new ArithmeticException("Book is not available!");
        }

        return true;
    }

    @Override
    public Boolean checkIfCustomerExists(Long customerId) {

        if(customerRepository.findById(customerId).isEmpty()){
            throw new NoResultException("Customer not found!");
        }
        return true;
    }

    @Override
    public Order createOrder(Order order) {

        //verify if customer exists
        checkIfCustomerExists(order.getCustomer().getId());

        //Verify if Book is available
        checkBookIsAvailable(order.getBook().getId());

        Order orderCreated = orderRepository.save(order);

        log.info("Order sent with id: {}",orderCreated.getId());

        kafkaTemplate.send("checkin-topic",orderCreated);

        return orderCreated;
    }
}
