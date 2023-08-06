import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-movement',
  templateUrl: './edit-movement.component.html',
  styleUrls: ['./edit-movement.component.css']
})
export class EditMovementComponent implements OnInit {

  @Output() new_movement:any = new EventEmitter();
  editForm: FormGroup;
  movement: any;
  constructor(
    public dialogRef: MatDialogRef<EditMovementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
  ){
    // console.log('data', data)
    this.movement = data;
  }

  ngOnInit(){
    this.editForm = this._builderForm();
   
  }

  _builderForm() {
    const form = this._formBuilder.group({
      fecha: [{value: this.formatDateToYYYYMMDD(this.movement.fecha), disabled: true}, [Validators.required]],
      descripcion: [this.movement.descripcion, [Validators.required]],
      monto: [this.movement.monto, [Validators.required]],
      moneda: [{value: this.movement.moneda, disabled: true}, [Validators.required]],
      codigo_unico: [{value: this.movement.codigo_unico, disabled: true}, [Validators.required]],
    });

    return form;
  }

  get fecha() {return this.editForm.controls["fecha"]}
  get descripcion() {return this.editForm.controls["descripcion"]}
  get monto() {return this.editForm.controls["monto"]}
  get moneda() {return this.editForm.controls["moneda"]}
  get codigo_unico() {return this.editForm.controls["codigo_unico"]}

  formatDateToYYYYMMDD(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  editMovement(){
    this.new_movement.emit(this.editForm.getRawValue())
    this.dialogRef.close()
  }

}
