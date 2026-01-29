export type Project = {
  uuid: string
  name: string
  createdAt: string
  updatedAt: string
  note?: string
}

const API_BASE = '/api/projects'

export async function listProjects(): Promise<Project[]> {
  const res = await fetch(API_BASE)
  if (!res.ok) throw new Error('无法获取项目列表: ' + res.status)
  return (await res.json()) as Project[]
}

export async function getProject(uuid: string): Promise<Project> {
  const res = await fetch(`${API_BASE}/${uuid}`)
  if (!res.ok) throw new Error('无法获取项目: ' + res.status)
  return (await res.json()) as Project
}

export async function deleteProject(uuid: string): Promise<Response> {
  return await fetch(`${API_BASE}/${uuid}`, { method: 'DELETE' })
}
