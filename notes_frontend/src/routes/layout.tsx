import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

// PUBLIC_INTERFACE
export default component$(() => {
  // Use route-scoped layout additions while still including base styles
  useStylesScoped$(`
    .app-shell {
      display: grid;
      grid-template-rows: 64px 1fr;
      grid-template-columns: 280px 1fr;
      grid-template-areas:
        "header header"
        "sidebar main";
      min-height: 100vh;
      color: var(--text-0);
      background: var(--surface-1);
    }

    header.app-header {
      grid-area: header;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0 16px;
      background: var(--surface-0);
      border-bottom: 1px solid var(--border);
      box-shadow: var(--shadow);
      position: sticky;
      top: 0;
      z-index: 5;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 700;
      letter-spacing: 0.2px;
      color: var(--text-0);
    }
    .brand .logo {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      display: grid;
      place-items: center;
      color: white;
      font-size: 16px;
      box-shadow: var(--shadow);
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .primary-btn {
      background: var(--color-primary);
      color: white;
      border: none;
      padding: 10px 14px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      box-shadow: var(--shadow);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all .15s ease;
    }
    .primary-btn:hover { background: var(--color-primary-600); }
    .ghost-btn {
      background: transparent;
      color: var(--text-0);
      border: 1px solid var(--border);
      padding: 10px 12px;
      border-radius: var(--radius-sm);
      cursor: pointer;
    }
    .accent {
      color: #4d3100;
      background: linear-gradient(0deg, rgba(255,171,0,0.14), rgba(255,171,0,0.14));
      border-color: rgba(255,171,0,0.35);
    }

    aside.sidebar {
      grid-area: sidebar;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 14px;
      background: var(--surface-0);
      border-right: 1px solid var(--border);
    }
    .search {
      display: flex;
      align-items: center;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 8px 10px;
      gap: 8px;
    }
    .search input {
      border: none;
      background: transparent;
      outline: none;
      width: 100%;
    }

    .note-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: auto;
      padding-right: 4px;
    }
    .note-item {
      background: var(--surface-0);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 10px 12px;
      cursor: pointer;
      transition: background .12s ease, border-color .12s ease, transform .04s ease;
      box-shadow: var(--shadow);
    }
    .note-item:hover { background: var(--surface-2); }
    .note-item.active {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(25,118,210,0.12);
    }
    .note-title {
      font-weight: 600;
      margin: 0 0 4px;
      color: var(--text-0);
    }
    .note-snippet {
      margin: 0;
      color: var(--muted);
      font-size: 13px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    section.main {
      grid-area: main;
      padding: 16px;
      display: grid;
      grid-template-rows: auto 1fr;
      gap: 12px;
    }
    .editor-card {
      background: var(--surface-0);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      display: grid;
      grid-template-rows: auto 1fr;
      overflow: hidden;
    }
    .editor-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 14px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, #ffffff, #fbfcff);
    }
    .editor-header input.title {
      flex: 1;
      border: 1px solid var(--border);
      background: var(--surface-0);
      padding: 10px 12px;
      border-radius: var(--radius-sm);
      outline: none;
    }
    .editor-actions {
      display: flex;
      gap: 8px;
    }
    .danger {
      background: #fee2e2;
      color: #7f1d1d;
      border: 1px solid #fecaca;
    }
    .secondary {
      background: var(--secondary, var(--surface-2));
      color: var(--text-0);
      border: 1px solid var(--border);
    }
    .accent-outline {
      background: transparent;
      color: #6b4b00;
      border: 1px dashed rgba(255,171,0,0.6);
    }

    .editor-body {
      padding: 0;
      display: grid;
    }
    .content {
      width: 100%;
      min-height: 380px;
      border: none;
      outline: none;
      padding: 14px;
      resize: vertical;
      font-size: 16px;
      line-height: 1.6;
      background: #fffefb;
    }

    @media (max-width: 980px) {
      .app-shell {
        grid-template-columns: 1fr;
        grid-template-rows: 64px auto 1fr;
        grid-template-areas:
          "header"
          "sidebar"
          "main";
      }
      aside.sidebar { border-right: none; border-bottom: 1px solid var(--border); }
    }
  `);
  // Keep any existing base styles for pages
  useStylesScoped$(styles);

  return (
    <div class="app-shell">
      <header class="app-header">
        <div class="brand" aria-label="App brand">
          <div class="logo">N</div>
          <div>
            <div style="font-size: 16px">Qwik Notes</div>
            <div style="font-size: 12px; color: var(--muted);">Create. Search. Focus.</div>
          </div>
        </div>
        <div class="header-actions">
          <Slot name="header-actions" />
        </div>
      </header>

      <aside class="sidebar">
        <Slot name="sidebar" />
      </aside>

      <section class="main">
        <Slot />
      </section>
    </div>
  );
});
