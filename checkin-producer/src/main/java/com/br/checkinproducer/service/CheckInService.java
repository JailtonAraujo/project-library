package com.br.checkinproducer.service;

import com.br.checkinproducer.model.Order;

public interface CheckInService {

     Boolean checkBookIsAvailable(Long bookId);

     Boolean checkIfCustomerExists(Long customerId);

    public Order createOrder(Order order);



}
