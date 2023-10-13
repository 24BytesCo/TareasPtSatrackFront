import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { NotifyService } from './Notify.service';
import { Category } from 'src/app/modules/tasks/interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url!: string;

  private categoryList: Category[] = []; // Lista de tareas completas

  private categoryListSubject = new BehaviorSubject<Category[]>(
    this.categoryList
  ); // BehaviorSubject para la lista completa de tareas

  constructor(
    private _http: HttpClient,
    private _notifyService: NotifyService
  ) {
    this.url = environment.API;
  }
  // Métodos para obtener observables de las listas de tareas
  getAllCategoriesObservable() {
    return this.categoryListSubject.asObservable();
  }

  // Métodos para actualizar los observables de las listas de tareas
  updateAllTaskObservable(listaTodasCategorias: Array<Category>) {
    return this.categoryListSubject.next(listaTodasCategorias);
  }

  // Métodos para realizar solicitudes HTTP

  getAllCategories(): Observable<any> {
    return this._http.get(this.url + 'Category/List').pipe(
      catchError((error) => {
        this._notifyService.smallRightAlertError(
          error.error.message ? error.error.message : error.error.title,
          3000
        );

        console.error('Error en la solicitud de consultar  categorias:', error);
        return throwError(error);
      })
    );
  }
  // Crear una nueva categoria
  createCategory(name: string): Observable<any> {
    return this._http.post(this.url + 'Category/Create', { name }).pipe(
      catchError((error) => {
        this._notifyService.smallRightAlertError(
          error.error.message ? error.error.message : error.error.title,
          3000
        );

        console.error('Error en la solicitud de crear una categoría:', error);
        return throwError(error);
      })
    );
  }
}
