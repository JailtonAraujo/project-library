package com.br.checkoutservice.repository;

import com.br.checkoutservice.model.CheckOut;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class CustomCheckOutRepository {

    private final EntityManager entityManager;

    public Page<CheckOut> findAll (int offset, int limit) throws Exception {

        try {

            Query query = entityManager.createQuery("SELECT check FROM tbl_checkout check");

            List<CheckOut> list = query.setFirstResult(offset).setMaxResults(limit).getResultList();

            Pageable pageable = PageRequest.of(0,10);
            Page<CheckOut> page = new PageImpl(list, pageable,this.countAll());

            return page;

        }catch (Exception e){
            e.printStackTrace();
            throw new Exception(e);
        }

    }


    public Page<CheckOut> findByCustomer (int offset, int limit, String customerName) throws Exception {

        try {

            Query query = entityManager.createQuery("SELECT check FROM tbl_checkout check WHERE check.customer.name like '"+customerName+"%' ");


            List<CheckOut> list = query.setFirstResult(offset).setMaxResults(limit).getResultList();

            Pageable pageable = PageRequest.of(0,10);
            Page<CheckOut> page = new PageImpl(list, pageable,this.countByCustomer(customerName));

            return page;

        }catch (Exception e){
            e.printStackTrace();
            throw new Exception(e);
        }

    }

    public Page<CheckOut> findByDateInterval (int offset, int limit, LocalDate initialDate, LocalDate finalDate) throws Exception {

        try {

            Query query = entityManager.createQuery("SELECT check FROM tbl_checkout check WHERE check.dateCheckOut between ('"+initialDate+"') and ('"+finalDate+"')");


            List<CheckOut> list = query.setFirstResult(offset).setMaxResults(limit).getResultList();

            Pageable pageable = PageRequest.of(0,10);
            Page<CheckOut> page = new PageImpl(list, pageable,this.countByDateInterval(initialDate,finalDate));

            return page;

        }catch (Exception e){
            e.printStackTrace();
            throw new Exception(e);
        }

    }


    public Long countAll () {

        String quantity = entityManager.createNativeQuery("SELECT COUNT(1) FROM tbl_checkout").getSingleResult().toString();

        return  Long.valueOf(quantity);

    }

    public Long countByCustomer (String customerName) {

        String quantity = entityManager.createQuery("SELECT COUNT(1) FROM tbl_checkout check WHERE check.customer.name like '"+customerName+"%'").getSingleResult().toString();

        return  Long.valueOf(quantity);

    }


    public Long countByDateInterval (LocalDate initialDate, LocalDate finalDate) {

        String quantity = entityManager.createQuery("SELECT COUNT(1) FROM tbl_checkout check WHERE check.dateCheckOut between ('"+initialDate+"') and ('"+finalDate+"')").getSingleResult().toString();

        return  Long.valueOf(quantity);

    }

}
