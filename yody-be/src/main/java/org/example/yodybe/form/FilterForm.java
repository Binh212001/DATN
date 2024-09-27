package org.example.yodybe.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class FilterForm implements Serializable {
    private List<Long> categories = new ArrayList<>();
    private List<Long> sizes = new ArrayList<>();
    private Integer page = 0;
    private Integer size = 24;
    private Double price;
}
