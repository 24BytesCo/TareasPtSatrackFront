import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  CreateTaskRequest,
  Task,
  UpdateTaskRequest,
} from '../interfaces/task.interface';
import { NotifyService } from '../../../shared/services/Notify.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url!: string; // URL base para las solicitudes HTTP

  private taskList: Task[] = []; // Lista completa de tareas
  private taskListPending: Task[] = []; // Lista de tareas pendientes
  private taskListCompleted: Task[] = []; // Lista de tareas completas

  private taskListSubject = new BehaviorSubject<Task[]>(this.taskList); // BehaviorSubject para la lista completa de tareas
  private taskListPendingSubject = new BehaviorSubject<Task[]>(
    this.taskListPending
  ); // BehaviorSubject para la lista de tareas pendientes
  private taskListCompletedSubject = new BehaviorSubject<Task[]>(
    this.taskListCompleted
  ); // BehaviorSubject para la lista de tareas completas

  constructor(
    private _http: HttpClient,
    private _notifyService: NotifyService
  ) {
    // Configura la URL base para las solicitudes HTTP utilizando la URL del entorno
    this.url = environment.API;
  }

  // Métodos para obtener observables de las listas de tareas
  getAllTaskObservable() {
    return this.taskListSubject.asObservable();
  }
  getAllTaskPendingObservable() {
    return this.taskListPendingSubject.asObservable();
  }
  getAllTaskComletedObservable() {
    return this.taskListCompletedSubject.asObservable();
  }

  // Métodos para actualizar los observables de las listas de tareas
  updateAllTaskObservable(listaTodastareas: Array<Task>) {
    return this.taskListSubject.next(listaTodastareas);
  }
  updateAllTaskPendingObservable(listaTodastareas: Array<Task>) {
    return this.taskListPendingSubject.next(listaTodastareas);
  }
  updateAllTaskComletedObservable(listaTodastareas: Array<Task>) {
    return this.taskListCompletedSubject.next(listaTodastareas);
  }

  // Métodos para realizar solicitudes HTTP

  // Obtener todas las tareas
  getAllTask(): Observable<any> {
    return this._http.get(this.url + 'Task/ListAll').pipe(
      catchError((error) => {
        this._notifyService.smallRightAlertError(
          error.error.message ? error.error.message : error.error.title,
          3000
        );

        console.error('Error en la solicitud de obtener todas tareas:', error);
        return throwError(error);
      })
    );
  }

  // Obtener tareas completadas
  getAllTaskCompleted(): Observable<any> {
    return this._http.get(this.url + 'Task/ListCompleted').pipe(
      catchError((error) => {
        this._notifyService.smallRightAlertError(
          error.error.message ? error.error.message : error.error.title,
          3000
        );

        console.error(
          'Error en la solicitud de obtener tareas completas:',
          error
        );
        return throwError(error);
      })
    );
  }

  // Obtener tareas pendientes
  getAllTaskPending(): Observable<any> {
    return this._http.get(this.url + 'Task/ListPending').pipe(
      catchError((error) => {
        this._notifyService.smallRightAlertError(
          error.error.message ? error.error.message : error.error.title,
          3000
        );

        console.error(
          'Error en la solicitud de obtener tareas pendientes:',
          error
        );
        return throwError(error);
      })
    );
  }

  // Crear una nueva tarea
  createTask(body: CreateTaskRequest): Observable<any> {
    return this._http.post(this.url + 'Task/Create', body).pipe(
      catchError((error) => {
        this._notifyService.smallRightAlertError(
          error.error.message ? error.error.message : error.error.title,
          3000
        );

        console.error('Error en la solicitud de crear tarea:', error);
        return throwError(error);
      })
    );
  }

  // Actualiza una  tarea
  updateTask(body: UpdateTaskRequest): Observable<any> {
    return this._http.put(this.url + 'Task/Update', body).pipe(
      catchError((error) => {
        this._notifyService.smallRightAlertError(
          error.error.message ? error.error.message : error.error.title,
          3000
        );

        console.error('Error en la solicitud de actualziar tarea:', error);
        return throwError(error);
      })
    );
  }
}
