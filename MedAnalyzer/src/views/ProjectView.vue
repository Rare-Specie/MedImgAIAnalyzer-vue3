<template>
  <div class="project-view-root">
    <div v-if="loading" class="loading">正在加载项目…</div>
    <div v-else-if="error" class="error">加载失败：{{ error }}</div>

    <ProjectDetail v-else-if="project" :project="project" />

    <div class="actions" v-if="project">
      <n-space>
        <n-button size="small" tertiary @click="goHome">返回</n-button>
        <n-button size="small" @click="openProject">进入项目</n-button>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProjectDetail from '../components/ProjectDetail.vue'
import { getProject, type Project } from '../api/projects'

const props = defineProps<{ uuid: string }>()
const router = useRouter()
const project = ref<Project | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    project.value = await getProject(props.uuid)
  } catch (err: any) {
    console.error(err)
    error.value = err?.message || String(err)
  } finally {
    loading.value = false
  }
}

function goHome() {
  router.push({ name: 'home' })
}

function openProject() {
  // placeholder — in a full app this would open the analysis workspace
  // keep current route for now
}

onMounted(load)
</script>

<style scoped>
.project-view-root{max-width:980px;margin:0 auto;display:flex;flex-direction:column;gap:16px}
.loading,.error{padding:18px;border-radius:8px;background:#fff}
.actions{display:flex;justify-content:flex-end}
</style>
