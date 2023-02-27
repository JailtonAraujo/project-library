package com.br.checkoutservice.repository;

import com.br.checkoutservice.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query(name = "SELECT CASE WHEN count(1) > 0 THEN TRUE ELSE FALSE END FROM tbl_customer c WHERE c.id = ?1")
    public boolean checkCustomer (Long customer_id);

}
