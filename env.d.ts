/// <reference types="vite/client" />
import type { App } from 'vue'
declare module '@matechat/core' {
  declare function install(app: App): void
  declare const _default: {
    install: typeof install
  }
  export default _default

  export {
    McBubble,
    McHeader,
    McInput,
    McIntroduction,
    McLayoutAside,
    McLayoutContent,
    McLayoutHeader,
    McLayout,
    McLayoutSender,
    McList,
    useMcI18n,
    McLocale,
    McMarkdownCard,
    McMention,
    McPrompt,
  }
}

declare global {
  let LanguageModel: LanguageModel
}

interface LanguageModel {
  availability: () => Promise<'unavailable' | 'downloadable' | 'downloading' | 'available'>

  create: (option: {
    systemPrompt?: string
    monitor?: (m: {
      addEventListener: (type: string, e: (e: { loaded: number; total: number }) => void) => void
    }) => void
  }) => Promise<AITextSession & { clone: () => Promise<AITextSession> }>
}
export interface AITextSession {
  promptStreaming(question: string): string[]
  prompt: (input: string) => Promise<string>
  destroy: () => Promise<void>
  inputQuota: number
  inputUsage: number
  onquotaoverflow: null
  temperature: number
  topK: number
}
