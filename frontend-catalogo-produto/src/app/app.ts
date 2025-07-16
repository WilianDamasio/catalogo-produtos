// src/app/app.component.ts
import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common'; // Necessário para diretivas como *ngIf e o pipe 'json'
import { FormsModule } from '@angular/forms';  // Necessário para o [(ngModel)]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  // ---------------------------------------------------------------------
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {


  private apiUrl = 'http://localhost:3000'; 
  idParaBuscar: string = 'produto-49999';
  metodoBusca: 'array' | 'mapa' | 'mongo' = 'array';
  produto: any = null;
  erro: string | null = null;
  tempoDeBusca: number | null = null;
  buscando: boolean = false;

  constructor(private http: HttpClient,private cdr: ChangeDetectorRef) {}

  buscarProduto() {
    if (!this.idParaBuscar) return;
    this.buscando = true;
    this.produto = null;
    this.erro = null;
    this.tempoDeBusca = null;

    const endpoint = this.metodoBusca === 'mongo' ? 'api/produtos' : 'produtos-mapa';
    
    const url = `${this.apiUrl}/${endpoint}/${this.idParaBuscar}`;

    const startTime = performance.now();

    this.http.get(url).subscribe({
      next: (data) => {
        this.produto = data;
        this.buscando = false;
        this.tempoDeBusca = performance.now() - startTime;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.erro = `Erro: ${err.error.message || 'Produto não encontrado'}`;
        this.produto = null;
        this.buscando = false;
        this.tempoDeBusca = performance.now() - startTime;
        this.cdr.detectChanges();
      }
    });
  }
}