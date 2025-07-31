<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="header">
      <div class="header-content">
        <span class="logo-symbol">✏️</span>
        <h1 class="app-title">Simple Notes</h1>
        <nav class="nav-bar">
          <RouterLink to="/" active-class="active-link" exact>Notes</RouterLink>
          <RouterLink to="/about" active-class="active-link" exact>About</RouterLink>
        </nav>
      </div>
    </header>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
:root {
  --primary-color: #1976D2;
  --secondary-color: #424242;
  --accent-color: #FFC107;
}
.app-shell {
  min-height: 100vh;
  background: #f6f9fa;
}
.header {
  width: 100%;
  padding: 2.3rem 0 1.1rem 0;
  background: #fff;
  box-shadow: 0 2px 12px #2223aa09;
  display: flex;
  justify-content: center;
}
.header-content {
  display: flex;
  align-items: center;
  gap: 1.2em;
  width: 100%;
  max-width: 920px;
}
.logo-symbol {
  font-size: 2.07em;
  margin-right: .18em;
  user-select: none;
}
.app-title {
  font-weight: bold;
  font-size: 1.42em;
  color: var(--primary-color);
  margin: 0;
  letter-spacing: .02em;
}
.nav-bar {
  margin-left: auto;
  font-size: 1.08em;
}
.nav-bar a {
  color: var(--secondary-color);
  text-decoration: none;
  margin-left: 1.35em;
  padding: .3em .4em;
  border-radius: 4px;
  transition: background .12s, color .1s;
  font-weight: 500;
}
.nav-bar a.active-link, .nav-bar a:focus {
  color: var(--primary-color);
  background: #e7f1fa;
}
.nav-bar a:hover:not(.active-link) {
  background: #f6faff;
  color: var(--accent-color);
}
.main-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 2.2em 1em 2em 1em;
}
@media (max-width: 600px) {
  .header-content,
  .main-content { padding-left: .7em; padding-right: .7em;}
  .main-content { padding-top: 1em;}
}
</style>
