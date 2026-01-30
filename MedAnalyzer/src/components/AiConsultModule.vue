<template>
  <section class="module">
    <div class="module-head">
      <h2>Ai问诊</h2>
      <n-tag size="small" type="warning" :bordered="false">开发中</n-tag>
    </div>
    <div class="module-body">
      <div class="placeholder">
        <div v-for="index in 20" :key="index" class="placeholder-line">正在开发中</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.module{background:#fff;border-radius:10px;box-shadow:0 10px 30px rgba(2,6,23,0.12)}
.module-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid var(--color-border)}
.module-head h2{margin:0;font-size:16px}
.module-body{padding:16px}
.placeholder{border:1px dashed var(--color-border);background:#f8fafc;border-radius:10px;padding:18px;color:#64748b;display:flex;flex-direction:column;gap:6px}
.placeholder-line{padding:6px 8px;border-radius:6px;background:#ffffff;box-shadow:inset 0 0 0 1px rgba(148,163,184,0.24)}
</style>
