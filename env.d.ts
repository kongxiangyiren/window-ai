/// <reference types="vite/client" />

declare global {
  interface Window {
    readonly ai: AI;
  }

  interface AI {
    languageModel: {
      /**
       * 判断模型是否准备好了
       * @example
       * ```js
       * const availability = (await window.ai.languageModel.capabilities()).available
       * if (availability === 'readily') {
       *  console.log('模型已经准备好了')
       * } else if (availability === 'after-download') {
       *  console.log('模型正在下载中')
       * } else {
       *  console.log('模型还没下载')
       * }
       * ```
       */
      capabilities(): Promise<{
        available: AIModelAvailability;
        defaultTemperature?: number;
        defaultTopK?: number;
        maxTopK?: number;
      }>;

      create(): Promise<
        {
          maxTokens: number;
          oncontextoverflow: null;
          temperature: number;
          tokensLeft: number;
          tokensSoFar: number;
          topK: number;
        } & AITextSession
      >;
    };
  }

  /**
   * AI模型的可用性
   * - `readily`：模型已经准备好了
   * - `after-download`：模型正在下载中
   * - `no`：模型还没下载
   */
  type AIModelAvailability = 'readily' | 'after-download' | 'no';

  interface AITextSession {
    /**
     * 询问 AI 问题, 返回 AI 的回答
     * @param input 输入文本, 询问 AI 的问题
     * @example
     * ```js
     * const session = await window.ai.createTextSession()
     * const text = await session.prompt('今天天气怎么样？')
     * console.log(text)
     * ```
     */
    prompt(input: string): Promise<string>;

    /**
     * 询问 AI 问题, 以流的形式返回 AI 的回答
     * @param input 输入文本, 询问 AI 的问题
     * @example
     * ```js
     * const session = await window.ai.createTextSession()
     * const stream = session.promptStreaming('今天天气怎么样？')
     * let result = ''
     * let previousLength = 0
     *
     * for await (const chunk of stream) {
     *  const newContent = chunk.slice(previousLength)
     *  console.log(newContent) // AI 的每次输出
     *  previousLength = chunk.length
     *  result += newContent
     * }
     *
     * console.log(result) // 最终的 AI 回答（完整版）
     */
    promptStreaming(input: string): ReadableStream;

    /**
     * 销毁会话
     * @example
     * ```js
     * const session = await window.ai.createTextSession()
     * session.destroy()
     * ```
     */
    destroy(): void;

    /**
     * 克隆会话
     * @example
     * ```js
     * const session = await window.ai.createTextSession()
     * const cloneSession = session.clone()
     * const text = await cloneSession.prompt('今天天气怎么样？')
     * console.log(text)
     * ```
     */
    clone(): AITextSession;
  }

  interface AITextSessionOptions {
    /**
     * 生成文本的多样性，越大越多样，正整数，没有范围
     */
    topK: number;

    /**
     * 生成文本的创造性，越大越随机，0-1 之间的小数
     */
    temperature: number;
  }
}

export {};
