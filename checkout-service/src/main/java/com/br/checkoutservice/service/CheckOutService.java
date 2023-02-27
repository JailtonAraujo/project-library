package com.br.checkoutservice.service;

import com.br.checkoutservice.model.CheckOut;

public interface CheckOutService {

    Boolean checkCheckInStatus (Long checkInId);

    CheckOut calcLate (CheckOut checkOut);

    void changeCheckInState(Long checkInId);

    void changeBookQuantity(Long bookId );

    public CheckOut createCheckOut (CheckOut checkOut);

}
