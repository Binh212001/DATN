package org.example.yodybe.dto;

import lombok.Builder;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link org.example.yodybe.entity.Collection}
 */
@Value
@Builder
public class CollectionDto implements Serializable {
    Long id;
    String name;
    String slug;
}