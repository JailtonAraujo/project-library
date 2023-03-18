package com.br.checkinproducer.service;

import com.br.checkinproducer.exception.PendingCheckIngException;
import com.br.checkinproducer.model.CheckIn;

import java.time.LocalDate;
import java.util.List;

public interface CheckInService {

     Boolean checkBookIsAvailable(Long bookId);

     Boolean checkIfCustomerExists(Long customerId);

     void changeBookQuantity(int quantity, Long bookId);

    Boolean checkState (CheckIn checkIn) throws PendingCheckIngException;

    public CheckIn createCheckIn(CheckIn order) throws PendingCheckIngException;

    public List<CheckIn> getAllCheckIn();

    public List<CheckIn> getAllByUserName(String name);

    public List<CheckIn> getAllByDateInterval(LocalDate initialDate, LocalDate finalDate);

}
