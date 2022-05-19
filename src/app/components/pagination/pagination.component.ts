import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../../models/product.model";
import {IPage} from "../../models/page.model";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() allItems!: IProduct[];

  objPage: IPage | null = null;

  items: IProduct[] | null = null;

  constructor() { }

  ngOnInit(): void {
    this.setPage(1);
  }

  private getPage(totalItems: number, currentPage: number = 1, pageSize: number = 3): IPage {
    const pages: number[] = [];
    const totalPage = Math.ceil(totalItems / pageSize);
    let startPage: number;
    let endPage: number;

    if (totalPage < 10) {
      startPage = 1;
      endPage = totalPage;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;

      } else if (currentPage + 4 > totalPage) {
        startPage = totalPage - 9
        endPage = totalPage;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    const startIndex = (currentPage - 1)*pageSize;
    const endIndex = Math.min(startIndex + pageSize -1, totalItems - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return {
      pages,
      currentPage,
      startPage,
      endPage,
      totalItems,
      totalPage,
      pageSize,
      startIndex,
      endIndex,
    }
  }

  public setPage(page: number): void {
    this.objPage = this.getPage(this.allItems.length, page);
    this.items = this.allItems.slice(this.objPage.startIndex, this.objPage.endIndex + 1);
  }
}
