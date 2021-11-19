package com.sportshop.dto;

import com.sportshop.entity.Address;
import com.sportshop.entity.Customer;
import com.sportshop.entity.Order;
import com.sportshop.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
