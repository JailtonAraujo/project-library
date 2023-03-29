package com.br.checkoutservice.service;

import com.br.checkoutservice.exception.CheckInException;
import com.br.checkoutservice.model.CheckOut;
import org.springframework.data.domain.Page;

import java.time.LocalDate;

public interface CheckOutService {

    Boolean checkCheckInStatus (CheckOut checkOut) throws CheckInException;

    CheckOut calcLate (CheckOut checkOut);

    void changeCheckInState(Long checkInId);

    void changeBookQuantity(Long bookId );

    public CheckOut createCheckOut (CheckOut checkOut) throws CheckInException;

    public Page<CheckOut> findAll(int offset, int limit) throws Exception;

    public Page<CheckOut> findByCustomer(int offset, int limit, String customerName) throws Exception;

    public Page<CheckOut> findBy(int offset, int limit, LocalDate initialDate, LocalDate finalDate) throws Exception;

}
