package com.br.checkinproducer.repository;

import com.br.checkinproducer.model.CheckIn;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@SpringBootTest
public class CheckInRepositoryTest {

    @Autowired
    private CheckInRepository checkInRepository;

    @Test
    void getAllByUserNameTest (){

        List<CheckIn> list = checkInRepository.getAllByUserName("jai");

        System.out.println(list);

    }

//    @Test
    void getAllByDateIntervalTest (){

        var initalDate = LocalDate.parse("2023-01-01", DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        var finalDate = LocalDate.parse("2023-03-18", DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        List<CheckIn> list = checkInRepository.getAllByDateInterval(initalDate,finalDate);

        System.out.println(list);
    }



}
