package com.br.checkinproducer.service;

import com.br.checkinproducer.model.CheckIn;

public interface CheckInService {

     Boolean checkBookIsAvailable(Long bookId);

     Boolean checkIfCustomerExists(Long customerId);

     void changeBookQuantity(int quantity, Long bookId);

    Boolean checkState (CheckIn checkIn);

    public CheckIn createCheckIn(CheckIn order);



}
