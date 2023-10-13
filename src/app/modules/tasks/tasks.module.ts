import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllTasksPageComponent } from './pages/all-tasks-page/all-tasks-page.component';
import { PendingTasksPageComponent } from './pages/pending-tasks-page/pending-tasks-page.component';
import { CompletedTasksPageComponent } from './pages/completed-tasks-page/completed-tasks-page.component';
import { HomeTasksPageComponent } from './pages/home-tasks-page/home-tasks-page.component';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [
    AllTasksPageComponent,
    PendingTasksPageComponent,
    CompletedTasksPageComponent,
    HomeTasksPageComponent,
  ],
  imports: [CommonModule, SharedModule, TasksRoutingModule],
})
export class TasksModule {}
