
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

import { BoardCard, BoardList } from '../../models/board.model';
import { BoardListComponent } from '../board-list/board-list';


const STORAGE_KEY = 'vetty-jira-board';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    BoardListComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  lists: BoardList[] = [];

  private readonly isBrowser: boolean;

  showAddListModal = false;
  showAddCardModal = false;
  selectedList: BoardList | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }


  ngOnInit(): void {
    if (!this.isBrowser) return;

    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        const parsed: unknown = JSON.parse(savedData);

        if (Array.isArray(parsed)) {
          this.lists = parsed as BoardList[];
          this.sortAllLists();
          return;
        }
      } catch {
        console.warn('Saved board data could not be loaded.');
      }
    }

    this.lists = [
      { id: crypto.randomUUID(), header: 'Todo', cards: [] },
      { id: crypto.randomUUID(), header: 'In - Progress', cards: [] },
      { id: crypto.randomUUID(), header: 'QA', cards: [] }
    ];

    this.saveBoard();
  }



  drop(event: CdkDragDrop<BoardCard[]>, target: BoardList): void {
    if (event.previousContainer === event.container) {
      // Reorder within the same list.
      // Final order is determined by creation time below.
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // Every list uses reverse chronological order.
    this.sortAllLists();
    this.saveBoard();
  }

  trackList(_index: number, list: BoardList): string {
    return list.id;
  }

  trackCard(_index: number, card: BoardCard): string {
    return card.id;
  }

  private sortList(list: BoardList): void {
    list.cards.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  }

  private sortAllLists(): void {
    this.lists.forEach(list => this.sortList(list));
  }

  private saveBoard(): void {
    if (!this.isBrowser) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists));
  }
}
