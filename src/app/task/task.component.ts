import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { ITask } from '../model/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  taskForm !: FormGroup;
  tasks : ITask [] = [];
  inprogress : ITask [] = [];
  done : ITask [] = [];
  updateIndex !: any;
  isEditEnabled : boolean = false;

  constructor(private fb : FormBuilder) {}

  ngOnInit() : void {
    this.taskForm = this.fb.group({
      item : ['', Validators.required]
    })
  };

  addTask(){
    this.tasks.push({
      description : this.taskForm.value.item,
      done: false
    });
    this.taskForm.reset();
  }
  editTask(item : ITask,i : number){
    this.taskForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateTask(){
    this.tasks[this.updateIndex].description = this.taskForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.taskForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  deleteTask(i : number){
    this.tasks.splice(i, 1);
  };

  deleteInProgressTask(i : number){
    this.inprogress.splice(i, 1);
  };

  deleteInDoneTask(i : number){
    this.done.splice(i, 1);
  };

  
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
