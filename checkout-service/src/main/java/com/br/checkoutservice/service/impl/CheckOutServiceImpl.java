package com.br.checkoutservice.service.impl;

import com.br.checkoutservice.exception.CheckInException;
import com.br.checkoutservice.model.CheckOut;
import com.br.checkoutservice.model.States;
import com.br.checkoutservice.repository.BookRepository;
import com.br.checkoutservice.repository.CheckOutRepository;
import com.br.checkoutservice.repository.CustomerRepository;
import com.br.checkoutservice.service.CheckOutService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CheckOutServiceImpl implements CheckOutService {

    private final BookRepository bookRepository;

    private final CheckOutRepository checkOutRepository;

    @Override
    public Boolean checkCheckInStatus(Long checkInId) throws CheckInException {

        Optional<String> optional = checkOutRepository.getState(checkInId);

        if(!optional.isPresent() || optional.isEmpty()){
             throw new CheckInException("Order not found! - id: "+checkInId);
        } else if (optional.get().equalsIgnoreCase(States.CONCLUDED.toString())) {
             throw new CheckInException("Order already concluded! - id: "+checkInId);
        }

        return true;
    }

    @Override
    public CheckOut calcLate(CheckOut checkOut) {

        LocalDate checkin_date = checkOutRepository.getDateCheckIn(checkOut.getId());

        int daysLate = Period.between(checkin_date,LocalDate.now()).getDays();

        // if order not late
        if(daysLate == 0){
            checkOut.setDiasAtraso(0);
            checkOut.setTaxaAtraso(0F);
            return  checkOut;
        }

        final float lateFeePerDay = 1.5F;

        checkOut.setTaxaAtraso(lateFeePerDay * daysLate);
        checkOut.setDiasAtraso(daysLate);

        return checkOut;
    }


    @Override
    public void changeCheckInState(Long checkInId) {
        checkOutRepository.changeStateCheck(checkInId,States.CONCLUDED.toString());
    }

    @Override
    public void changeBookQuantity(Long bookId) {
        int quantity = bookRepository.getQuantity(bookId);
        bookRepository.changeQuantity(quantity+1,bookId);
    }

    @Transactional(rollbackFor = {Exception.class, SQLException.class})
    @Override
    public CheckOut createCheckOut(CheckOut checkOut) throws CheckInException {

        checkCheckInStatus(checkOut.getCheckInId());

        var checkOutCalc =  calcLate(checkOut);

        changeBookQuantity(checkOut.getBook().getId());


        return checkOutRepository.save(checkOutCalc);
    }
}
