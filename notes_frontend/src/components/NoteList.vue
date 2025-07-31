<template>
  <div class="notes-list">
    <div class="notes-header">
      <h2>My Notes</h2>
      <button class="add-btn" @click="$emit('new')">
        + New Note
      </button>
    </div>
    <ul>
      <li v-for="note in notes" :key="note.id" class="note-item" :class="{ selected: selectedId === note.id }" @click="$emit('select', note.id)">
        <div class="note-title">{{ note.title }}</div>
        <div class="note-actions">
          <button class="edit-btn" @click.stop="$emit('edit', note)"><span>Edit</span></button>
          <button class="delete-btn" @click.stop="$emit('delete', note.id)"><span>Delete</span></button>
        </div>
      </li>
      <li v-if="!notes.length" class="no-notes">
        <span>No notes yet.</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
// PUBLIC_INTERFACE
/**
 * NoteList component. Displays list of notes with basic actions.
 * Props:
 *   notes: Array of note objects
 *   selectedId: currently selected note id
 * Emits:
 *   new - user wants to add new note
 *   select(id) - user selects note
 *   edit(note) - user wants to edit note
 *   delete(id) - user wants to delete note
 */
defineProps<{ notes: { id: string, title: string }[], selectedId: string | null }>()
defineEmits(['new', 'select', 'edit', 'delete'])
</script>

<style scoped>
.notes-list {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(23, 32, 42, 0.04);
  padding: 2rem 1.5rem;
  max-width: 400px;
  margin: 0 auto;
}
.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .8rem;
}
.add-btn {
  background: var(--accent-color, #FFC107);
  border: none;
  border-radius: 6px;
  padding: 0.45em 1em;
  font-size: 1.05rem;
  color: #222;
  font-weight: 600;
  cursor: pointer;
  transition: box-shadow .12s;
  box-shadow: 0 1px 4px #ffc10733;
}
.add-btn:hover {
  background: #ffd54f;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.note-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  margin-bottom: .6em;
  padding: .7em .7em;
  background-color: #F8F8F8;
  cursor: pointer;
  transition: background 0.16s, box-shadow 0.13s;
  border: 1px solid #f2f2f2;
}
.note-item.selected,
.note-item:hover {
  background: #e7f1fa;
  border-color: var(--primary-color, #1976D2);
  box-shadow: 0 1px 6px #1976D211;
}
.note-title {
  flex: 1;
  font-weight: 500;
  color: #222d3a;
}
.note-actions button {
  margin-left: .3em;
  border: none;
  background: none;
  color: var(--secondary-color, #424242);
  font-weight: 500;
  border-radius: 4px;
  font-size: .98em;
  cursor: pointer;
  transition: background .13s;
  padding: 4px 7px;
}
.edit-btn:hover {
  background: #e3eafe;
  color: var(--primary-color, #1976D2);
}
.delete-btn:hover {
  background: #fff2db;
  color: #af6400;
}
.no-notes {
  color: #888;
  font-size: 1.06em;
  padding: 1.5em;
  text-align: center;
}
</style>
