import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataModel } from './data.model';
import { DataService } from '../data-service';

@Component({
  selector: 'app-data-transfer',
  templateUrl: './data-transfer.component.html',
  styleUrl: './data-transfer.component.css',
})
export class DataTransferComponent implements OnInit {
  teamAStudents: DataModel[];
  teamBStudents: DataModel[];
  @ViewChild('itemA') teamAElement: ElementRef;
  @ViewChild('itemB') teamBElement: ElementRef;
  click: 'A' | 'B';

  constructor(private dataService: DataService) {
    this.dataService.clickedOn.subscribe((click) => {
      this.click = click;
    });
  }

  ngOnInit(): void {
    this.teamAStudents = this.dataService.teamAStudents;
    this.teamBStudents = this.dataService.teamBStudents;
  }

  transferOnClick(team: 'A' | 'B') {
    this.dataService.clickedOn.next(null);
    if (team === 'A') {
      this.dataService.transferV2('A');
      [...this.teamAElement.nativeElement.children].forEach((student) => {
        if (student.classList.contains('list-group-item-success'))
          student.classList.remove('list-group-item-success');
      });
      this.dataService.teamBStudents.forEach((student) => {
        student.selected = false;
      });
    }

    if (team === 'B') {
      this.dataService.transferV2('B');
      [...this.teamBElement.nativeElement.children].forEach((student) => {
        if (student.classList.contains('list-group-item-primary'))
          student.classList.remove('list-group-item-primary');
      });
      this.dataService.teamAStudents.forEach((student) => {
        student.selected = false;
      });
    }

    // console.log(this.dataService.getAllTeamAStudents());
    // if (
    //   this.teamAElement.nativeElement.classList.contains(
    //     'list-group-item-success'
    //   )
    // )
    //   this.teamAElement.nativeElement.classList.remove(
    //     'list-group-item-success'
    //   );
  }

  transferAllOnClick(team: 'A' | 'B') {
    this.dataService.clickedOn.next(null);
    if (team === 'A') {
      // console.log(this.dataService.teamAStudents[0]);

      for (let student of this.dataService.teamAStudents) {
        student.team = 'B';
        this.dataService.teamBStudents.push(student);
      }
      this.dataService.teamAStudents.splice(
        0,
        this.dataService.teamAStudents.length
      );
    }
    if (team === 'B') {
      // console.log(this.dataService.teamBStudents[0]);
      for (let student of this.dataService.teamBStudents) {
        student.team = 'A';
        this.dataService.teamAStudents.push(student);
      }
      this.dataService.teamBStudents.splice(
        0,
        this.dataService.teamBStudents.length
      );
    }
  }
}
