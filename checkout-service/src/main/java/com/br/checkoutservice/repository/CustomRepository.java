package com.br.checkoutservice.repository;

import com.br.checkoutservice.dto.CheckInDTO;
import com.br.checkoutservice.model.States;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Repository
public class CustomRepository {

    private final EntityManager entityManager;


    public void changeBookQuantity(Long bookId){

        try {

            Query query = entityManager.createNativeQuery("UPDATE tbl_book set quantity = ? where id = ?");
            query.setParameter(1,1);
            query.setParameter(2,bookId);

            query.executeUpdate();

        }catch (Exception e){
            log.error("Error update book quantity {}",e);
        }

    }


    public void changeStateCheckIn (Long checkInId){

        try {
            Query query = entityManager.createNativeQuery("update tbl_checkin set state = ? where id = ?");
            query.setParameter(1, States.CONCLUDED.toString());
            query.setParameter(2,checkInId);

            query.executeUpdate();
        }catch (Exception ex){
            log.error("Error update checkinstate {}",ex);
        }
    }

    public CheckInDTO getCheckInDateAndValue (Long checkInId){

        try {
            Query query = entityManager.createNativeQuery(
                    "select tbl_checkin.valor, tbl_checkin.checkout_date from tbl_checkin where id = ?");
            query.setParameter(1,checkInId);

            List<Object[]> objects = query.getResultList();
            CheckInDTO checkInDTO = new CheckInDTO();

            for (Object [] object : objects) {
                checkInDTO = new CheckInDTO().builder().value(Float.valueOf(object[0].toString()))
                        .checkOut_date(LocalDate.parse(object[1].toString(), DateTimeFormatter.ofPattern("yyyy-MM-dd"))).build();
            }
            return checkInDTO;

        }catch (Exception ex){
            log.error("Error update checkinstate {}",ex);
        }

        return null;

    }

}
