package com.br.checkinproducer.service;

import com.br.checkinproducer.exception.PendingCheckIngException;
import com.br.checkinproducer.model.CheckIn;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;

public interface CheckInService {

     Boolean checkBookIsAvailable(Long bookId);

     Boolean checkIfCustomerExists(Long customerId);

     void changeBookQuantity(int quantity, Long bookId);

    Boolean checkState (CheckIn checkIn) throws PendingCheckIngException;

    public CheckIn createCheckIn(CheckIn order) throws PendingCheckIngException;

    public Page<CheckIn> getAllCheckIn(Integer offset);

    public Page<CheckIn> getAllByUserName(Integer offset,String name);

    public Page<CheckIn> getAllByDateInterval(Integer offset,LocalDate initialDate, LocalDate finalDate);

}
