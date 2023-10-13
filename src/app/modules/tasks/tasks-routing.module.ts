import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTasksPageComponent } from './pages/all-tasks-page/all-tasks-page.component';
import { PendingTasksPageComponent } from './pages/pending-tasks-page/pending-tasks-page.component';
import { CompletedTasksPageComponent } from './pages/completed-tasks-page/completed-tasks-page.component';

const routes: Routes = [
  {
    path: 'all-tasks',
    component: AllTasksPageComponent,
  },
  {
    path: 'pending-tasks',
    component: PendingTasksPageComponent,
  },
  {
    path: 'completed-tasks',
    component: CompletedTasksPageComponent,
  },
  {
    path: '**',
    redirectTo: 'all-tasks',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
