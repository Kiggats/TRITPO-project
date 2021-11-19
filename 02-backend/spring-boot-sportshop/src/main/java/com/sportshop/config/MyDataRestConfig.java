package com.sportshop.config;

import com.sportshop.entity.Country;
import com.sportshop.entity.Product;
import com.sportshop.entity.ProductCategory;
import com.sportshop.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig  implements RepositoryRestConfigurer {
    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // disable HTTP methods for Product: PUT, POST, DELETE
        disableHttpMetods(Product.class, config, theUnsupportedActions);

        // disable HTTP methods for ProductCategory: PUT, POST, DELETE
        disableHttpMetods(ProductCategory.class, config, theUnsupportedActions);

        // disable HTTP methods for Country: PUT, POST, DELETE
        disableHttpMetods(Country.class, config, theUnsupportedActions);

        // disable HTTP methods for State: PUT, POST, DELETE
        disableHttpMetods(State.class, config, theUnsupportedActions);

        exposeIds(config);
    }

    private void disableHttpMetods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>>  entities = entityManager.getMetamodel().getEntities();

        List<Class> entityClass = new ArrayList<>();

        for(EntityType entityType: entities) {
            entityClass.add(entityType.getJavaType());
        }

        Class[] domenTypes = entityClass.toArray(new Class[0]);
        config.exposeIdsFor(domenTypes);
    }
}
