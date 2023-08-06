import { Component, OnInit } from '@angular/core';
import { read, utils, writeFile} from 'xlsx'; 
import {MatDialog} from '@angular/material/dialog';
import { EditMovementComponent } from './dialogs/edit-movement/edit-movement.component';
import { AppService } from './app.service';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';

interface Movement {
  fecha: string,
  description: string,
  moneda: string,
  monto: number,
  codigo_unico: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'prueba-ftb';
  movements: any[] = [];
  infoSunat: any;
  constructor(
    public dialog: MatDialog,
    private appService: AppService
  ){ }

  ngOnInit() {
      if(!localStorage.getItem('infoSunat')){
        this.getInfoSunat();
      } else {
        this.infoSunat = JSON.parse(localStorage.getItem('infoSunat')|| '')
      }
  }

  getInfoSunat(){
    this.appService.getDataSunat().subscribe(res => {
      console.log('res', res);
      this.infoSunat = res;
      localStorage.setItem('infoSunat', JSON.stringify(res));
    })
  }

  csvImport($event: any){
    const files = $event.target.files;
    if(files.length){
      const file = files[0];
      console.log('file', file)
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log(event)
        const wb = read(event.target?.result)
        console.log(wb)
        const sheets = wb.SheetNames;
        console.log(sheets)

        if(sheets.length){
          console.log(wb.Sheets)
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.movements = rows;
          console.log(this.movements)
          this.convertUSDToPEN();
        }
      }

      reader.readAsArrayBuffer(file);
    }
  }

  convertUSDToPEN(){
    this.movements = this.movements.map((mov) =>{
      if(mov.moneda === 'USD'){
        mov.moneda = 'PEN'
        mov['extra'] = mov.monto
        mov.monto = mov.monto * this.infoSunat.compra
        
      }
      return mov;
    })

  }

  openDialogEdit(item:any, index: any): void {
    const dialogRef = this.dialog.open(EditMovementComponent, {
      data: item,
      height: 'auto',
      width: 'auto'
    });

    dialogRef.componentInstance.new_movement.subscribe((data: any) => {
      console.log('data', data)
      this.movements[index] = data;
    })
  }

  openDialogDelete(index:any){
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      height: 'auto',
      width: '300px'
    });

    dialogRef.componentInstance.deleteItem.subscribe((data: any) => {
      console.log('datita', data)
      console.log('index', index)
      if(data){
        this.movements.splice(index, 1)
        console.log(this.movements)
      }
    })

  }
}
