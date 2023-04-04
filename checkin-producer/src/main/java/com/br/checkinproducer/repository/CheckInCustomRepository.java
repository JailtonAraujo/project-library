package com.br.checkinproducer.repository;

import com.br.checkinproducer.DTO.CheckInDTO;
import com.br.checkinproducer.model.CheckIn;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class CheckInCustomRepository {

    private final EntityManager entityManager;

    private final ModelMapper modelMapper;

    //Get All Checkins that are state in PENDING or LATE
    public Page<CheckInDTO> getAll (Integer offset, Integer limit) {

        try{

            Query query = entityManager.createQuery("SELECT check FROM tbl_checkin check WHERE check.state = 'PENDING' or check.state = 'LATE'")
                    .setMaxResults(limit).setFirstResult(offset);

            List<CheckIn> checkInList = query.getResultList();

            List<CheckInDTO> dtos = checkInList.stream().map(checkIn -> modelMapper.map(convertModelInDTOAndCalTaxa(checkIn),CheckInDTO.class)).collect(Collectors.toList());

            Pageable pageable = PageRequest.of(0,10);
            Page<CheckInDTO> page = new PageImpl<CheckInDTO>(dtos,pageable,this.countAll());
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
    public Page<CheckInDTO> getAllByUserName (Integer offset, Integer limit, String name) {

        try{

            Query query = entityManager
                    .createQuery(
                            "SELECT check FROM tbl_checkin check WHERE (check.state = 'PENDING' or check.state = 'LATE') and check.customer.name LIKE '"+name+"%'"
                                ).setMaxResults(limit).setFirstResult(offset);


            List<CheckIn> checkInList = query.getResultList();
            List<CheckInDTO> dtos = checkInList.stream().map(checkIn -> modelMapper.map(convertModelInDTOAndCalTaxa(checkIn),CheckInDTO.class)).collect(Collectors.toList());

            Pageable pageable = PageRequest.of(0,limit);
            Page<CheckInDTO> page = new PageImpl<CheckInDTO>(dtos,pageable,this.countAllByName(name));

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
    public Page<CheckInDTO> getAllByDateInterval (Integer offset, Integer limit, LocalDate initialDate, LocalDate finalDate) {

        try{

            Query query = entityManager
                    .createQuery(
                            "SELECT check FROM tbl_checkin check WHERE check.checkin_date BETWEEN ('"+initialDate+"') AND ('"+finalDate+"') AND (check.state = 'PENDING' or check.state = 'LATE') "
                    ).setMaxResults(limit).setFirstResult(offset);


            List<CheckIn> checkInList = query.getResultList();
            List<CheckInDTO> dtos = checkInList.stream().map(checkIn -> modelMapper.map(convertModelInDTOAndCalTaxa(checkIn),CheckInDTO.class)).collect(Collectors.toList());

            Pageable pageable = PageRequest.of(0,limit);
            Page<CheckInDTO> page = new PageImpl<CheckInDTO>(dtos,pageable,this.countByDateInterval(initialDate,finalDate));

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



    public CheckInDTO convertModelInDTOAndCalTaxa ( CheckIn checkIn ) {

        final float lateFeePerDay = 1.5F;
        int daysLate = 0;
        float taxaAtraso = 0F;

        if(checkIn.getCheckout_date().isBefore(LocalDate.now())){

            daysLate = (int) ChronoUnit.DAYS.between(checkIn.getCheckout_date(),LocalDate.now());

            taxaAtraso = (daysLate*lateFeePerDay);
        }

        CheckInDTO checkInDTO = modelMapper.map(checkIn,CheckInDTO.class);

        checkInDTO.setDaysLate(daysLate);
        checkInDTO.setTaxa(taxaAtraso);
        checkInDTO.setValor(checkIn.getValor()+taxaAtraso);

        return checkInDTO;

    }


}
