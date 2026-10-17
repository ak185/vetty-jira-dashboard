import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { BoardList, BoardCard } from '../../models/board.model';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './board-list.html',
  styleUrl: './board-list.css',
})
export class BoardListComponent {
  @Input({required: true}) list!: BoardList

  @Output() deleteList = new EventEmitter<string>();
  @Output() deleteCard = new EventEmitter<{ list: BoardList, cardId: string }>();
  @Output() addCard = new EventEmitter<BoardList>();
  @Output() cardDropped = new EventEmitter<CdkDragDrop<BoardCard[]>>();

  onDeleteList(): void {
    console.log("on Delete List: ", this.list);
    
    this.deleteList.emit(this.list.id);
  }

  onDeleteCard(cardId: string): void {
    this.deleteCard.emit({
      list: this.list,
      cardId
    });
  }

  onAddCard(): void {
    this.addCard.emit(this.list);
  }

  onCardDropped(event: CdkDragDrop<BoardCard[]>): void {
    this.cardDropped.emit(event);
  }

}
