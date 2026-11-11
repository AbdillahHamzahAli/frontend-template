<script lang="ts">
  import { getApiErrorMessage } from '#lib/api/client'
  import { uploadFile } from '#lib/api/files'
  import type { StoredFile } from '#lib/types/file'

  let selected = $state<File | null>(null)
  let uploading = $state(false)
  let error = $state('')
  let uploaded = $state<StoredFile | null>(null)

  function choose(event: Event) {
    const input = event.currentTarget as HTMLInputElement
    selected = input.files?.[0] ?? null
    uploaded = null
    error = ''
  }

  async function submit() {
    if (!selected) return
    uploading = true
    error = ''
    try {
      uploaded = await uploadFile(selected)
    } catch (caught) {
      error = getApiErrorMessage(caught)
    } finally {
      uploading = false
    }
  }

  const formatSize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)} MB`
</script>

<section class="page-heading"><div><div class="eyebrow">STORAGE</div><h1>Upload file</h1><p>Upload langsung ke storage melalui presigned URL.</p></div></section>

<section class="upload-card">
  <div class="upload-icon">↑</div>
  <h2>Pilih file untuk diunggah</h2>
  <p class="hint">PNG, JPEG, WebP, atau PDF · maksimal 10 MB</p>
  <label class="dropzone">
    <input type="file" accept="image/png,image/jpeg,image/webp,application/pdf" onchange={choose} />
    <strong>{selected ? selected.name : 'Klik untuk memilih file'}</strong>
    <span>{selected ? `${formatSize(selected.size)} · ${selected.type}` : 'atau tarik file ke area ini'}</span>
  </label>
  {#if error}<div class="error" role="alert">{error}</div>{/if}
  {#if uploaded}<div class="success" role="status"><strong>Upload berhasil.</strong><span>{uploaded.key}</span></div>{/if}
  <button onclick={submit} disabled={!selected || uploading}>{uploading ? 'Mengunggah…' : 'Mulai upload'} <span>↗</span></button>
</section>

<style>
  .page-heading { border-bottom: 1px solid var(--line); padding: 28px 0 30px; }
  .eyebrow { color: var(--accent); font-size: .67rem; font-weight: 800; letter-spacing: .15em; }
  h1 { font-family: Georgia, serif; font-size: 3.5rem; font-weight: 400; letter-spacing: -.06em; margin: 12px 0 5px; }
  .page-heading p { color: var(--muted); margin: 0; }
  .upload-card { background: #fff; border: 1px solid var(--line); border-radius: 18px; margin: 40px auto; max-width: 590px; padding: 42px; text-align: center; }
  .upload-icon { align-items: center; background: #fff0ec; border-radius: 50%; color: var(--accent); display: flex; font-size: 1.7rem; height: 54px; justify-content: center; margin: 0 auto 18px; width: 54px; }
  h2 { font-family: Georgia, serif; font-size: 1.7rem; font-weight: 400; letter-spacing: -.04em; margin: 0 0 8px; }
  .hint { color: var(--muted); font-size: .85rem; margin: 0 0 26px; }
  .dropzone { align-items: center; border: 1px dashed #d6ccc2; border-radius: 12px; cursor: pointer; display: flex; flex-direction: column; gap: 7px; padding: 30px 20px; }
  .dropzone:hover { background: #fffbf8; border-color: var(--accent); }
  .dropzone input { display: none; }
  .dropzone strong { font-size: .86rem; max-width: 100%; overflow: hidden; text-overflow: ellipsis; }
  .dropzone span { color: var(--muted); font-size: .75rem; }
  button { background: var(--ink); border: 0; border-radius: 7px; color: white; font-size: .8rem; font-weight: 800; margin-top: 20px; padding: 13px 20px; width: 100%; }
  button:disabled { cursor: not-allowed; opacity: .45; }
  button span { color: #f8b09d; margin-left: 8px; }
  .error, .success { border-radius: 7px; font-size: .76rem; margin-top: 16px; padding: 11px; text-align: left; }
  .error { background: #fff0ed; color: #aa3c2c; }
  .success { background: #edf9f1; color: #27734b; display: flex; flex-direction: column; gap: 5px; }
  .success span { font-family: monospace; font-size: .7rem; overflow: hidden; text-overflow: ellipsis; }
  @media (max-width: 600px) { .upload-card { padding: 28px 20px; } }
</style>
