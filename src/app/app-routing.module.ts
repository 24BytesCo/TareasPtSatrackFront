import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTasksPageComponent } from './modules/tasks/pages/all-tasks-page/all-tasks-page.component';
import { HomeTasksPageComponent } from './modules/tasks/pages/home-tasks-page/home-tasks-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeTasksPageComponent,
    loadChildren: () =>
      import('./modules/tasks/tasks.module').then((m) => m.TasksModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
