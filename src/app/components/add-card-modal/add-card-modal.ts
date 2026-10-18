
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardList, BoardCard } from '../../models/board.model';

@Component({
  selector: 'app-add-card-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-card-modal.html',
  styleUrl: './add-card-modal.css',
})
export class AddCardModalComponent {
  @Input({ required: true }) list!: BoardList;

  @Output() save = new EventEmitter<BoardCard>();
  @Output() cancel = new EventEmitter<void>();

  newCardHeader = '';
  newCardDesc = '';

  cardHeaderError = '';
  cardDescError = '';

  closeModal(): void {
    this.cancel.emit();
  }

  addCard(): void {
    const header = this.newCardHeader.trim();
    const desc = this.newCardDesc.trim();

    this.cardHeaderError = '';
    this.cardDescError = '';

    if (!header) {
      this.cardHeaderError = 'Please enter a card title.';
    }

    if (!desc) {
      this.cardDescError = 'Please enter a description.';
    }

    if (!header || !desc) {
      return;
    }

    const card: BoardCard = {
      id: crypto.randomUUID(),
      header,
      desc,
      createdAt: new Date().toISOString(),
    };

    this.save.emit(card);
  }
}
