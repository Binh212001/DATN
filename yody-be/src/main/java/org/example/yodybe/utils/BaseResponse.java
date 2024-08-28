package org.example.yodybe.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BaseResponse {
    private String message;
    private Object data;
    private  int status;
}
