import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingList } from '../../core/interfaces/booking';



interface TableOption {
  value: string;
  viewValue: string;
}

interface SlotOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  slot: SlotOption[] = [
    { value: '9AM-12PM', viewValue: '9AM-12PM' },
    { value: '12PM-5PM', viewValue: '12PM-5PM' },
    { value: '5PM-10PM', viewValue: '5PM-10PM' },
  ];

  table: TableOption[] = [
    { value: 'table for 2', viewValue: 'Table for 2' },
    { value: 'table for 4', viewValue: 'Table for 4' },
    { value: 'table for 6', viewValue: 'Table for 6' },
    { value: 'table for 8', viewValue: 'Table for 8' },
  ];
  editedBooking: BookingList;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { booking: BookingList }
  ) {
    this.editedBooking = { ...data.booking }; 
  }

  saveChanges() {

    this.dialogRef.close(this.editedBooking);
  }

  cancel() {
    this.dialogRef.close(); 
  }
}
