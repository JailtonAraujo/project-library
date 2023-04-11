package com.br.checkoutservice.service.impl;

import com.br.checkoutservice.exception.CheckInException;
import com.br.checkoutservice.model.CheckOut;
import com.br.checkoutservice.model.States;
import com.br.checkoutservice.repository.CheckOutRepository;
import com.br.checkoutservice.repository.CustomCheckOutRepository;
import com.br.checkoutservice.repository.CustomRepository;
import com.br.checkoutservice.repository.CustomerRepository;
import com.br.checkoutservice.service.CheckOutService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Log4j2
@RequiredArgsConstructor
@Service
public class CheckOutServiceImpl implements CheckOutService {

    private final CheckOutRepository checkOutRepository;

    private final CustomRepository customRepository;

    private final CustomCheckOutRepository customCheckOutRepository;

    private final KafkaTemplate<String, Serializable> kafkaTemplate;

    @Override
    public Boolean checkCheckInStatus(CheckOut checkOut) throws CheckInException {

        Optional<String> optional = checkOutRepository.getState(checkOut.getCheckInId(),checkOut.getCustomer().getId(),checkOut.getBook().getId());

        if(!optional.isPresent() || optional.isEmpty()){//esta restornando masi que um
             throw new CheckInException("Order not found! - id: "+checkOut.getCheckInId());
        } else if (optional.get().equalsIgnoreCase(States.CONCLUDED.toString())) {
             throw new CheckInException("Order already concluded! - id: "+checkOut.getCheckInId());
        }

        return true;
    }

    @Override
    public CheckOut calcLate(CheckOut checkOut) {

        var checkIn = customRepository.getCheckInDateAndValue(checkOut.getCheckInId());


        int daysLate = (int) ChronoUnit.DAYS.between(checkIn.getCheckOut_date(),LocalDate.now()) * 1;

        // if order not late
        if(LocalDate.now().isBefore(checkIn.getCheckOut_date()) || checkIn.getCheckOut_date().isEqual(LocalDate.now())){
            checkOut.setDiasAtraso(0);
            checkOut.setTaxaAtraso(0F);
            checkOut.setValorPago(checkIn.getValue());
            return  checkOut;
        }

        final float lateFeePerDay = 1.5F;

        checkOut.setTaxaAtraso(lateFeePerDay * daysLate);
        checkOut.setDiasAtraso(daysLate);
        checkOut.setValorPago(checkIn.getValue()+(lateFeePerDay * daysLate));

        return checkOut;
    }


    @Override
    public void changeCheckInState(Long checkInId) {
        customRepository.changeStateCheckIn(checkInId);
    }

    @Override
    public void changeBookQuantity(Long bookId) {
        customRepository.changeBookQuantity(bookId);
    }

    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    @Override
    public CheckOut createCheckOut(CheckOut checkOut) throws CheckInException {

        //Check checkIn status
         checkCheckInStatus(checkOut);

         //Calc fee late and full value
        var checkOutCalc =  calcLate(checkOut);

        //update book add 1 unity
        changeBookQuantity(checkOut.getBook().getId());

        //if all done change state to CONCLUDE
        changeCheckInState(checkOut.getCheckInId());

        checkOutCalc.setDateCheckOut(LocalDate.now());

        var checkOutCreated = checkOutRepository.save(checkOutCalc);

        log.info("CheckOut sent with id: {}",checkOutCreated.getId());

        kafkaTemplate.send("checkout-topic",checkOutCreated);

        return checkOutCreated;
    }

    @Override
    public Page<CheckOut> findAll(int offset, int limit) throws Exception {
        return customCheckOutRepository.findAll(offset,limit);
    }

    @Override
    public Page<CheckOut> findByCustomer(int offset, int limit, String customerName) throws Exception {
        return customCheckOutRepository.findByCustomer(offset,limit,customerName);
    }

    @Override
    public Page<CheckOut> findBy(int offset, int limit, LocalDate initialDate, LocalDate finalDate) throws Exception {
        return customCheckOutRepository.findByDateInterval(offset,limit,initialDate,finalDate);
    }
}
