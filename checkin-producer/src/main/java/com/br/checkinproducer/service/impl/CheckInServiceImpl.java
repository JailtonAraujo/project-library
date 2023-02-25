package com.br.checkinproducer.service.impl;

import com.br.checkinproducer.model.Book;
import com.br.checkinproducer.model.Order;
import com.br.checkinproducer.repository.BookRepository;
import com.br.checkinproducer.repository.CustomerRepository;
import com.br.checkinproducer.repository.OrderRepository;
import com.br.checkinproducer.service.CheckInService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.NoResultException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Optional;

@Log4j2
@RequiredArgsConstructor
@Service
public class CheckInServiceImpl implements CheckInService {

    private final BookRepository bookRepository;

    private final CustomerRepository customerRepository;

    private final OrderRepository orderRepository;

//    private final KafkaTemplate<String, Serializable> kafkaTemplate;

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

        if(!customerRepository.customerExists(customerId)){
            throw new NoResultException("Customer not found!");
        }
        return true;
    }

    @Override
    public void changeBookQuantity(int quantity,Long bookId) {

        final int bookQuantity = bookRepository.getQuantity(bookId);

        if(bookQuantity >= quantity){
            bookRepository.changeQuantityBook((bookQuantity-quantity),bookId);
        }

    }


    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    @Override
    public Order createOrder(Order order) {

        //verify if customer exists
        checkIfCustomerExists(order.getCustomer().getId());

        //Verify if Book is available
        checkBookIsAvailable(order.getBook().getId());

        //change quantity book
        changeBookQuantity(1,order.getBook().getId());

        order.setCheckin_date(LocalDate.now());
        order.setCheckout_date(LocalDate.now().plusDays(10));
        order.setValor(15.10F);

        Order orderCreated = orderRepository.save(order);

//        log.info("Order sent with id: {}",orderCreated.getId());
//
//        kafkaTemplate.send("checkin-topic",orderCreated);

        return orderCreated;
    }
}
