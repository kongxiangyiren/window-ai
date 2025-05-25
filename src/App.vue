<template>
  <McLayout class="container">
    <McHeader :title="'window-AI'" :logoImg="logo">
      <template #operationArea>
        <div class="operations" style="cursor: pointer" @click="openGithub">
          <i class="icon-helping"></i>
        </div>
      </template>
    </McHeader>
    <McLayoutContent
      v-if="startPage"
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
      "
    >
      <McIntroduction
        :logoImg="logo"
        :title="'window-AI'"
        :subTitle="'Hi，欢迎使用 window-AI'"
        :description="description"
      ></McIntroduction>
      <McPrompt
        :list="introPrompt.list"
        :direction="introPrompt.direction"
        class="intro-prompt"
        @itemClick="onSubmit($event.label)"
      ></McPrompt>
    </McLayoutContent>
    <McLayoutContent class="content-container" ref="contentContainer" v-else>
      <template v-for="(msg, idx) in messages" :key="idx">
        <McBubble
          v-if="msg.role === 'user'"
          :content="msg.content"
          :align="'right'"
          :avatarConfig="{ imgSrc: 'https://matechat.gitcode.com/png/demo/userAvatar.svg' }"
        >
        </McBubble>
        <McBubble
          v-else
          :loading="msg.loading ?? false"
          :avatarConfig="{ imgSrc: 'https://matechat.gitcode.com/logo.svg' }"
        >
          <McMarkdownCard :content="msg.content"></McMarkdownCard>
          <template #bottom>
            <div class="bubble-bottom-operations">
              <i class="icon-copy-new"></i>
              <i class="icon-like"></i>
              <i class="icon-dislike"></i>
            </div>
          </template>
        </McBubble>
      </template>
    </McLayoutContent>
    <div class="shortcut" style="display: flex; align-items: center; gap: 8px">
      <McPrompt
        v-if="!startPage"
        :list="simplePrompt"
        :direction="'horizontal'"
        style="flex: 1"
        @itemClick="onSubmit($event.label)"
      ></McPrompt>
      <Button
        style="margin-left: auto"
        icon="add"
        shape="circle"
        title="新建对话"
        size="md"
        @click="newConversation"
      />
    </div>
    <McLayoutSender>
      <McInput
        :value="inputValue"
        :maxLength="2000"
        @change="(e: string) => (inputValue = e)"
        @submit="onSubmit"
      >
        <template #extra>
          <div class="input-foot-wrapper">
            <div class="input-foot-left">
              <span class="input-foot-maxlength">{{ inputValue.length }}/2000</span>
            </div>
            <div class="input-foot-right">
              <Button
                icon="op-clearup"
                shape="round"
                :disabled="!inputValue"
                @click="inputValue = ''"
                ><span class="demo-button-content">清空输入</span></Button
              >
            </div>
          </div>
        </template>
      </McInput>
    </McLayoutSender>
  </McLayout>
</template>

<script setup lang="ts">
import {
  McBubble,
  McHeader,
  McInput,
  McIntroduction,
  McLayoutContent,
  McLayout,
  McLayoutSender,
  McMarkdownCard,
  McPrompt,
} from '@matechat/core'
import logo from './assets/32x.png'
import { ref } from 'vue'

import { Button } from 'vue-devui'
// import 'vue-devui/button/style.css'
import type { AITextSession } from '../env'

function openGithub() {
  window.open('https://github.com/kongxiangyiren/window-ai', '_blank', 'noopener noreferrer')
}

const description = [
  'window-AI 使用 chrome 提供的浏览器 AI 功能',
  '详情查看: https://github.com/kongxiangyiren/window-ai',
]
const introPrompt = {
  direction: 'horizontal',
  list: [
    {
      value: 'quickSort',
      label: '帮我写一个快速排序',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
      desc: '使用 js 实现一个快速排序',
    },
    {
      value: 'helpMd',
      label: '你可以帮我做些什么？',
      iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
      desc: '了解当前大模型可以帮你做的事',
    },
    {
      value: 'bindProjectSpace',
      label: '介绍一下自己',
      iconConfig: { name: 'icon-priority', color: '#3ac295' },
      desc: '介绍一下自己',
    },
  ],
}
const simplePrompt = [
  {
    value: 'quickSort',
    iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
    label: '帮我写一个快速排序',
  },
  {
    value: 'helpMd',
    iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
    label: '你可以帮我做些什么？',
  },
]
const startPage = ref(true)
const inputValue = ref('')

interface Message {
  role: 'user' | 'assistant'
  content: string
  loading?: boolean
}

const messages = ref<Message[]>([])

const newConversation = () => {
  startPage.value = true
  messages.value = []
  firstClonedLanguageModel!.destroy()
  languageModel!.destroy()
  languageModel = undefined
  firstClonedLanguageModel = undefined
}

const onSubmit = (evt: string) => {
  inputValue.value = ''
  startPage.value = false
  // 用户发送消息
  messages.value.push({
    role: 'user',
    content: evt,
  })
  fetchData(evt)
}

let languageModel: (AITextSession & { clone: () => Promise<AITextSession> }) | undefined
async function deai() {
  if (!('LanguageModel' in self)) {
    // The Translator API is supported.
    alert('The Translator API is not supported in this browser.')
    return false
  }

  const canDetect = await LanguageModel.availability()
  if (canDetect === 'unavailable') {
    alert('The Translator API is not available in this browser.')
    return false
  }
  if (canDetect === 'available') {
    languageModel = await LanguageModel.create({
      systemPrompt: '用中文回答',
    })
  } else {
    languageModel = await LanguageModel.create({
      systemPrompt: '用中文回答',

      monitor(m) {
        m.addEventListener('downloadprogress', (e) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
        })
      },
    })
  }
}
let firstClonedLanguageModel: AITextSession | undefined

const contentContainer = ref()
async function fetchData(question: string) {
  messages.value.push({
    role: 'assistant',
    content: '',
    loading: true,
  })
  if (!languageModel) {
    const d = await deai()
    if (!d) {
      return (messages.value = []), (startPage.value = true)
    }
  }

  if (!firstClonedLanguageModel) {
    firstClonedLanguageModel = await languageModel!.clone()
  }
  const stream = firstClonedLanguageModel!.promptStreaming(question)

  messages.value[messages.value.length - 1].loading = false

  for await (const chunk of stream) {
    const d = contentContainer.value.$el as HTMLElement

    console.log(d.scrollTop, d.scrollHeight - d.clientHeight)

    // 设置滚动到底
    if (d.scrollTop <= d.scrollHeight - d.clientHeight) {
      d.scrollTop = d.scrollHeight
    }

    messages.value[messages.value.length - 1].content += chunk
  }
}
</script>

<style>
.container {
  width: 1000px;
  margin: 20px auto;
  height: calc(100vh - 82px);
  padding: 20px;
  gap: 8px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 16px;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
}

.input-foot-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-right: 8px;

  .input-foot-left {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      font-size: 14px;
      line-height: 18px;
      color: #252b3a;
      cursor: pointer;
    }

    .input-foot-dividing-line {
      width: 1px;
      height: 14px;
      background-color: #d7d8da;
    }

    .input-foot-maxlength {
      font-size: 14px;
      color: #71757f;
    }
  }

  .input-foot-right {
    .demo-button-content {
      font-size: 14px;
    }

    & > *:not(:first-child) {
      margin-left: 8px;
    }
  }
}
</style>
