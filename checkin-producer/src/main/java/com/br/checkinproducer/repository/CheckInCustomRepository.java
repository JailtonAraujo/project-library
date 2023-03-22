package com.br.checkinproducer.repository;

import com.br.checkinproducer.model.CheckIn;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Component
public class CheckInCustomRepository {

    private final EntityManager entityManager;

    //Get All Checkins that are state in PENDING or LATE
    public Page<CheckIn> getAll (Integer offset, Integer limit) {

        try{

            Query query = entityManager.createQuery("SELECT check FROM tbl_checkin check WHERE check.state = 'PENDING' or check.state = 'LATE'")
                    .setMaxResults(limit).setFirstResult(offset);

            List<CheckIn> checkInList = query.getResultList();

            Pageable pageable = PageRequest.of(0,10);
            Page<CheckIn> page = new PageImpl<CheckIn>(checkInList,pageable,this.countAll());
            return page;

        }catch (Exception ex){
            try {
                throw new Exception(ex);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

    }

    //Get All Checkins that are state in PENDING or LATE by customer name
    public Page<CheckIn> getAllByUserName (Integer offset, Integer limit, String name) {

        try{

            Query query = entityManager
                    .createQuery(
                            "SELECT check FROM tbl_checkin check WHERE (check.state = 'PENDING' or check.state = 'LATE') and check.customer.name LIKE '"+name+"%'"
                                ).setMaxResults(limit).setFirstResult(offset);


            List<CheckIn> checkInList = query.getResultList();


            Pageable pageable = PageRequest.of(0,limit);
            Page<CheckIn> page = new PageImpl<CheckIn>(checkInList,pageable,this.countAllByName(name));

            return page;

        }catch (Exception ex){
            try {
                throw new Exception(ex);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

    }



    //Get All Checkins that are state in PENDING or LATE by Date interval
    public Page<CheckIn> getAllByDateInterval (Integer offset, Integer limit, LocalDate initialDate, LocalDate finalDate) {

        try{

            Query query = entityManager
                    .createQuery(
                            "SELECT check FROM tbl_checkin check WHERE check.checkin_date BETWEEN ('"+initialDate+"') AND ('"+finalDate+"') AND (check.state = 'PENDING' or check.state = 'LATE') "
                    ).setMaxResults(limit).setFirstResult(offset);


            List<CheckIn> checkInList = query.getResultList();

            Pageable pageable = PageRequest.of(0,limit);
            Page<CheckIn> page = new PageImpl<CheckIn>(checkInList,pageable,this.countByDateInterval(initialDate,finalDate));

            return page;

        }catch (Exception ex){
            try {
                throw new Exception(ex);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

    }



    public Integer countAll (){

        String quantity = entityManager.createQuery("SELECT COUNT(1) FROM tbl_checkin check WHERE check.state = 'PENDING' or check.state = 'LATE'").getSingleResult().toString();

        return Integer.parseInt(quantity);
    }


    public Integer countAllByName (String name){

        Query query = entityManager.createQuery(
                "SELECT COUNT(1) FROM tbl_checkin check WHERE (check.state = 'PENDING' or check.state = 'LATE') and check.customer.name LIKE '"+name+"%'"
        );

        String quantity = query.getSingleResult().toString();

        return Integer.parseInt(quantity);
    }

    public Integer countByDateInterval (LocalDate initialDate, LocalDate finalDate){

       Query query = entityManager.createQuery(
                "SELECT COUNT(1) FROM tbl_checkin check WHERE check.checkin_date BETWEEN ('"+initialDate+"') AND ('"+finalDate+"') AND (check.state = 'PENDING' or check.state = 'LATE')");

       String quantity = query.getSingleResult().toString();

        return Integer.parseInt(quantity);
    }


}
