<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content">
      <h3>{{ note.title }}</h3>
      <div class="note-body">{{ note.content }}</div>
      <div class="actions">
        <button class="edit-btn" @click="$emit('edit', note)">Edit</button>
        <button class="close-btn" @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// PUBLIC_INTERFACE
/**
 * NoteDetails modal. Props: note object.
 * Emits: close, edit(note)
 */
defineProps<{ note: { id: string, title: string, content: string } }>()
defineEmits(['close', 'edit'])
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 1000;
  background: #2227cc13;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #fff;
  border-radius: 12px;
  max-width: 420px;
  min-width: 300px;
  padding: 2rem 1.2rem 1.3rem;
  box-shadow: 0 3px 32px #1976d233;
  text-align: left;
}
h3 {
  color: var(--primary-color, #1976D2);
  margin-bottom: .7em;
  margin-top: 0;
  font-size: 1.35em;
  font-weight: 600;
}
.note-body {
  color: #21263a;
  font-size: 1.04em;
  min-height: 60px;
  margin-bottom: 1.5em;
  white-space: pre-wrap;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: .7em;
}
.edit-btn {
  background: var(--accent-color, #FFC107);
  color: #111;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  padding: .38em 1.15em;
  cursor: pointer;
}
.close-btn {
  background: #f2f2f2;
  color: #444;
  border: none;
  border-radius: 5px;
  padding: .38em 1.15em;
  font-weight: 500;
  cursor: pointer;
}
.edit-btn:hover {
  background: #ffda62;
}
.close-btn:hover {
  background: #e8eaf6;
}
</style>
