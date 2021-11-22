import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../common/product";
import {map} from "rxjs/operators";
import {ProductCategory} from "../common/product-category";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private categoryUrl = environment.sportShopApiUrl + '/product-category'

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(page: number, pageSize: number,categoryId: number): Observable<GetResponseProducts> {
    const searchUrl = environment.sportShopApiUrl + '/products/search/findByCategoryId?id=' +categoryId
                        + '&page='+ page + '&size=' + pageSize;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = environment.sportShopApiUrl + '/products/search/findByCategoryId?id=' +categoryId;

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProductsPaginate(page: number, pageSize: number,keyword: string): Observable<GetResponseProducts> {
    const searchUrl = environment.sportShopApiUrl + '/search/findByNameContaining?name=' + keyword
      + '&page='+ page + '&size=' + pageSize;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(productId: number): Observable<Product> {
    const productUrl = environment.sportShopApiUrl + '/products/' + productId;

    return  this.httpClient.get<Product>(productUrl);
  }
}

export interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
