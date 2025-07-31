<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import NoteList from "@/components/NoteList.vue";
import NoteDetails from "@/components/NoteDetails.vue";
import NoteForm from "@/components/NoteForm.vue";
import { useNotesStore } from "@/stores/notes";
import type { Note } from "@/stores/notes";

const store = useNotesStore();

const notes = computed<Note[]>(() => store.list());
const selectedId = ref<string | null>(null);
const showDetails = ref(false);
const showForm = ref(false);
type NoteEdit = { id?: string, title: string, content: string } | null;
const editNote = ref<NoteEdit>(null);

function handleSelect(id: string) {
  selectedId.value = id;
  showDetails.value = true;
  editNote.value = null;
}
function handleNew() {
  editNote.value = null;
  showForm.value = true;
}
function handleEdit(note: Note) {
  editNote.value = { id: note.id, title: note.title, content: note.content };
  showForm.value = true;
  showDetails.value = false;
}
function handleDelete(id: string) {
  if (confirm("Delete this note?")) {
    store.remove(id);
    if (selectedId.value === id) {
      selectedId.value = null;
      showDetails.value = false;
    }
  }
}
function handleSave(note: NoteEdit) {
  if (!note) return;
  if ("id" in note && note.id) {
    store.update({ ...(note as Note), created: "", updated: "" }); // The store handles update timestamp
    selectedId.value = note.id;
  } else {
    const n = store.add(note);
    selectedId.value = n.id;
  }
  showForm.value = false;
  showDetails.value = false;
}
function handleCloseDetails() {
  showDetails.value = false;
}

onMounted(() => {
  store.load();
});
</script>

<template>
  <section>
    <NoteList
      :notes="notes"
      :selectedId="selectedId"
      @select="handleSelect"
      @edit="handleEdit"
      @delete="handleDelete"
      @new="handleNew"
    />
    <NoteDetails
      v-if="showDetails && selectedId && store.getById(selectedId)"
      :note="store.getById(selectedId)!"
      @close="handleCloseDetails"
      @edit="handleEdit"
    />
    <NoteForm
      v-if="showForm"
      :note="editNote"
      @save="handleSave"
      @cancel="showForm = false"
    />
  </section>
</template>
