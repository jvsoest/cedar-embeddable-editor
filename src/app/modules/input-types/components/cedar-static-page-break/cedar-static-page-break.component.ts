import {Component, Injectable, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {DataContext} from '../../../shared/util/data-context';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {PageBreakPaginatorService} from '../../../shared/service/page-break-paginator.service';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    return '';
  }
}

@Component({
  selector: 'app-cedar-static-page-break',
  templateUrl: './cedar-static-page-break.component.html',
  styleUrls: ['./cedar-static-page-break.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}]
})
export class CedarStaticPageBreakComponent implements OnInit {

  @Input() dataContext: DataContext;
  @Input() pageBreakPaginatorService: PageBreakPaginatorService;


  constructor() {
  }

  ngOnInit(): void {
  }

  paginatorChanged(event): void {
    this.pageBreakPaginatorService.page(event.pageIndex);
  }

}
