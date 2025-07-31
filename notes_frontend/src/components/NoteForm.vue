<template>
  <div class="modal-backdrop" @click.self="$emit('cancel')">
    <form class="modal-content" @submit.prevent="onSubmit">
      <h3>{{ isEdit ? 'Edit Note' : 'New Note' }}</h3>
      <input
        v-model.trim="title"
        type="text"
        :placeholder="'Title'"
        maxlength="80"
        required
        class="title-input"
        autofocus
      />
      <textarea
        v-model="content"
        :placeholder="'Content...'"
        maxlength="2000"
        required
        class="content-area"
        rows="7"
      ></textarea>
      <div class="form-actions">
        <button class="save-btn" type="submit">{{ isEdit ? 'Save' : 'Create' }}</button>
        <button class="cancel-btn" type="button" @click="$emit('cancel')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
// PUBLIC_INTERFACE
/**
 * NoteForm modal. Used for edit/create note.
 * Props:
 *   note: existing note object for edit, or null (for new)
 * Emits:
 *   save({ id?, title, content })
 *   cancel
 */
import { ref, watch } from "vue";
const props = defineProps<{ note?: { id?: string, title: string, content: string } | null }>();
defineEmits(['save', 'cancel'])

const isEdit = !!props.note;
const title = ref(props.note ? props.note.title : "");
const content = ref(props.note ? props.note.content : "");

watch(() => props.note, (n) => {
  title.value = n?.title || "";
  content.value = n?.content || "";
});
function onSubmit() {
  if (title.value.trim() && content.value.trim()) {
    // id only when editing
    const result = isEdit ? { ...props.note, title: title.value, content: content.value } : { title: title.value, content: content.value };
    // @ts-expect-error emit type cannot be inferred for flexible payload shape
    emit('save', result);
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 1000;
  background: #30366610;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #fff;
  border-radius: 12px;
  max-width: 420px;
  min-width: 300px;
  padding: 2rem 1.4rem 1.5rem;
  box-shadow: 0 2px 36px #1976d223;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: .95em;
}
h3 {
  color: var(--primary-color, #1976D2);
  margin: 0 0 .1em;
  font-weight: 600;
  font-size: 1.19em;
}
.title-input, .content-area {
  width: 100%;
  background: #f7fafd;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: .75em .8em;
  font-size: 1.05em;
  font-family: inherit;
  color: #222b36;
  margin-bottom: .25em;
}
.title-input { font-weight: 500; }
.content-area { font-weight: 400; resize: vertical;}
.title-input:focus, .content-area:focus {
  outline: 2px solid var(--accent-color, #FFC107);
  background: #fffde7;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: .8em;
  margin-top: .4em;
}
.save-btn {
  background: var(--primary-color, #1976D2);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: .38em 1.15em;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 4px #1976d215;
}
.cancel-btn {
  background: #f2f2f2;
  color: #444;
  border: none;
  border-radius: 5px;
  padding: .38em 1.15em;
  font-weight: 500;
  cursor: pointer;
}
.save-btn:hover { background: #1452a4; }
.cancel-btn:hover { background: #e4e6ee; }
</style>
