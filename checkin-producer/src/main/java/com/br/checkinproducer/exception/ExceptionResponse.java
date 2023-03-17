package com.br.checkinproducer.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExceptionResponse implements Serializable {

    private Date timestamp;

    private String message;

    private String details;

    private int status;

    private boolean error;

    public ExceptionResponse(Date timestamp, String message, String details, int status){
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
        this.status = status;
        this.error = true;
    }

}
