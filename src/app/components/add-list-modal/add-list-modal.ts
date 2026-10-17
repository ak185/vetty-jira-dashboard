import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BoardList, BoardCard } from '../../models/board.model';

@Component({
  selector: 'app-add-list-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-list-modal.html',
  styleUrl: './add-list-modal.css',
})
export class AddListModalComponent {
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  newListName = '';
  listNameError = '';

  closeModal(): void {
    this.cancel.emit();
  }

  addList(): void {
    const name = this.newListName.trim();

    if (!name) {
      this.listNameError = 'Please enter a list name.';
      return;
    }

    this.save.emit(name);
  }
}
