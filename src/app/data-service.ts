import { Injectable } from '@angular/core';
import { DataModel } from './data-transfer/data.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  teamAStudents: DataModel[] = [
    {
      id: Math.random().toString(16).slice(5),
      name: 'Dishant Valeja',
      emails: ['dishantvaleja@gmail.com', 'dishant5valeja@gmail.com'],
      selected: false,
      team: 'A',
    },
    {
      id: Math.random().toString(16).slice(5),
      name: 'Test1',
      emails: ['test1@gmail.com', '1test@gmail.com'],
      selected: false,
      team: 'A',
    },
    {
      id: Math.random().toString(16).slice(5),
      name: 'Test2',
      emails: ['test2@gmail.com', '2test@gmail.com'],
      selected: false,
      team: 'A',
    },
  ];

  teamBStudents: DataModel[] = [];

  clickedOn = new Subject<'A' | 'B'>();

  addStudent(student: DataModel) {
    // this.teamAStudents.push(student);
    if (student.team === 'A') this.teamAStudents.push(student);
    if (student.team === 'B') this.teamBStudents.push(student);
  }

  getStudentById(id: string) {
    return this.teamAStudents.find((student) => student.id === id);
  }

  selectedOrNotSelected(id: string, team) {
    if (team === 'A') {
      let student = this.teamAStudents.find((student) => student.id === id);

      student.selected = !student.selected;
      // console.log(this.teamAStudents);
    }

    if (team === 'B') {
      let student = this.teamBStudents.find((student) => student.id === id);

      student.selected = !student.selected;
      // console.log(this.teamBStudents);
    }
    // if (this.teamBStudents.some((student) => student.selected === true)) {
    //   let student = this.teamBStudents.find((student) => student.id === id);

    //   student.selected = !student.selected;
    // }
  }

  transfer(id: string) {
    this.teamBStudents.push(
      this.teamAStudents.find((student) => student.id === id)
    );
    this.teamAStudents.splice(
      this.teamAStudents.findIndex((student) => student.id === id),
      1
    );
  }

  transferV2(team: 'A' | 'B') {
    let indexArray = [];

    if (team === 'A') {
      this.teamBStudents.push(
        ...this.teamAStudents.filter((student, index) => {
          if (student.selected) {
            indexArray.push(index);
            student.team = 'B';
          }
          return student.selected === true;
        })
      );

      indexArray.sort((a, b) => b - a);

      for (const index of indexArray) {
        this.teamAStudents.splice(index, 1);
      }
    }

    if (team === 'B') {
      this.teamAStudents.push(
        ...this.teamBStudents.filter((student, index) => {
          if (student.selected) {
            indexArray.push(index);
            student.team = 'A';
          }
          return student.selected === true;
        })
      );

      indexArray.sort((a, b) => b - a);

      for (const index of indexArray) {
        this.teamBStudents.splice(index, 1);
      }
    }

    console.log('A: ', this.teamAStudents);
    console.log('B: ', this.teamBStudents);

    // this.teamAStudents = this.teamAStudents.filter((student) => {
    //   return student.selected !== true;
    // });
  }
}
