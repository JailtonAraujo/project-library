package com.br.checkoutservice.service;

import com.br.checkoutservice.exception.CheckInException;
import com.br.checkoutservice.model.CheckOut;

public interface CheckOutService {

    Boolean checkCheckInStatus (CheckOut checkOut) throws CheckInException;

    CheckOut calcLate (CheckOut checkOut);

    void changeCheckInState(Long checkInId);

    void changeBookQuantity(Long bookId );

    public CheckOut createCheckOut (CheckOut checkOut) throws CheckInException;

}
