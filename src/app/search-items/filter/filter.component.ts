import { Component, OnInit } from '@angular/core';
import { DataModel } from '../../data-transfer/data.model';
import { DataService } from '../../data-service';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  displayStudents: DataModel[];
  filterString: string;

  constructor(
    private dataService: DataService,
    private filterService: FilterService
  ) {
    this.filterService.filterSub.subscribe((string) => {
      this.filterString = string;
    });
  }

  ngOnInit(): void {
    // this.dataService.teamBStudents.forEach((student) => {
    //   this.dataService.teamAStudents.push(student);
    // });
    // this.displayStudents = this.dataService.teamAStudents;
    this.displayStudents = [
      ...this.dataService.teamAStudents,
      ...this.dataService.teamBStudents,
    ];
    console.log(this.displayStudents);
  }
}
