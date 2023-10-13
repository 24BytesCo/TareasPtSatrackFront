import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { TaskComponent } from './components/task/task.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { FormsModule } from '@angular/forms';
import { CreateCategoryComponent } from './components/create-category/create-category.component';

@NgModule({
  declarations: [
    HeaderComponent,
    TaskComponent,
    TasksComponent,
    LoaderComponent,
    CreateTaskComponent,
    CreateCategoryComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    HeaderComponent,
    TaskComponent,
    TasksComponent,
    LoaderComponent,
    CreateTaskComponent,
  ],
})
export class SharedModule {}
