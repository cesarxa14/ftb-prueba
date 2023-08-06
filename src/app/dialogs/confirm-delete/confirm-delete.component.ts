import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {
  
  @Output() deleteItem:any = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>,){}
  close(){
    this.dialogRef.close();
  }

  delete(){
    this.deleteItem.emit(true);
    this.dialogRef.close();
  }
}
