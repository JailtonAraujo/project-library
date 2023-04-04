package com.br.checkinproducer.service.impl;

import com.br.checkinproducer.DTO.CheckInDTO;
import com.br.checkinproducer.exception.PendingCheckIngException;
import com.br.checkinproducer.model.Book;
import com.br.checkinproducer.model.CheckIn;
import com.br.checkinproducer.model.States;
import com.br.checkinproducer.repository.BookRepository;
import com.br.checkinproducer.repository.CheckInCustomRepository;
import com.br.checkinproducer.repository.CustomerRepository;
import com.br.checkinproducer.repository.CheckInRepository;
import com.br.checkinproducer.service.CheckInService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.NoResultException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Log4j2
@RequiredArgsConstructor
@Service
public class CheckInServiceImpl implements CheckInService {

    private final BookRepository bookRepository;

    private final ModelMapper modelMapper;

    private final CustomerRepository customerRepository;

    private final CheckInRepository checkInRepository;

    private final CheckInCustomRepository checkInCustomRepository;

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

    @Override
    public Boolean checkState(CheckIn checkIn) throws PendingCheckIngException {

        Optional<String> optional = checkInRepository.getState(checkIn.getBook().getId(),checkIn.getCustomer().getId());

        if(!optional.isEmpty() && optional.isPresent()){
            if(optional.get().equalsIgnoreCase(States.PENDING.toString())){
                throw new PendingCheckIngException("you already have a pending order with this book!");
            } else if (optional.get().equalsIgnoreCase(States.LATE.toString())) {
                throw new PendingCheckIngException("you have a late order!");
            }
        }

        return true;
    }


    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    @Override
    public CheckIn createCheckIn(CheckIn checkIn) throws PendingCheckIngException {

        //verify if customer exists
        checkIfCustomerExists(checkIn.getCustomer().getId());

        //Verify if Book is available
        checkBookIsAvailable(checkIn.getBook().getId());

        // check if exists checking pending or late
        checkState(checkIn);

        //change quantity book
        changeBookQuantity(1,checkIn.getBook().getId());

        checkIn.setCheckin_date(LocalDate.now());
        checkIn.setCheckout_date(LocalDate.now().plusDays(10));
        checkIn.setValor(15.10F);
        checkIn.setState(States.PENDING.toString());

        CheckIn checkInCreated = checkInRepository.save(checkIn);

//        log.info("Order sent with id: {}",orderCreated.getId());
//
//        kafkaTemplate.send("checkin-topic",orderCreated);

        return checkInCreated;
    }

    @Override
    public Page<CheckInDTO> getAllCheckIn(Integer offset)  {

        return checkInCustomRepository.getAll(offset,10);


    }

    @Override
    public Page<CheckInDTO> getAllByUserName(Integer offset, String name) {

        return checkInCustomRepository.getAllByUserName(offset,10,name);
    }

    @Override
    public Page<CheckInDTO> getAllByDateInterval(Integer offset,LocalDate initialDate, LocalDate finalDate) {

        return checkInCustomRepository.getAllByDateInterval(offset,10,initialDate,finalDate);
    }

    public CheckInDTO convertModelInDTOAndCalTaxa ( CheckIn checkIn ) {

        final float lateFeePerDay = 1.5F;
        int daysLate = 0;
        float taxaAtraso = 0F;

        if(checkIn.getCheckout_date().isBefore(LocalDate.now())){

            daysLate = (int) ChronoUnit.DAYS.between(checkIn.getCheckout_date(),LocalDate.now());

            taxaAtraso = (daysLate*lateFeePerDay);
        }

        CheckInDTO checkInDTO = modelMapper.map(checkIn,CheckInDTO.class);

        checkInDTO.setDaysLate(daysLate);
        checkInDTO.setTaxa(taxaAtraso);
        checkInDTO.setValor(checkIn.getValor()+taxaAtraso);

        return checkInDTO;

    }
}
