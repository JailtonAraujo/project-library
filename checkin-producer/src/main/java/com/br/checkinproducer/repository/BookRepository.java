package com.br.checkinproducer.repository;

import com.br.checkinproducer.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Modifying
    @Query(value="UPDATE tbl_books SET quantity = ?1 WHERE tbl_books.id = ?2",nativeQuery = true)
    public void changeQuantityBook(int quantity, Long bookId);

    @Query(value = "SELECT b.quantity FROM tbl_books b WHERE b.id = ?1 ")
    public int getQuantity (Long bookId);

}
