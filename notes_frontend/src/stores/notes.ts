import { defineStore } from 'pinia'

/**
 * Notes store (Pinia). All notes state (local only).
 * Structure: [{id, title, content, created, updated}]
 * Provides: list, add, update, remove, getById
 */
export interface Note {
  id: string
  title: string
  content: string
  created: string
  updated: string
}

const STORAGE_KEY = 'notesapp.notes';

// PUBLIC_INTERFACE
export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Note[]
  }),
  actions: {
    // PUBLIC_INTERFACE
    load() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          this.notes = JSON.parse(raw);
        } catch {
          this.notes = [];
        }
      }
    },
    // PUBLIC_INTERFACE
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.notes));
    },
    // PUBLIC_INTERFACE
    list() {
      return [...this.notes].sort((a, b) => (b.updated.localeCompare(a.updated)));
    },
    // PUBLIC_INTERFACE
    getById(id: string) {
      return this.notes.find(n => n.id === id) || null;
    },
    // PUBLIC_INTERFACE
    add(note: { title: string, content: string }) {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: note.title,
        content: note.content,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      };
      this.notes.unshift(newNote);
      this.save();
      return newNote;
    },
    // PUBLIC_INTERFACE
    update(note: Note) {
      const idx = this.notes.findIndex(n => n.id === note.id);
      if (idx !== -1) {
        this.notes[idx] = {
          ...this.notes[idx],
          title: note.title,
          content: note.content,
          updated: new Date().toISOString(),
        };
        this.save();
      }
    },
    // PUBLIC_INTERFACE
    remove(id: string) {
      this.notes = this.notes.filter(n => n.id !== id);
      this.save();
    },
    // PUBLIC_INTERFACE
    clearAll() {
      this.notes = [];
      this.save();
    }
  }
});
