import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useNotesStore } from "~/lib/notes-store";

// PUBLIC_INTERFACE
export default component$(() => {
  // Acquire store once in component scope
  const {
    notesSig,
    filterSig,
    selectedIdSig,
    filteredNotesSig,
    createNote$,
    updateNote$,
    deleteNote$,
    selectNote$,
  } = useNotesStore();

  // UI state signals for inputs
  const titleInput = useSignal("");
  const contentInput = useSignal("");

  // When selection changes, populate editor inputs
  useVisibleTask$(({ track }) => {
    track(() => selectedIdSig.value);
    const list = notesSig.value;
    const selectedId = selectedIdSig.value;
    const note = list.find((n) => n.id === selectedId);
    titleInput.value = note?.title ?? "";
    contentInput.value = note?.content ?? "";
  });

  return (
    <>
      {/* Header Actions Slot */}
      <div q:slot="header-actions">
        <button
          class="primary-btn"
          onClick$={() => createNote$()}
          aria-label="Create a new note"
        >
          + New
        </button>
        <button
          class="ghost-btn accent"
          onClick$={() => {
            const id = selectedIdSig.value;
            if (!id) return;
            return updateNote$(id, {
              title: titleInput.value,
              content: contentInput.value,
            });
          }}
          aria-label="Save note"
        >
          Save
        </button>
      </div>

      {/* Sidebar */}
      <div q:slot="sidebar">
        <div class="search" role="search" aria-label="Search notes">
          <span style="color: var(--muted);">🔎</span>
          <input
            type="text"
            placeholder="Search notes..."
            value={filterSig.value.query}
            onInput$={(_, el) => (filterSig.value = { query: el.value })}
          />
        </div>

        <div class="note-list" role="list" aria-label="Notes list">
          {filteredNotesSig.value.length === 0 && (
            <div style="color: var(--muted); padding: 8px 2px;">No notes found</div>
          )}
          {filteredNotesSig.value.map((n) => (
            <article
              key={n.id}
              role="listitem"
              tabIndex={0}
              class={{
                "note-item": true,
                active: selectedIdSig.value === n.id,
              }}
              onClick$={() => selectNote$(n.id)}
              onKeyDown$={(e) => {
                if (e.key === "Enter" || e.key === " ") selectNote$(n.id);
              }}
            >
              <h3 class="note-title">{n.title || "Untitled"}</h3>
              <p class="note-snippet">{n.content || "No content yet..."}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Main Editor */}
      <div class="editor-card">
        <div class="editor-header">
          <input
            class="title"
            placeholder="Note title"
            value={titleInput.value}
            onInput$={(_, el) => (titleInput.value = el.value)}
          />
          <div class="editor-actions">
            <button class="ghost-btn secondary" onClick$={() => createNote$()}>
              New
            </button>
            <button
              class="ghost-btn accent-outline"
              onClick$={() => {
                const id = selectedIdSig.value;
                if (!id) return;
                return updateNote$(id, {
                  title: titleInput.value,
                  content: contentInput.value,
                });
              }}
            >
              Save
            </button>
            <button
              class="ghost-btn danger"
              onClick$={() => {
                const id = selectedIdSig.value;
                if (!id) return;
                const ok = confirm("Delete this note? This cannot be undone.");
                if (ok) return deleteNote$(id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <div class="editor-body">
          <textarea
            class="content"
            placeholder="Start writing..."
            value={contentInput.value}
            onInput$={(_, el) => (contentInput.value = el.value)}
          />
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Notes",
  meta: [
    {
      name: "description",
      content:
        "Lightweight Qwik notes app: create, edit, delete, and search notes with a modern UI.",
    },
    { name: "theme-color", content: "#1976d2" },
  ],
};
