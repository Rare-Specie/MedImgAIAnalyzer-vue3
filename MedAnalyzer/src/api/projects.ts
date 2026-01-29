export type Project = {
  uuid: string
  name: string
  createdAt: string
  updatedAt: string
  note?: string
}

const API_BASE = '/api/projects'

export async function listProjects(): Promise<Project[]> {
  // 强制使用文档中规定的 info.json 接口；不再回退到 /api/projects
  const res = await fetch(`${API_BASE}/info.json`)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`无法获取项目列表：${res.status}${text ? ` — ${text}` : ''}`)
  }

  const data = await res.json().catch(() => null)
  if (!Array.isArray(data)) {
    throw new Error('服务器返回的项目列表格式不正确，预期为 JSON 数组')
  }

  return (data as Project[]).sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
}

export async function getProject(uuid: string): Promise<Project> {
  const res = await fetch(`${API_BASE}/${uuid}`)
  if (!res.ok) throw new Error('无法获取项目: ' + res.status)
  return (await res.json()) as Project
}

export async function deleteProject(uuid: string): Promise<Response> {
  return await fetch(`${API_BASE}/${uuid}`, { method: 'DELETE' })
}

export async function createProject(payload: { name: string; note?: string }): Promise<Project> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error('创建项目失败：' + (text || res.status))
  }
  return (await res.json()) as Project
}

export async function updateProject(uuid: string, payload: { note?: string }): Promise<Project> {
  const res = await fetch(`${API_BASE}/${uuid}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error('更新项目失败：' + (text || res.status))
  }
  return (await res.json()) as Project
}

export async function updateProjectNote(uuid: string, note: string): Promise<Project> {
  const res = await fetch(`${API_BASE}/${uuid}/note`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ note }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error('更新备注失败：' + (text || res.status))
  }
  return (await res.json()) as Project
}
